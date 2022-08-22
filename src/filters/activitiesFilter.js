import React from 'react';

import { MultiSelectFilter, MultiSelectFilterLabel } from '../components/TeamsViewFilterComponents/MultiSelectFilter';
import { getActivities } from '../helpers/manager';

const sortCaseInsensitive = function (a, b) {
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}

const activitiesMap = getActivities();

const activities = activitiesMap && Array.from(activitiesMap.values());

export const activitiesOptions = activities.sort(sortCaseInsensitive).map(a => ({
  value: a.name,
  label: a.name,
  default: false
}));

export const activitiesFilter = () => {
  return{
    id: 'data.activity_name',
    title: 'Activities',
    fieldName: 'activities',
    options: activitiesOptions,
    customStructure: {
      field: <MultiSelectFilter isMultiSelect={true} />,
      label: <MultiSelectFilterLabel />
    },
    condition: 'IN'
  };

};