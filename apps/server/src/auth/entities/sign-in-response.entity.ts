import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInResponseEntity {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  accessToken: string;
}
