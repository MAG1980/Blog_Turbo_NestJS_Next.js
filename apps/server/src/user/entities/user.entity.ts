import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Post])
  posts: Post[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => [Like])
  likes: Like[];
}
