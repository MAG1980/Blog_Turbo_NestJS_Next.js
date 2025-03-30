import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PrismaService } from '../prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from '../constants';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async create({ postId, content }: CreateCommentInput, authorId: number) {
    return await this.prismaService.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
    });
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  async getPostComments({
    postId,
    take,
    skip,
  }: {
    postId: number;
    take: number;
    skip: number;
  }) {
    return this.prismaService.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: take ?? DEFAULT_PAGE_SIZE,
      skip: skip ?? 0,
    });
  }

  async postCommentsCount(postId: number) {
    return this.prismaService.comment.count({
      where: {
        postId,
      },
    });
  }
}
