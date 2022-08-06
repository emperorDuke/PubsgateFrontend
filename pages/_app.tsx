import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import client from '../apollo-client'
import React from 'react'
import { isLoggedInVar } from '../cache'
import { getCookie } from 'cookies-next'
import { GET_AUTH_USER } from '../graphql/queries/getAuthUser'

function MyApp({ Component, pageProps }: AppProps) {
  const auth = useReactiveVar(isLoggedInVar)

  React.useEffect(() => {
    const token = getCookie('auth-token') as string
    const getUserBio = async () => {
      if (typeof auth.isLoggedIn !== 'boolean' && token) {
        client
          .query({
            query: GET_AUTH_USER,
            variables: { token },
          })
          .then(() => {
            isLoggedInVar({
              isLoggedIn: true,
              token,
            })
          })
      }
    }

    getUserBio()
  }, [])

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
