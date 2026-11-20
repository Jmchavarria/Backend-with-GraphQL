import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteTaskInput {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;
}
