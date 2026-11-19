import { TaskEntity } from '../entities/task.entity.js';
import { Task } from '../../domain/models/task.model.js';

export class TaskMapper {
  static toDomain(entity: TaskEntity): Task {
    return Task.reconstitute({
      title: entity.status,
      description: entity.description,
      position: entity.position,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
