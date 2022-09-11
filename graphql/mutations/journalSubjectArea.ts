import { gql } from '@apollo/client'

export const EDIT_JOURNAL_SUBJECT_AREA = gql`
  mutation SubjectArea(
    $journalId: ID!
    $subjectAreas: [JournalSubjectAreaInput]!
  ) {
    journalSubjectArea(journalId: $journalId, subjectAreas: $subjectAreas) {
      message
    }
  }
`
