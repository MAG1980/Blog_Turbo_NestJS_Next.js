import qgl from "graphql-tag";

export const GET_COMMENTS_GY_POST_ID=qgl`
query($postId:Int!, $skip:Int, $take:Int){
    getPostComments(postId:$postId, skip:$skip, take:$take){
    id
    content
    createdAt 
    author{
      name
      avatar
    }
  }
  postCommentsCount(postId:$postId)
  }
`