import qgl from "graphql-tag";

export const CREATE_USER = qgl`
mutation ($createUserInput: CreateUserInput!){
  createUser(createUserInput: $createUserInput){
  id
  name
  }
}
`