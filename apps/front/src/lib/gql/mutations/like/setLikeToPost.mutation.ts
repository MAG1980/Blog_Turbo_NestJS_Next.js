import qgl from "graphql-tag";

export const SET_LIKE_TO_POST = qgl`
mutation($postId:Int!){
  likePost(postId:$postId)
}
`