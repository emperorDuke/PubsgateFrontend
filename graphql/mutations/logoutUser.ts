import { gql } from '@apollo/client'

export const LOGOUT_USER = gql`
  mutation LogoutUser($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      revoked
    }
  }
`
