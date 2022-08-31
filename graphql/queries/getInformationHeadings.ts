import { gql } from '@apollo/client'

export const GET_INFORMATION_HEADINGS = gql`
  query GetInformationHeadings {
    informationHeadings {
      id
      name
    }
  }
`
