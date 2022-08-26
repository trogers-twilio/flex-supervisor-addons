import { TeamsView } from '@twilio/flex-ui';

import { activitiesFilter } from './activitiesFilter';
import { skillsFilter } from './skillsFilter';
import { managerFilter, managerFilterList } from './managerFilter';
import { locationFilter, locationFilterList } from './locationFilter';
import { queueFilter, queueFilterList } from './queueFilter';
import { rolesFilter, rolesFilterList } from './rolesFilter';
import { teamNameFilter, teamNameFilterList } from './teamNameFilter';
import { getLocalTeamsViewFilters } from '../helpers/manager';

export const initializeTeamsViewFilters = () => {
  managerFilterList();
  locationFilterList();
  queueFilterList();
  rolesFilterList();
  teamNameFilterList();

  TeamsView.defaultProps.filters = [
    activitiesFilter,
    locationFilter,
    managerFilter,
    teamNameFilter,
    skillsFilter,
    queueFilter,
    rolesFilter
  ];

  const savedFilters = getLocalTeamsViewFilters();

  if (Array.isArray(savedFilters?.filters) && savedFilters.filters.length > 0) {
    console.log('initializeTeamsViewFilters: Restoring saved TeamsView filters', savedFilters.filters);
    setDefaultTeamsViewFilters(savedFilters.filters);
  }
}

const setDefaultOptionsValues = (options, values) => {
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

  for (const filter of TeamsView.defaultProps.filters) {
    const id = filter().id;
    const options = filter().options;
    const values = defaultFilters.find(f => f.name === id)?.values || [];

    setDefaultOptionsValues(options, values);
  }
}