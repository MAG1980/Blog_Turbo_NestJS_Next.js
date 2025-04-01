import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { LikeEntity } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => LikeEntity)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  likePost(
    @Context()
    context: Record<string, unknown> & { req: { user: { id: number } } },
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.likeService.likePost({ userId, postId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean!)
  unlikePost(
    @Context()
    context: Record<string, unknown> & { req: { user: { id: number } } },
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.likeService.unlikePost({ userId, postId });
  }

  @Query(() => Int!)
  postLikesCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.likeService.postLikesCount({ postId });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean!)
  userLikedPost(
    @Context()
    context: Record<string, unknown> & { req: { user: { id: number } } },
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.likeService.userLikedPost({ userId, postId });
  }
}
