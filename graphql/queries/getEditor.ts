import { gql } from '@apollo/client'

export const GET_EDITOR = gql`
  query GetEditor($id: ID!) {
    editor(id: $id) {
      id
      affiliation
      user {
        firstName
        lastName
        email
      }
    }
  }
`
