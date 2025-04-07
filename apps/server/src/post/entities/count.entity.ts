import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountEntity {
  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  likes: number;
}
