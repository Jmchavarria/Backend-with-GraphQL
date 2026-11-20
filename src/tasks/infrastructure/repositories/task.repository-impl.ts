import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../domain/models/task.model.js';
import {
  CreateTaskProps,
  UpdateTaskProps,
  TaskRepository,
} from '../../domain/repositories/task.repository.interface.js';
import { TaskEntity } from '../entities/task.entity.js';
import { Repository } from 'typeorm';
import { TaskMapper } from '../mappers/task.mapper.js';
import { Pagination } from '../../../common/pagination.js';
import { IPagination } from '../../../common/interfaces/pagination.interface.js';

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>,
  ) {}

  async get(input: IPagination): Promise<Pagination<Task[]>> {
    const { pageQuery = 1, takeQuery = 5 } = input;
    const total = await this.repository.count();

    const skip = pageQuery - 1 * takeQuery;

    const data = await this.repository.find({ skip, take: takeQuery });
    return new Pagination(
      data.map((entity) => TaskMapper.toDomain(entity)),
      total,
      pageQuery,
      takeQuery,
    );
  }

  async save(task: CreateTaskProps): Promise<Task> {
    const data = await this.repository.save(task);
    return TaskMapper.toDomain(data);
  }

  async update(task: UpdateTaskProps): Promise<Task> {
    const data = await this.repository.save(task);

    return TaskMapper.toDomain(data);
  }

  async getById(id: string): Promise<Task | null> {
    const data = await this.repository.findOneBy({ id });
    return data ? TaskMapper.toDomain(data) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
