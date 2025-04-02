'use server'
import { print } from "graphql";
import { authFetchGraphQl } from "@/lib/authFetchGraphQl";
import { GET_POST_LIKES } from "@/lib/gql/queries/like";

export const fetchPostLikesData = async (postId: number) => {
  const data = await authFetchGraphQl(print(GET_POST_LIKES), { postId }) as
    { postLikesCount: number, isAuthUserLikedPost: boolean }

  return {
    postLikesCount: data?.postLikesCount,
    isAuthUserLikedPost: data?.isAuthUserLikedPost
  }
}