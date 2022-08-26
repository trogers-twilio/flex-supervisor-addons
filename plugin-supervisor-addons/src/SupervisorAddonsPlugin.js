import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import reducers, { namespace } from './state';
import { initializeListeners } from './listeners';
import { initializeFlexUiModifications } from './flex-ui-mods';
import { registerNotifications } from './notifications';
import { initializeTeamsViewFilters } from './filters';

const PLUGIN_NAME = 'SupervisorAddonsPlugin';

export default class SupervisorAddonsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const state = manager.store.getState();
    const roles = state?.flex?.session?.ssoTokenPayload?.roles || [];

    if (roles.includes('admin') || roles.includes('supervisor')) {
      this.registerReducers(manager);

      initializeListeners();

      initializeFlexUiModifications();

      registerNotifications();

      initializeTeamsViewFilters();
    }
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
     registerReducers(manager) {
      if (!manager.store.addReducer) {
        // eslint-disable-next-line
        console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
        return;
      }
  
      manager.store.addReducer(namespace, reducers);
    }
}
