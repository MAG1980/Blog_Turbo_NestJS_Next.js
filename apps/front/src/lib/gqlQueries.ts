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

export const GET_POST_BY_ID = qgl`
query($id:Int!){
  postById(id:$id){
    id
    title
    thumbnail
    content
    likesCount
    createdAt
      author{
      id
      name
    }
    comments{
      id
      content
    }
    tags{
      id
      name
    }   
  }
}
`