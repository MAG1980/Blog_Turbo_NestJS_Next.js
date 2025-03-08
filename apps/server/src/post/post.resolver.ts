import {
  Resolver,
  Query,
  ResolveField,
  Args,
  Context,
  Int,
} from '@nestjs/graphql';
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
  findAll(
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    const user = context.req.user;
    console.log({ user });
    return this.postService.findAll({ skip, take });
  }

  @ResolveField('author', () => UserEntity)
  async author(@Args('id') id: number) {
    return { id };
  }

  @Query(() => Int, { name: 'postsTotalCount' })
  getPostsTotalCount() {
    return this.postService.getPostsTotalCount();
  }
}
