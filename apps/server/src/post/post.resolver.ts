import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from '../comment/entities/comment.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TagEntity } from '../tag/entities/tag.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { GqlUser } from '../decorators/gql-user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Query(() => [PostEntity]!)
  getPostsByJwtUser(
    @GqlUser('id') authorId: number,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ) {
    return this.postService.getPostsByAuthorId({
      authorId,
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int!)
  authorPostsCount(@GqlUser('id') authorId: number) {
    return this.postService.authorPostsCount(authorId);
  }

  @Query(() => PostEntity, { name: 'postById' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOneById(id);
  }

  @ResolveField('author', () => UserEntity, { name: 'author' })
  getAuthor(@Parent() post: PostEntity) {
    return this.postService.getAuthor(post.authorId);
  }

  @ResolveField(() => [CommentEntity], { name: 'comments' })
  getComments(@Parent() post: PostEntity) {
    return this.postService.getComments(post.id);
  }

  @ResolveField(() => [TagEntity], { name: 'tags' })
  getTags(@Parent() post: PostEntity) {
    return this.postService.getTags(post.id);
  }

  @ResolveField(() => Int, { name: 'likesCount' })
  getLikesCount(@Parent() post: PostEntity) {
    return this.postService.getLikesCount(post.id);
  }
  @Query(() => Int, { name: 'postsTotalCount' })
  getPostsTotalCount() {
    return this.postService.getPostsTotalCount();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostEntity!)
  createPost(
    @GqlUser('id') authorId: number,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postService.createPost({ authorId, createPostInput });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostEntity!)
  updatePost(
    @GqlUser('id') userId: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.updatePost({ userId, updatePostInput });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean!)
  deletePost(
    @Context()
    context: Record<string, unknown> & { req: { user: { id: number } } },
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.postService.deletePost({ userId, postId });
  }
}
