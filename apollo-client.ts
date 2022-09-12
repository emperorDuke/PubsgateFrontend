import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'

import { createUploadLink } from 'apollo-upload-client'

const httpLink = createUploadLink({
  uri: 'http://localhost:8000/graphql',
  credentials: 'same-origin',
})

const authLink = setContext((_, { headers }) => {
  const token = getCookie('auth-token')
  const authorization = token ? `Bearer ${token}` : ''

  return {
    headers: {
      ...headers,
      authorization,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
