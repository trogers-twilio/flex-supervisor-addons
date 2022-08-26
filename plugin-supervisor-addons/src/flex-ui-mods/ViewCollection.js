import { View, ViewCollection } from '@twilio/flex-ui';

import CombinedRealtimeView from '../components/CombinedRealtimeViewComponents/CombinedRealtimeView/CombinedRealtimeView';
import { COMBINED_VIEW_NAME } from '../helpers/enums';


export const modViewCollection = () => {
  ViewCollection.Content.add(
    <View name={COMBINED_VIEW_NAME} key="combined-realtime-view">
      <CombinedRealtimeView key="combined-realtime-view-content" />
    </View>
  );
};
