import { Resolver, Query, ResolveField, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @ResolveField('author', () => User)
  async author(@Args('id') id: number) {
    return { id };
  }
}
