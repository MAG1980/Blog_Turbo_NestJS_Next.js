import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from '../../user/entities/user.entity';
import { PostEntity } from '../../post/entities/post.entity';

@ObjectType()
export class LikeEntity {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;

  @Field()
  createdAt: Date;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => PostEntity)
  post: PostEntity;
}
