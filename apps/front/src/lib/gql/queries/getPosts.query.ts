import qgl from 'graphql-tag';

export const GET_POSTS = qgl`
query posts($skip: Float, $take: Float){
  posts(skip:$skip, take:$take){
    id
    title
    thumbnail
    content
    createdAt
    slug    
  }
  postsTotalCount
}
`;
