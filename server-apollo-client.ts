import { InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'
import { NextPageContext } from 'next'

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
  credentials: 'same-origin',
})

const authLink = (ctx?: NextPageContext) =>
  setContext((_, { headers }) => {
    const token =
      ctx && ctx.req
        ? getCookie('auth-token', {
            req: ctx.req,
            res: ctx.res,
          })
        : ''

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

const client = (ctx?: NextPageContext) =>
  new ApolloClient({
    ssrMode: true,
    link: authLink(ctx).concat(httpLink),
    cache: new InMemoryCache(),
  })

export default client
