import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../domain/repositories/task.repository.interface.js';
import { Task } from '../domain/models/task.model.js';

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private readonly repository: TaskRepository) {}

  async execute(id: string): Promise<Task> {
    const category = await this.repository.getById(id);

    if (!category) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }

    return category;
  }
}
