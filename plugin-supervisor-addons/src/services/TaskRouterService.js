import { getInstance } from '../helpers/manager';
import { Actions as QueuesViewFilterActions } from '../state/QueuesViewFilterState';
import {
	fetchJsonWithReject,
	sortArrayOfObjectsByStringProperty
} from '../helpers/utils';

let queues = null

class TaskRouterService {
  manager = getInstance();

	serverlessDomain = process.env.REACT_APP_SERVERLESS_DOMAIN;

	buildBody(encodedParams) {
    return Object.keys(encodedParams).reduce((result, paramName, idx) => {
      if (encodedParams[paramName] === undefined) {
        return result;
      }
      if (idx > 0) {
        return `${result}&${paramName}=${encodedParams[paramName]}`;
      }
      return `${paramName}=${encodedParams[paramName]}`;
    }, '');
  }

	// does a one time fetch for queues per session
	// since queue configuration seldom changes
	async getQueues() {

		if(queues) return queues

		queues = await this.#getQueues();
		return queues;
	}

	#getQueues = () => {

		const encodedParams = {
			Token: encodeURIComponent(this.manager.user.token)
		};

		return fetchJsonWithReject(
			`https://${this.serverlessDomain}/list-taskqueues`,
			{
				method: 'post',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: this.buildBody(encodedParams)
			}
		).then((response) => {
			const { queues } = response;
			return queues;
		});
	};

	// populating TaskQueues in redux store for use by React components
	populateTaskQueues() {
    return new Promise(async (resolve, reject) => {
      const credentials = Buffer.from(`token:${this.manager.user.token}`).toString('base64');
      const workspaceSid = this.manager.workerClient.workspaceSid;
      const pageSize = 100;
      let nextPageUri = `https://taskrouter.twilio.com/v1/Workspaces/${workspaceSid}/TaskQueues?PageSize=${pageSize}`;
      let result = [];

      try {
        while (nextPageUri) {
          // eslint-disable-next-line no-await-in-loop
          const res = await fetchJsonWithReject(nextPageUri, {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${credentials}`,
            }
          });
          if (res?.meta?.key) {
            nextPageUri = res?.meta?.next_page_url
            result = [...result, ...res[res.meta.key]];
          }
        }
        
        const sortedTaskQueues = sortArrayOfObjectsByStringProperty(result, 'friendly_name');

        this.manager.store.dispatch(QueuesViewFilterActions.updateAllQueues(sortedTaskQueues));
        resolve();
      } catch (error) {
        console.error('Error populating TaskQueues.', error);
        reject(error);
      }
    });
  }
}

export default new TaskRouterService();
