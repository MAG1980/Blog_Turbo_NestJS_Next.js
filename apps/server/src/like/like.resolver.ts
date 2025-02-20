import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { LikeEntity } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';

@Resolver(() => LikeEntity)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => LikeEntity)
  createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
    return this.likeService.create(createLikeInput);
  }

  @Query(() => [LikeEntity], { name: 'like' })
  findAll() {
    return this.likeService.findAll();
  }

  @Query(() => LikeEntity, { name: 'like' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.findOne(id);
  }

  @Mutation(() => LikeEntity)
  updateLike(@Args('updateLikeInput') updateLikeInput: UpdateLikeInput) {
    return this.likeService.update(updateLikeInput.id, updateLikeInput);
  }

  @Mutation(() => LikeEntity)
  removeLike(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.remove(id);
  }
}
