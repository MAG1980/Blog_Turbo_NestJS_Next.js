import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from '../../comment/entities/comment.entity';
import { User } from '../../user/entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Like } from '../../like/entities/like.entity';

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

  @Field(() => Int)
  authorId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Comment)
  comments: Comment[];

  @Field(() => User)
  author: User;

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => [Like])
  likes: Like[];
}
