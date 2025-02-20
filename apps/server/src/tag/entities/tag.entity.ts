import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostEntity } from '../../post/entities/post.entity';

@ObjectType()
export class TagEntity {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [PostEntity])
  posts: PostEntity[];
}
