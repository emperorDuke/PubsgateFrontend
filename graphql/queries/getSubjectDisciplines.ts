import { gql } from '@apollo/client'

export const GET_SUBJECT_DISCIPLINES = gql`
  query GetDisciplines {
    disciplines {
      id
      name
      slug
    }
  }
`
