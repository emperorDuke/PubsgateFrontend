import React from 'react'

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' && window.document
    ? React.useLayoutEffect
    : React.useEffect

export const useClientSide = () => {
  const [clientSide, setClientSide] = React.useState(false)

  React.useEffect(() => {
    setClientSide(true)
  }, [])

  return clientSide
}
