import qgl from "graphql-tag";

export const DELETE_POST_MUTATION = qgl`
mutation($postId:Int!){
  deletePost(postId:$postId)
}`