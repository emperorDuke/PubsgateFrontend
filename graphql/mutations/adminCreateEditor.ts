import { gql } from '@apollo/client'

export const ADMIN_CREATE_EDITOR = gql`
  mutation AddEditor(
    $email: String!
    $affiliation: String
    $phoneNumber: String
    $specialisation: String
    $journalId: ID!
  ) {
    adminCreateEditor(
      email: $email
      affiliation: $affiliation
      phoneNumber: $phoneNumber
      specialisation: $specialisation
      journalId: $journalId
    ) {
      message
      editor {
        id
      }
    }
  }
`
