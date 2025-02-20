import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => Boolean)
  published: boolean;

  /*  @Field(() => Int)
  authorId: number;*/

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
