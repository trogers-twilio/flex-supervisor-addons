import { SideNav } from '@twilio/flex-ui';

import CombinedRealtimeNavItem from '../components/CombinedRealtimeViewComponents/CombinedRealtimeNavItem/CombinedRealtimeNavItem';
import { COMBINED_VIEW_NAME } from '../helpers/enums';


export const modSideNav = () => {
  SideNav.Content.add(
    <CombinedRealtimeNavItem viewName={COMBINED_VIEW_NAME} key="combined-realtime-view-button" />,
    { sortOrder: 2 }
  );
};
