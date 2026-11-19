import { Injectable } from '@nestjs/common';
import {
  TaskRepository,
  UpdateTaskProps,
} from '../domain/repositories/task.repository.interface.js';
import { Task } from '../domain/models/task.model.js';
import { UpdateStatement } from 'typeorm/driver/mongodb/typings.js';

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  async execute(input: UpdateTaskProps): Promise<Task> {
    const task = await this.repository.getById(input.id);

    if (!task) {
      throw new Error(`Task with id "${input.id}" not found.`);
    }

    task.update({
      id: input.id,
      title: input.title,
      description: input.description,
      status: input.status,
      position: input.position,
    });

    return await this.repository.update(input);
  }
}
