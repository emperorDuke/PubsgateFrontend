import { gql } from '@apollo/client'

export const GET_JOURNAL_SUBJECT_AREAS = gql`
  query GetJournalSubjectAreas($journalId: ID!) {
    subjectAreas(journalId: $journalId) {
      id
      name
    }
  }
`
