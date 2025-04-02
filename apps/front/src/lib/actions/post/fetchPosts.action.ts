'use server'

import { transformTakeSkip } from '@/lib/helpers';
import { fetchGraphQL } from '@/lib/fetch.GraphQL';
import { print } from 'graphql/index';
import { GET_POSTS } from '@/lib/gql/queries/post';
import { PostEntity } from 'server/dist/src/post/entities/post.entity';

export const fetchPosts = async ({ pageNumber = 1, pageSize = 12 }: { pageNumber?: number, pageSize?: number }) => {
  const { skip, take } = transformTakeSkip({ pageNumber, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take }) as { posts: PostEntity[] } & {
    postsTotalCount: number
  };
  return { posts: data?.posts, postsTotalCount: data?.postsTotalCount };
};
