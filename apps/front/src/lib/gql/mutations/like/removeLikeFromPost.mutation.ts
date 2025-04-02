import qgl from "graphql-tag";

export const REMOVE_LIKE_FROM_POST = qgl`
mutation($postId:Int!){
  unlikePost(postId:$postId)
}
`