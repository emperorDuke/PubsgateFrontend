import { gql } from '@apollo/client'

export const CREATE_EDITOR = gql`
  mutation AddEditor(
    $affiliation: String!
    $phoneNumber: String!
    $specialisation: String!
    $journalId: ID!
  ) {
    createEditor(
      affiliation: $affiliation
      phoneNumber: $phoneNumber
      specialisation: $specialisation
      journalId: $journalId
    ) {
      message
      editor {
        id
        affiliation
        phoneNumber
        user {
          firstName
          lastName
        }
      }
    }
  }
`
