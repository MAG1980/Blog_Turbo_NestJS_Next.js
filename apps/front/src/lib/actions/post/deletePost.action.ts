'use server'

import { print } from 'graphql'
import { authFetchGraphQl } from "@/lib/authFetchGraphQl";
import { DELETE_POST_MUTATION } from "@/lib/gql/mutations/post";

export const deletePost = async (postId: number) => {
  const data = await authFetchGraphQl(print(DELETE_POST_MUTATION), {
    postId
  }) as { deletePost: boolean }

  return data.deletePost
}