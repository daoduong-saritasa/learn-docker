/* eslint-disable jsdoc/require-jsdoc */
import { Nodes } from './nodes';

export interface Task {
  name: string;
  id: number;
  description: string;
  taskGroupsByTaskId: Nodes<TaskGroup>;
}

export interface TaskGroup {
  sentAt: string;
  groupId: number;
}

export interface Tasks {
  allTasks: Nodes<Task>;
}
