import { createContext } from 'react'
import { ExpansionPanelCtx } from './@types'

// context
const ExpansionPanelContext = createContext<ExpansionPanelCtx>({
  requireResolve: false,
  activeIdxes: [],
  resolvedPanels: [],
  expand: () => {},
})

export { ExpansionPanelContext }
