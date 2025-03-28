"use server"

import { print } from 'graphql/index';
import { fetchGraphQL } from "@/lib/fetch.GraphQL";
import { GET_COMMENTS_GY_POST_ID } from "@/lib/gql/queries/comment";
import { CommentEntity } from "server/dist/src/comment/entities/comment.entity";

export const fetchCommentsByPostId = async ({ postId, skip, take }: { postId: number, skip: number, take: number }) => {
  const data= await fetchGraphQL(print(GET_COMMENTS_GY_POST_ID), { postId, skip, take }) as { getPostComments: CommentEntity[], postCommentsCount: number }

  return {
    comments: data?.getPostComments as CommentEntity[] || [],
    totalCount: data?.postCommentsCount
  }
}