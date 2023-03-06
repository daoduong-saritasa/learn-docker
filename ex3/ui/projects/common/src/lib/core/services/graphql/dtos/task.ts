/* eslint-disable jsdoc/require-jsdoc */
import { Nodes } from './nodes';

export interface TaskDto {
  name: string;
  id: number;
  description: string;
  taskGroupsByTaskId: Nodes<TaskGroupDto>;
}

export interface TaskGroupDto {
  sentAt: string;
  groupId: number;
}

export interface TasksDto {
  allTasks: Nodes<TaskDto>;
}
