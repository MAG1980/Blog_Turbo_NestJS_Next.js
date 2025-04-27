import qgl from 'graphql-tag';

export const SIGN_IN = qgl`
mutation($signInInput:SignInInput!){
  signIn(signInInput:$signInInput){
    user{
      id
      name
      avatar
    }
    accessToken
  }
}
`;