import { gql } from '@apollo/client'

export const IS_LOGGED_IN = gql`
  query GetLoggedInUser {
    isLoggedIn @client
  }
`
