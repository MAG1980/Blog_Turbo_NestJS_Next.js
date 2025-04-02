'use server'
import { print } from "graphql";

import { authFetchGraphQl } from "@/lib/authFetchGraphQl";
import { SET_LIKE_TO_POST } from "@/lib/gql/mutations/like";

export const setLikeToPost = async (postId: number) => {
  const data = await authFetchGraphQl(print(SET_LIKE_TO_POST), { postId }) as { likePost: boolean }
  return data
}