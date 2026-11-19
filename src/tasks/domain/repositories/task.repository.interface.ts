import { IPagination } from '../../../common/interfaces/pagination.interface.js';
import { Pagination } from '../../../common/pagination.js';
import { TaskStatusTypeEnum } from '../enums/task-status-type.enum.js';
import { Task } from '../models/task.model.js';

export interface CreateTaskProps {
  title: string;
  description: string;
}

export interface UpdateTaskProps extends Partial<CreateTaskProps> {
  id: string;
  status?: TaskStatusTypeEnum;
  position?: number;
}

export abstract class TaskRepository {
  abstract save(task: CreateTaskProps): Promise<Task>;
  abstract update(task: UpdateTaskProps): Promise<Task>;
  abstract getById(id: string): Promise<Task | null>;
  abstract get(input: IPagination): Promise<Pagination<Task[]>>;
}
