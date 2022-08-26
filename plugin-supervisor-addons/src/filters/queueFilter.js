import React from 'react';

import TaskRouterService from '../services/TaskRouterService';
import { QueueSelectFilter, QueueSelectFilterLabel } from '../components/TeamsViewFilterComponents/QueueSelectFilter';

let queueOptions = [];

export const queueFilterList = async () => {

  const taskQueues = await TaskRouterService.getQueues();

  queueOptions = taskQueues.map(q => ({
    value: q.sid,
    label: q.friendlyName,
    default: queueOptions.some(o => o.value === q.sid && o.default) 
  }));

  if (Array.isArray(queueOptions) && queueOptions.length > 0) {
    queueOptions.sort((a, b) => {
      return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
    });
  }
}

export const queueFilter = () => ({
  id: 'queue-replacement',
  title: 'Queue Eligibility',
  fieldName: 'queue',
  options: queueOptions,
  customStructure: {
    field: <QueueSelectFilter isMultiSelect={false} />,
    label: <QueueSelectFilterLabel options={queueOptions} />
  },
  condition: 'CONTAINS'
});