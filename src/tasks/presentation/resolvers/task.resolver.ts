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
import { CreateTaskUseCase } from '../../application/create-task.use-case.js';
import { GetBoarTasksUseCase } from '../../application/get-board-tasks.use-case.js';
import { TaskStatusTypeEnum } from '../../domain/enums/task-status-type.enum.js';
import { UpdateTaskInput } from '../dtos/update.task.input.js';
import { UpdateTaskUseCase } from '../../application/update-task.use-case.js';
import { DeleteTaskUseCase } from '../../application/delete-task.use-case.js';
import { DeleteTaskInput } from '../dtos/delete-task.input.js';
import { PaginationInput } from '../../../common/dtos/pagintation.input.js';
import { PaginatedTasksResponse } from '../dtos/paginated-tasks.response.js';

registerEnumType(TaskStatusTypeEnum, {
  name: 'TaskStatus',
  description: 'Estados posibles para una tarea en el tablero Kanban',
});

export
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

@ObjectType()
class DeleteTaskResponse {
  @Field(() => ID)
  id: string;

  @Field()
  deleted: boolean;
}

@Resolver(() => TaskGraphQLType)
export class TaskResolver {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getBoarTasksUseCase: GetBoarTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Query(() => PaginatedTasksResponse, { name: 'getTasks' })
  async getTasks(
    @Args('input', { type: () => PaginationInput, nullable: true })
    input?: PaginationInput,
  ): Promise<PaginatedTasksResponse> {
    return await this.getBoarTasksUseCase.execute({
      pageQuery: input?.page ?? 1,
      takeQuery: input?.limit ?? 10,
    });
  }

  @Mutation(() => TaskGraphQLType, { name: 'createTask' })
  async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
    return this.createTaskUseCase.execute(input);
  }

  @Mutation(() => TaskGraphQLType, { name: 'updateTask' })
  async updateTask(@Args('input') input: UpdateTaskInput): Promise<Task> {
    return await this.updateTaskUseCase.execute(input);
  }

  @Mutation(() => DeleteTaskResponse, { name: 'deleteTask' })
  async deleteTask(
    @Args('input') input: DeleteTaskInput,
  ): Promise<DeleteTaskResponse> {
    await this.deleteTaskUseCase.execute(input.id);
    return {
      id: input.id,
      deleted: true,
    };
  }
}
