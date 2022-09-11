import { gql } from '@apollo/client'

export const EDIT_JOURNAL_INFORMATION = gql`
  mutation EditJournalInfo(
    $journalId: ID!
    $information: [JournalInformationInput]!
  ) {
    editJournalInformation(journalId: $journalId, information: $information) {
      message
      information {
        content
        heading {
          id
          name
        }
      }
    }
  }
`
