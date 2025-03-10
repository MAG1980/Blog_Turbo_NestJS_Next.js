'use server';
import { print } from 'graphql';
import { fetchGraphQL } from '@/lib/fetch.GraphQL';
import { GET_POST_BY_ID, GET_POSTS } from '@/lib/gqlQueries';
import { transformTakeSkip } from '@/lib/helpers';
import { PostEntity } from "server/dist/src/post/entities/post.entity";

export const fetchPosts = async ({ pageNumber = 1, pageSize = 12 }: { pageNumber?: number, pageSize?: number }) => {
  const { skip, take } = transformTakeSkip({ pageNumber, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take }) as { posts: PostEntity[] } & {
    postsTotalCount: number
  };
  return { posts: data?.posts, postsTotalCount: data?.postsTotalCount };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id }) as { postById: PostEntity & { likesCount: number } }
  return data?.postById
}