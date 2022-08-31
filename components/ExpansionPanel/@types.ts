import React from 'react'

export interface PanelCallback {
  next: () => void
}

export interface ResolvedPanel {
  idx: number
  resolved: boolean
}

export interface ExpansionPanelCtx {
  expand?: (args: number) => void
  activeIdx: number
  panelsRequireResolve: boolean
  resolvedPanels: ResolvedPanel[]
  openPanel: boolean
}

export interface PanelProps {
  children?: React.ReactNode | ((args: PanelCallback) => React.ReactNode)
  totalPanel: number
  accordion?: boolean
}

export interface ItemProps {
  children?: React.ReactNode
  index: number
  as?: string
}

export interface ItemHeaderProps {
  children?: React.ReactNode
  className?: string
  __idx?: number
}
