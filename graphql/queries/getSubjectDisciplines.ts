import { gql } from '@apollo/client'

export const GET_SUBJECT_DISCIPLINES = gql`
  query GetSubjectDisciplines {
    subjectDisciplines {
      id
      name
    }
  }
`
