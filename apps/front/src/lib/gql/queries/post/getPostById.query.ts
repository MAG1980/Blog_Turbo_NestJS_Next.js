import qgl from "graphql-tag";

export const GET_POST_BY_ID = qgl`
query($id:Int!){
  postById(id:$id){
    id
    title
    thumbnail
    content
    likesCount
    published
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