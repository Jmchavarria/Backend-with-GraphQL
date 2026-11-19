import { TaskStatusTypeEnum } from '../enums/task-status-type.enum.js';

export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: TaskStatusTypeEnum;
  position: number;
  updatedAt: Date;
  createdAt: Date;
}
