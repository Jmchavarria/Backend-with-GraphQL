import { Injectable } from '@nestjs/common';
import { Task } from '../domain/models/task.model.js';
import { TaskRepository } from '../domain/repositories/task.repository.interface.js';
import { IPagination } from '../../common/interfaces/pagination.interface.js';
import { Pagination } from '../../common/pagination.js';

@Injectable()
export class GetBoarTasksUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(input: IPagination): Promise<Pagination<Task[]>> {
    return this.repository.get(input);
  }
}
