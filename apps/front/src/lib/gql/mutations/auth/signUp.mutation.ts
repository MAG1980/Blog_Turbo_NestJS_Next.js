import qgl from "graphql-tag";

export const SIGN_UP = qgl`
mutation ($signUpInput: SignUpInput!){
  signUp(signUpInput: $signUpInput){
    id
    name
  }
}
`