import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`
