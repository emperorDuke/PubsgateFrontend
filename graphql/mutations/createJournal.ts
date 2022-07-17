import { gql } from '@apollo/client'

export const CREATE_JOURNAL = gql`
  mutation CreateJournal(
    $name: String!
    $issn: String!
    $subjectDiscipline: String!
  ) {
    createJournal(
      name: $name
      issn: $issn
      subjectDiscipline: $subjectDiscipline
    ) {
      message
      journal {
        id
      }
    }
  }
`
