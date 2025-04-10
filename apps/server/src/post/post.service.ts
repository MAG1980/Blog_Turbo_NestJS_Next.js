import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prismaService.post.findMany({ skip, take });
  }

  async getPostsByAuthorId({
    authorId,
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    authorId: number;
    skip?: number;
    take?: number;
  }) {
    return await this.prismaService.post.findMany({
      where: {
        authorId,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        thumbnail: true,
        published: true,
        createdAt: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      skip,
      take,
    });
  }

  async getPostsTotalCount() {
    return await this.prismaService.post.count();
  }

  async findOneById(id: number) {
    return await this.prismaService.post.findUnique({
      where: { id },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async getAuthor(authorId: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: authorId,
      },
    });
  }

  async getComments(id: number) {
    return await this.prismaService.comment.findMany({
      where: {
        postId: id,
      },
    });
  }

  async getTags(id: number) {
    return await this.prismaService.tag.findMany({
      where: {
        posts: {
          some: {
            id: {
              equals: id,
            },
          },
        },
      },
    });
  }

  async getLikesCount(id: number) {
    return await this.prismaService.like.count({
      where: {
        postId: id,
      },
    });
  }

  async authorPostsCount(authorId: number) {
    return await this.prismaService.post.count({
      where: {
        authorId,
      },
    });
  }

  async createPost({
    authorId,
    createPostInput,
  }: {
    authorId: number;
    createPostInput: CreatePostInput;
  }) {
    return await this.prismaService.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: {
            id: authorId,
          },
        },
        tags: {
          connectOrCreate: createPostInput.tags.map((tag) => ({
            //Если такой тег уже есть в базе, то просто подключаем его к посту.
            where: {
              name: tag,
            },
            //Если такого тега нет, то создаем и подклчаем его к посту.
            create: {
              name: tag,
            },
          })),
        },
      },
    });
  }
}
