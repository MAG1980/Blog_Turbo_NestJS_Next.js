import qgl from "graphql-tag";

export const GET_POSTS_BY_JWT_USER = qgl`
query($skip:Int,$take:Int){
  authorPostsCount
  getPostsByJwtUser(skip:$skip,take:$take){
    id
    slug
    title
    content
    thumbnail
    published
    createdAt
    _count{
      likes
      comments
    }
  }
}
`