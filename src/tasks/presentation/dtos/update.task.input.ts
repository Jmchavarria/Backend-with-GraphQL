import { InputType, Field, ID, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { TaskStatusTypeEnum } from '../../domain/enums/task-status-type.enum.js';

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description?: string;

  @Field(() => TaskStatusTypeEnum, { nullable: true })
  @IsOptional()
  @IsEnum(TaskStatusTypeEnum)
  status?: TaskStatusTypeEnum;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  position?: number;
}
