import { gql } from '@apollo/client'

export const GET_AUTH_USER = gql`
  query GetAuthUser {
    loggedInUser {
      firstName
      lastName
      email
      country
      state
    }
  }
`
