import { Resolver, Query, ResolveField, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from '../user/entities/user.entity';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostEntity], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @ResolveField('author', () => UserEntity)
  async author(@Args('id') id: number) {
    return { id };
  }
}
