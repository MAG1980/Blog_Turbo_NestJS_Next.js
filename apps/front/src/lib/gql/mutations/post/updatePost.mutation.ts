import qgl from "graphql-tag";

export const UPDATE_POST_MUTATION =qgl`
mutation($updatePostInput:UpdatePostInput!) {
  updatePost(updatePostInput:$updatePostInput){
     id
  }
}
`