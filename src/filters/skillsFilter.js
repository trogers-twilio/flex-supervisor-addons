import React from 'react';

import { MultiSelectFilter, MultiSelectFilterLabel } from '../components/TeamsViewFilterComponents/MultiSelectFilter';
import { getSkills } from '../helpers/manager';

const sortCaseInsensitive = function (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

export const skillsFilter = () => {

  const value = getSkills();

  const skillsArray = []

  if (Array.isArray(value.taskrouter_skills)) {
    value.taskrouter_skills.forEach(element => skillsArray.push(element.name));
  }


  return{
    id: 'data.attributes.routing.skills',
    title: 'Skills',
    fieldName: 'skills',
    options: skillsArray.sort(sortCaseInsensitive).map(value => ({
      value,
      label: value,
      default: false
    })),
    customStructure: {
      field: <MultiSelectFilter isMultiSelect={true} />,
      label: <MultiSelectFilterLabel />
    },
    condition: 'IN'
  };

};