import { Actions } from '@twilio/flex-ui';
import { combineReducers } from 'redux';

import { reduce as QueuesViewFilterReducer } from './QueuesViewFilterState';

const updateQueueFilterState = (state) => {
  Actions.invokeAction('SetComponentState', { name: 'queueFilter', state });
};

export const setSelectedQueue = (selectedQueue) => {
  updateQueueFilterState({ selectedQueue });
};

export const clearSelectedQueue = () => {
  updateQueueFilterState({ selectedQueue: [] });
}

// Register your redux store under a unique namespace
export const namespace = 'supervisor-addons';

// Combine the reducers
export default combineReducers({
  queuesViewFilter: QueuesViewFilterReducer
});