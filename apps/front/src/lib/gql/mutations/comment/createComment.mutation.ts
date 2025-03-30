import qgl from 'graphql-tag';

export const CREATE_COMMENT = qgl`
mutation($createCommentInput:CreateCommentInput!){
  createComment(createCommentInput:$createCommentInput){
    id
    postId
    authorId
  }
}
`