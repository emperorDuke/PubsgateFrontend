import { gql } from '@apollo/client'

export const TRANSFER_JOURNAL = gql`
  mutation TransferJournalManagement($email: String!, $journalId: ID!) {
    transferManagement(email: $email, journalId: $journalId) {
      message
    }
  }
`
