import { TeamsView } from '@twilio/flex-ui';

import { activitiesFilter, activitiesOptions } from './activitiesFilter';
import { skillsFilter, skillsOptions } from './skillsFilter';
import { managerFilter, managerFilterList, managerOptions } from './managerFilter';
import { locationFilter, locationFilterList, locationOptions } from './locationFilter';
import { queueFilter, queueFilterList, queueOptions } from './queueFilter';
import { rolesFilter, rolesFilterList, rolesOptions } from './rolesFilter';
import { getLocalTeamsViewFilters } from '../helpers/manager';

export const initializeTeamsViewFilters = () => {
  managerFilterList();
  locationFilterList();
  queueFilterList();
  rolesFilterList();

  TeamsView.defaultProps.filters = [
    activitiesFilter,
    locationFilter,
    managerFilter,
    skillsFilter,
    queueFilter,
    rolesFilter
  ];

  const savedFilters = getLocalTeamsViewFilters();

  if (Array.isArray(savedFilters?.filters) && savedFilters.filters.length > 0) {
    console.debug('Restoring saved TeamsView filters');
    setDefaultTeamsViewFilters(savedFilters.filters);
  }
}

const setDefaultOptionsValues = (options, values) => {
  console.debug('setDefaultOptionsValues, options, values:', options, values);
  if (options.length === 0) {
    if (Array.isArray(values)) {
      for (const v of values) {
        options.push({
          value: v,
          label: v,
          default: true
        });
      }
    } else if (typeof values === 'string') {
      options.push({
        value: values,
        default: true
      });
    }
    console.debug('setDefaultOptionsValues, modified options:', options);
  } else {
    options.forEach(o => values.includes(o.value)
      ? o.default = true
      : o.default = false
    );
  }
}

export const setDefaultTeamsViewFilters = (defaultFilters) => {
  if (!Array.isArray(defaultFilters)) {
    return;
  }
  for (const filter of defaultFilters) {
    switch (filter.name) {
      case activitiesFilter().id: {
        setDefaultOptionsValues(activitiesOptions, filter.values);
        break;
      }
      case locationFilter().id: {
        setDefaultOptionsValues(locationOptions, filter.values);
        break;
      }
      case managerFilter().id: {
        setDefaultOptionsValues(managerOptions, filter.values);
        break;
      }
      case skillsFilter().id: {
        setDefaultOptionsValues(skillsOptions, filter.values);
        break;
      }
      case rolesFilter().id: {
        setDefaultOptionsValues(rolesOptions, filter.values);
        break;
      }
      case queueFilter().id: {
        setDefaultOptionsValues(queueOptions, filter.values);
        break;
      }
    }
  }
}