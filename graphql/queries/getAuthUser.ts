import { gql } from '@apollo/client'

export const GET_AUTH_USER = gql`
  query GetAuthUser($token: String!) {
    loggedInUser(token: $token) {
      firstName
      lastName
      email
      country
      state
    }
  }
`
