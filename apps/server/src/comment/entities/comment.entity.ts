import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  postId: number;

  @Field(() => Int)
  authorId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  author: User;
}
