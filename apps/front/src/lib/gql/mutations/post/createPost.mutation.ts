import qgl from 'graphql-tag';

export const CREATE_POST_MUTATION=qgl`
mutation($updatePostInput:UpdatePostInput!) {
  updatePost(updatePostInput:$updatePostInput){
     id
  }
}
`