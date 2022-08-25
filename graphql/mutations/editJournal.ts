import { gql } from '@apollo/client'

export const EDIT_JOURNAL = gql`
  mutation EditJournal(
    $journalId: ID!
    $publicationStartDate: Date
    $publicationFrequency: PublicationFrequency
    $isoAbbreviation: String
    $logo: Upload
  ) {
    editJournal(
      journalId: $journalId
      publicationStartDate: $publicationStartDate
      publicationFrequency: $publicationFrequency
      isoAbbreviation: $isoAbbreviation
      logo: $logo
    ) {
      message
      journal {
        id
        name
        publicationStartDate
        publicationFrequency
        logo
        isoAbbreviation
        discipline {
          name
        }
      }
    }
  }
`
