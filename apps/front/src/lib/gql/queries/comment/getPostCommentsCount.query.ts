import qgl from "graphql-tag";

export const GET_POST_COMMENTS_COUNT = qgl`
query($postId:Int!){
  postCommentsCount(postId:$postId)
}`