import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TaskGraphQLType } from '../resolvers/task.resolver.js';

@ObjectType()
export class PaginatedTasksResponse {
  @Field(() => [TaskGraphQLType])
  data: TaskGraphQLType[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
