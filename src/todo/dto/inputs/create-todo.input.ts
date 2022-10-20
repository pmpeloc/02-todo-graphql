import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  description: string;
}
