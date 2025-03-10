import {
  Args,
  Context,
  Int,
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
}
