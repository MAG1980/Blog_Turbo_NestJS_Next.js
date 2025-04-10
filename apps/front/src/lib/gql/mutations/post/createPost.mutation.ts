import qgl from 'graphql-tag';

export const CREATE_POST_MUTATION=qgl`
mutation($createPostInput:CreatePostInput!){
  createPost(createPostInput:$createPostInput){
    id  
  }
}
`