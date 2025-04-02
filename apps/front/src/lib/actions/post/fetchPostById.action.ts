'use server'

import { fetchGraphQL } from '@/lib/fetch.GraphQL';
import { print } from 'graphql/index';
import { GET_POST_BY_ID } from '@/lib/gql/queries/post';
import { PostEntity } from 'server/dist/src/post/entities/post.entity';

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id }) as { postById: PostEntity & { likesCount: number } }
  return data?.postById
}