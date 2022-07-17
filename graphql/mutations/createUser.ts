import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateAuthorAndLogin(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $country: String!
    $state: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      country: $country
      state: $state
    ) {
      user {
        firstName
        lastName
        email
        country
        state
      }
      accessToken
      refreshToken
    }
  }
`
