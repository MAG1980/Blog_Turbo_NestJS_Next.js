import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}

  async likePost({ userId, postId }: { userId: number; postId: number }) {
    try {
      //Преобразуем в boolean
      return !!(await this.prismaService.like.create({
        data: {
          user: {
            connect: { id: userId },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      }));
    } catch (error) {
      throw new BadRequestException('You have already liked this post', {
        cause: error,
      });
    }
  }

  async unlikePost({ userId, postId }: { userId: number; postId: number }) {
    try {
      await this.prismaService.like.delete({
        where: {
          userIdPostId: {
            userId,
            postId,
          },
        },
      });
      return true;
    } catch (error) {
      throw new BadRequestException('You have not liked this post', {
        cause: error,
      });
    }
  }

  async postLikesCount({ postId }: { postId: number }) {
    return await this.prismaService.like.count({
      where: { postId },
    });
  }

  async isUserLikedPost({
    userId,
    postId,
  }: {
    userId: number;
    postId: number;
  }) {
    const like = await this.prismaService.like.findUnique({
      where: {
        userIdPostId: {
          userId,
          postId,
        },
      },
    });

    return !!like;
  }
}
