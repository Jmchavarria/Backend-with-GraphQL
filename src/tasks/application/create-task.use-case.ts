import { Injectable } from '@nestjs/common';
import { Task } from '../domain/models/task.model.js';
import {
  CreateTaskProps,
  TaskRepository,
} from '../domain/repositories/task.repository.interface.js';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(input: CreateTaskProps): Promise<Task> {
    return this.repository.save(input);
  }
}
