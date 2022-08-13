import { gql } from '@apollo/client'

export const CREATE_JOURNAL = gql`
  mutation CreateJournal($name: String!, $issn: String!, $discipline: String!) {
    createJournal(name: $name, issn: $issn, discipline: $discipline) {
      message
      journal {
        id
      }
    }
  }
`
