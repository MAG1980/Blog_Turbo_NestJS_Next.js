'use server';
import { print } from 'graphql';
import { fetchGraphQL } from '@/lib/fetch.GraphQL';
import { GET_POSTS } from '@/lib/gqlQueries';
import { transformTakeSkip } from '@/lib/helpers';

export const fetchPosts = async ({ pageNumber = 1, pageSize = 12 }: { pageNumber?: number, pageSize?: number }) => {
  const { skip, take } = transformTakeSkip({ pageNumber, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });
  return { posts: data?.posts, postsTotalCount: data?.postsTotalCount };
};