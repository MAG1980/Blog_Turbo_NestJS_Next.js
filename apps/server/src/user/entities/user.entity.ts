import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LikeEntity } from '../../like/entities/like.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { PostEntity } from '../../post/entities/post.entity';

@ObjectType()
export class UserEntity {
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

  @Field(() => [PostEntity])
  posts: PostEntity[];

  @Field(() => [CommentEntity])
  comments: CommentEntity[];

  @Field(() => [LikeEntity])
  likes: LikeEntity[];
}
