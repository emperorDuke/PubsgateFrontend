import React from 'react'

export interface PanelCallback {
  resolver: () => void
  activeIndex: number
}

export interface ResolvedPanel {
  idx: number
  resolved: boolean
}

export interface ExpansionPanelCtx {
  expand?: (args: number) => void
  activeIdx: number
  requireResolve: boolean
  resolvedPanels: ResolvedPanel[]
  openPanel: boolean
}

export interface PanelProps {
  children?: React.ReactNode | ((args: PanelCallback) => React.ReactNode)
  totalPanel: number
  accordion?: boolean
  requireResolve?: boolean
}

export interface ItemProps {
  children?: React.ReactNode
  index: number
  as?: string
  className?: string
}

export interface ItemHeaderProps {
  children?: React.ReactNode
  className?: string
  __idx?: number
}
