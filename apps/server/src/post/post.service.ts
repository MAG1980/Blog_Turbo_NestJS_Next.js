import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from '../constants';

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

  async getPostsTotalCount() {
    return await this.prismaService.post.count();
  }
}
