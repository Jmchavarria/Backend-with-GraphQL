import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  Field,
  ID,
  registerEnumType,
} from '@nestjs/graphql';
import { Task } from '../../domain/models/task.model.js';
import { CreateTaskInput } from '../dtos/create-task.input.js';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../../infrastructure/entities/task.entity.js';
import { CreateTaskUseCase } from '../../application/create-task.use-case.js';
import { GetBoarTasksUseCase } from '../../application/get-board-tasks.use-case.js';
import { TaskStatusTypeEnum } from '../../domain/enums/task-status-type.enum.js';
import type { IPagination } from '../../../common/interfaces/pagination.interface.js';
import { Pagination } from '../../../common/pagination.js';

registerEnumType(TaskStatusTypeEnum, {
  name: 'TaskStatus',
  description: 'Estados posibles para una tarea en el tablero Kanban',
});

@ObjectType('Task')
class TaskGraphQLType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description?: string;

  @Field(() => TaskStatusTypeEnum)
  status: TaskStatusTypeEnum;

  @Field()
  position: number;

  @Field()
  createdAt: Date;
}

@Resolver(() => TaskGraphQLType)
export class TaskResolver {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getBoarTasksUseCase: GetBoarTasksUseCase,
  ) {}

  @Query(() => [TaskGraphQLType], { name: 'getTasks' })
  async getTasks(input: IPagination): Promise<Pagination<Task[]>> {
    return await this.getBoarTasksUseCase.execute(input);
  }

  @Mutation(() => TaskGraphQLType, { name: 'createTask' })
  async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
    return this.createTaskUseCase.execute(input);
  }
}
