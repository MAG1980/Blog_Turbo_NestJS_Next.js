'use server'
import { print } from "graphql";

import { authFetchGraphQl } from "@/lib/authFetchGraphQl";
import { REMOVE_LIKE_FROM_POST } from "@/lib/gql/mutations/like";

export const removeLikeFromPost = async (postId: number) => {
  const data = await authFetchGraphQl(print(REMOVE_LIKE_FROM_POST), { postId }) as { unlikePost: boolean }
  return data
}