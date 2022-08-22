import { Actions } from '@twilio/flex-ui';
import { combineReducers } from 'redux';

import { reduce as QueuesViewFilterReducer } from './QueuesViewFilterState';
import { getInstance } from '../helpers/manager';

const updateQueueFilterState = (state) => {
  Actions.invokeAction('SetComponentState', { name: 'queueFilter', state });
};

export const getSelectedQueue = () => {
  return getInstance().store.getState()?.flex?.view?.componentViewStates?.queueFilter?.selectedQueue;
};

export const setSelectedQueue = (selectedQueue) => {
  updateQueueFilterState({ selectedQueue });
};

export const clearSelectedQueue = () => {
  updateQueueFilterState({ selectedQueue: "" });
};

// Register your redux store under a unique namespace
export const namespace = 'supervisor-addons';

// Combine the reducers
export default combineReducers({
  queuesViewFilter: QueuesViewFilterReducer
});