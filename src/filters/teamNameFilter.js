import * as Flex from "@twilio/flex-ui";
import React from 'react';

import { MultiSelectFilter, MultiSelectFilterLabel } from '../components/TeamsViewFilterComponents/MultiSelectFilter';

var teamNameList = [];

let teamNameOptions = [];

let expression = "";

const sortCaseInsensitive = function (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

// only get the team_name list
export const teamNameFilterList = () => {
  
  Flex.Manager.getInstance()
  .insightsClient.instantQuery("tr-worker")
  .then((q) => {
      q.on("searchResult", (items) => {
        let error;
        let length = Object.keys(items).length;
        let at_least_one_worker_has_a_team_name = false;

        for (const [key, value] of Object.entries(items)){
          if (value.attributes.team_name) {
              teamNameList.push(value.attributes.team_name);
              at_least_one_worker_has_a_team_name = true;
          }
        }

        // Removing duplicates
        teamNameList = [...(new Set(teamNameList))];

        // If another search is needed, make it.  Otherwise we end here.
        if (length > 199 && at_least_one_worker_has_a_team_name) { 
          
          // Build the expression for search
          expression = 'data.attributes.team_name CONTAINS "" ';
          var groupOfThirty = [];
          var groupOfThirtyExpression = [];              
          for (let i=0; i<teamNameList.length/29; i++){               
              groupOfThirty.push(teamNameList.slice(i*29, 29*(i+1)).join(`','`));                
              groupOfThirtyExpression.push(`and data.attributes.team_name NOT_IN ['${groupOfThirty[i]}']`);
          }            
          expression += groupOfThirtyExpression.join(' ');

          // Run the search again
          q.search(expression).catch(() => {
              error = "Invalid query" ;
              console.log('Error',error);
          });
        } else {
          teamNameOptions = teamNameList.sort(sortCaseInsensitive).map(value => ({
            value,
            label: value,
            default: teamNameOptions.some(o => o.value === value && o.default) 
          }));
        }
      });

      q.search('data.attributes.team_name CONTAINS ""').catch(() => {
          error = "Invalid query" ;
          console.log('Error',error);
      });
  });
}

export const teamNameFilter = () => {
  return{
      id: 'data.attributes.team_name',
      title: 'Team Name',
      fieldName: 'teamName',
      options: teamNameOptions,
      customStructure: {
        field: <MultiSelectFilter isMultiSelect={true} />,
        label: <MultiSelectFilterLabel />
      },
      condition: 'IN'
    };
};


  


