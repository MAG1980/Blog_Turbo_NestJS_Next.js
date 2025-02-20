import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { LikeEntity } from '../../like/entities/like.entity';

@ObjectType()
export class PostEntity {
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

  @Field(() => Int)
  authorId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => CommentEntity)
  comments: CommentEntity[];

  @Field(() => UserEntity)
  author: UserEntity;

  @Field(() => [TagEntity])
  tags: TagEntity[];

  @Field(() => [LikeEntity])
  likes: LikeEntity[];
}
