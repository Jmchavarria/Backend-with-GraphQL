import { TaskStatusTypeEnum } from '../enums/task-status-type.enum.js';
import { ITask } from '../interfaces/task.interface.js';
import {
  CreateTaskProps,
  UpdateTaskProps,
} from '../repositories/task.repository.interface.js';

export class Task {
  public title: string;
  public description: string;
  public status: TaskStatusTypeEnum;
  public position: number;
  public updatedAt: Date;

  private constructor(attributes: ITask) {
    Object.assign(this, attributes);
  }

  static create(props: CreateTaskProps): Task {
    const normalizedTitle = props.title?.trim();
    if (!normalizedTitle) {
      throw new Error('Task title is required and cannot be empty.');
    }

    if (normalizedTitle.length > 120) {
      throw new Error('Task title cannot exceed 120 characters.');
    }

    const normalizedDescription = props.description?.trim();
    if (!normalizedDescription) {
      throw new Error('Task description is required and cannot be empty.');
    }

    if (normalizedDescription.length > 1000) {
      throw new Error('Task description cannot exceed 1000 characters.');
    }

    return new Task({
      title: normalizedTitle,
      description: normalizedDescription,
      status: TaskStatusTypeEnum.TODO,
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstitute(props: ITask): Task {
    return new Task(props);
  }

  update(props: UpdateTaskProps): void {
    if (props.title !== undefined) {
      const normalizedTitle = props.title.trim();
      if (!normalizedTitle) {
        throw new Error('Task title cannot be empty.');
      }

      if (normalizedTitle.length > 120) {
        throw new Error('Task title cannot exceed 120 characters.');
      }

      this.title = normalizedTitle;
    }

    if (props.description !== undefined) {
      const normalizedDescription = props.description.trim();
      if (!normalizedDescription) {
        throw new Error('Task description cannot be empty.');
      }

      if (normalizedDescription.length > 1000) {
        throw new Error('Task description cannot exceed 1000 characters.');
      }

      this.description = normalizedDescription;
    }

    if (props.status !== undefined) {
      this.status = props.status;
    }

    if (props.position !== undefined) {
      if (props.position < 0) {
        throw new Error('Task position cannot be negative.');
      }

      this.position = props.position;
    }

    this.updatedAt = new Date();
  }
}
