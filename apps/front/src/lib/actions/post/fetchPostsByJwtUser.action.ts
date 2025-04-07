'use server'

import { print } from "graphql";
import { authFetchGraphQl } from "@/lib/authFetchGraphQl";
import { GET_POSTS_BY_JWT_USER } from "@/lib/gql/queries/post";
import { PostEntity } from "server/dist/src/post/entities/post.entity";
import { DEFAULT_PAGE_SIZE } from "server/dist/src/constants";
import { transformTakeSkip } from "@/lib/helpers";

export const fetchPostsByJwtUser = async ({ pageNumber, pageSize = DEFAULT_PAGE_SIZE }: {
  pageNumber?: number,
  pageSize?: number
}) => {
  const { take, skip } = transformTakeSkip({ pageNumber
    , pageSize })
  const data = await authFetchGraphQl(print(GET_POSTS_BY_JWT_USER), { skip, take }) as {
    authorPostsCount: number,
    getPostsByJwtUser: PostEntity[]
  }

  return {
    totalPosts: data.authorPostsCount,
    posts: data.getPostsByJwtUser
  }
}