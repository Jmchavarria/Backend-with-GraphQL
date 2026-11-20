import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../domain/repositories/task.repository.interface.js';

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const existingTask = await this.taskRepository.getById(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    await this.taskRepository.delete(id);
  }
}
