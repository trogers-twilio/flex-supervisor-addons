import { modWorkersDataTable } from './WorkersDataTable';
import { modQueuesView } from './QueuesStatsView';
import { modViewCollection } from './ViewCollection';
import { modSideNav } from './SideNav';
import { modTeamFiltersPanel } from './TeamFiltersPanel';

export const initializeFlexUiModifications = () => {
  modWorkersDataTable();
  modQueuesView();
  modViewCollection();
  modSideNav();
  modTeamFiltersPanel();
};
