import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from '../../user/entities/user.entity';
import { PostEntity } from '../../post/entities/post.entity';

@ObjectType()
export class CommentEntity {
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

  @Field(() => PostEntity)
  post: PostEntity;

  @Field(() => UserEntity)
  author: UserEntity;
}
