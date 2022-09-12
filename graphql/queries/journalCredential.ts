import { gql } from '@apollo/client'

export const GET_JOURNAL_CREDENTIALS = gql`
  query GetJournal($id: ID!) {
    journal(id: $id) {
      id
      name
      slug
      issn
      publicationStartDate
      publicationFrequency
      discipline {
        id
        name
      }
      isoAbbreviation
      logo
    }
  }
`
