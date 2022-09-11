import React from 'react'
import { ToolbarCtxProps } from './@types'

const ToolbarContext = React.createContext<ToolbarCtxProps>({
  size: 'small',
  variant: 'normal',
})

export default ToolbarContext
