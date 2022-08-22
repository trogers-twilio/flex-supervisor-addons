import { Supervisor } from '@twilio/flex-ui';

import ClearFiltersButtons from '../components/TeamsViewFilterComponents/ClearFiltersButtons';

export const modTeamFiltersPanel = () => {
  Supervisor.TeamFiltersPanel.Content.add(<ClearFiltersButtons key="clear-selections-button" />);
}
