import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { UserId } from '../auth/types';

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  //Только аутентифицированные пользователи могут создавать комментарии
  //Добавляет в Request.user.id, нужный для создания ссылки на автора.
  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentEntity)
  createComment(
    @Context() context: Record<string, unknown> & { req: { user: UserId } },
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const authorId: number = context.req.user.id;
    return this.commentService.create(createCommentInput, authorId);
  }

  @Query(() => [CommentEntity], { name: 'comment' })
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => CommentEntity, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => CommentEntity)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => CommentEntity)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }

  @Query(() => [CommentEntity])
  getPostComments(
    @Args('postId', { type: () => Int! }) postId: number,
    @Args('take', {
      type: () => Int,
      nullable: true,
      defaultValue: DEFAULT_PAGE_SIZE,
    })
    take: number,
    @Args('skip', {
      type: () => Int,
      nullable: true,
      defaultValue: 0,
    })
    skip: number,
  ) {
    return this.commentService.getPostComments({ postId, take, skip });
  }

  @Query(() => Int!)
  postCommentsCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.commentService.postCommentsCount(postId);
  }
}
