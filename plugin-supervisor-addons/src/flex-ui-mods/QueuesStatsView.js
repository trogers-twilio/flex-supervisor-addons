import { QueuesStats, QueuesStatsView } from '@twilio/flex-ui';

import { Actions as QueuesViewFilterActions } from '../state/QueuesViewFilterState';
import QueueSelector from '../components/QueuesViewComponents/QueueSelector/QueueSelector.jsx'
import QueueFilter from '../components/QueuesViewComponents/QueueFilter/QueueFilter.jsx'
import TaskRouterService from '../services/TaskRouterService';
import {
  getInstance,
  getLocalQueuesViewFilters,
  setQueuesStatsFilter
} from '../helpers/manager';

export const modQueuesView = () => {
  const manager = getInstance();

  TaskRouterService.populateTaskQueues().then(() => {
    console.log('QueuesViewFiltersPlugin, TaskQueues populated');
  });

  // Read selected queues from local storage and push to Redux
  const localQueuesViewFilters = getLocalQueuesViewFilters();
  const defaultOutboundQueueSid = manager.serviceConfiguration.outbound_call_flows?.default?.queue_sid;

  if (Array.isArray(localQueuesViewFilters) && localQueuesViewFilters.length > 0) {
    manager.store.dispatch(QueuesViewFilterActions.updatedSelectedQueues(localQueuesViewFilters));
    setQueuesStatsFilter(localQueuesViewFilters);
  } else if (defaultOutboundQueueSid) {
    // Setting a default subscription filter, using outbound queue since it's available without
    // querying any other endpoint and it will reliably be available in realtime stats cache.
    // Critical to set a filter at Flex UI load, otherwise the realtime queue view will
    // attempt to subscribe to all queues initially which creates significant performance
    // issues when 100+ queues exist on TaskRouter
    QueuesStats.setSubscriptionFilter(q => q.sid === defaultOutboundQueueSid);
  }

  QueuesStatsView.Content.add(<QueueSelector key="queueSelector" />, {
    align: 'start',
    sortOrder: 0,
  })
  QueuesStatsView.Content.add(<QueueFilter key="queueFilter" />, { sortOrder: -1 })
};
