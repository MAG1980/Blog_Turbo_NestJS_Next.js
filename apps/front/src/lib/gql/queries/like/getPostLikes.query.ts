import qgl from "graphql-tag";

export const GET_POST_LIKES = qgl`
query($postId:Int!){
  postLikesCount(postId: $postId)
  isAuthUserLikedPost(postId: $postId)
}
`