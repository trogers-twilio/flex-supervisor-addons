import { Manager, QueuesStats } from '@twilio/flex-ui'

import {
  LOCAL_QUEUES_VIEW_FILTERS_KEY,
  LOCAL_TEAMS_VIEW_FILTERS_KEY
} from './enums';

export const getInstance = () => {
  return Manager.getInstance()
}

export const getWorkerClient = () => {
  return getInstance().workerClient
}

export const getFlexState = () => {
  return getInstance().store.getState().flex
}

export const getSkills = () => {

  const { taskrouter_skills } = getInstance().serviceConfiguration;

  return ({taskrouter_skills});
};

export const getActivities = () => {
  const state = getInstance().store.getState();
  return state?.flex?.worker?.activities;
};

/**
 * Retrive an object from local storage.
 * @param  string key
 * @return mixed
 */
export function localStorageGet (key) {
  var item = localStorage.getItem(key);

  if ( ! item ) return;

  if ( item[0] === '{' || item[0] === '[' ) return JSON.parse(item);

  return item;
}

/**
 * Save some value to local storage.
 * @param string key    
 * @param string value
 */
export function localStorageSave (key, value) {
  if ( value === undefined ) $.error("Can't store undefinded value");

  if ( typeof(value) === 'object' || typeof(value) === 'array' ) {
    value = JSON.stringify(value);
  }

  if ( typeof(value) !== 'string' ) $.error("Can't store unrecognized format value");

  localStorage.setItem(key, value);
}

/**
 * Remove element from local storage.
 * @param string key 
 */
function localStorageRemove (key) {
  localStorage.removeItem(key);
}

export function getLocalQueuesViewFilters () {
  return localStorageGet(LOCAL_QUEUES_VIEW_FILTERS_KEY);
}

export function setLocalQueuesViewFilters (selectedFilters) {
  return localStorageSave(LOCAL_QUEUES_VIEW_FILTERS_KEY, selectedFilters);
}

export function setQueuesStatsFilter (selectedQueues) {
  if (!Array.isArray(selectedQueues)) {
    return;
  }
  
  QueuesStats.setFilter((q) => selectedQueues.includes(q.friendly_name))
  QueuesStats.setSubscriptionFilter((q) => selectedQueues.includes(q.friendly_name));
}

export function getLocalTeamsViewFilters () {
  return localStorageGet(LOCAL_TEAMS_VIEW_FILTERS_KEY);
}

export function setLocalTeamsViewFilters (selectedFilters) {
  return localStorageSave(LOCAL_TEAMS_VIEW_FILTERS_KEY, selectedFilters);
}
