import * as Flex from "@twilio/flex-ui";
import React from 'react';

import { MultiSelectFilter, MultiSelectFilterLabel } from '../components/TeamsViewFilterComponents/MultiSelectFilter';

var managerList = [];

export let managerOptions = [];

let expression = "";

const sortCaseInsensitive = function (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

// only get the manager list
export const managerFilterList = () => {
  Flex.Manager.getInstance()
  .insightsClient.instantQuery("tr-worker")
  .then((q) => {
      q.on("searchResult", (items) => {
        let error;
        let length = Object.keys(items).length;
        let at_least_one_worker_has_a_manager = false;

        for (const [key, value] of Object.entries(items)){
          if (value.attributes['manager']) {
              managerList.push(value.attributes.manager);
              at_least_one_worker_has_a_manager = true;
          }
        }

        // Removing duplicates
        managerList = [...(new Set(managerList))]
  
        // If another search is needed, make it.  Otherwise we end here.
        if (length > 199 && at_least_one_worker_has_a_manager) { 
          
          // Build the expression for search
          expression = 'data.attributes.manager CONTAINS "" ';
          var groupOfThirty = [];
          var groupOfThirtyExpression = [];        
          for (let i=0; i<managerList.length/29; i++){               
              groupOfThirty.push(managerList.slice(i*29, 29*(i+1)).join(`','`));                
              groupOfThirtyExpression.push(`and data.attributes.manager NOT_IN ['${groupOfThirty[i]}']`);
          }            
          expression += groupOfThirtyExpression.join(' ');

          // Run the search again
          q.search(expression).catch(() => {
              error = "Invalid query" ;
              console.log('Error',error);
          });
        } else {
          managerOptions = managerList.sort(sortCaseInsensitive).map(value => ({
            value,
            label: value,
            default: managerOptions.some(o => o.value === value && o.default) 
          }));
        }
      });

      q.search('data.attributes.manager CONTAINS ""').catch(() => {
          error = "Invalid query" ;
          console.log('Error',error);
      });
  });
}

export const managerFilter = () => {
  return{
      id: 'data.attributes.manager',
      title: 'Manager',
      fieldName: 'manager',
      options: managerOptions,
      customStructure: {
        field: <MultiSelectFilter isMultiSelect={true} />,
        label: <MultiSelectFilterLabel />
      },
      condition: 'IN'
    };
};

