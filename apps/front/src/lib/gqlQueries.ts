import qgl from 'graphql-tag'

export const GET_POSTS = qgl`
query{
  posts{
    id
    title
    thumbnail
    content
    createdAt
    slug    
  }
}
`
