import { Resolver, Query, ResolveField, Args, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [PostEntity], { name: 'posts' })
  findAll(@Context() context) {
    const user = context.req.user;
    console.log({ user });
    return this.postService.findAll();
  }

  @ResolveField('author', () => UserEntity)
  async author(@Args('id') id: number) {
    return { id };
  }
}
