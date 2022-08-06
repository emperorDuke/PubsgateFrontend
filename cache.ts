import { InMemoryCache, makeVar } from '@apollo/client'

interface IsLoggedInVar {
  isLoggedIn: null | boolean
  token?: string
}
export const isLoggedInVar = makeVar<IsLoggedInVar>({
  isLoggedIn: null,
  token: '',
})

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar()
          },
        },
      },
    },
  },
})
