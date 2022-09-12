import { gql } from '@apollo/client'

export const GET_JOURNAL_INFORMATION = gql`
  query GetJournalInformation($journalId: ID!) {
    journalInformation(journalId: $journalId) {
      id
      content
      heading {
        id
        name
      }
    }
  }
`
