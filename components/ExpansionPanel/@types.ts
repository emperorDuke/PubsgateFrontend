import React from 'react'

export interface PanelCallback {
  /**
   * called to Resolve panel
   */
  resolver: () => void
  /** Checks if index is active */
  isActive: (idx: number) => boolean
}

export interface ResolvedPanel {
  idx: number
  resolved: boolean
}

export interface ExpansionPanelCtx {
  expand: (args: number) => void
  requireResolve: boolean
  resolvedPanels: ResolvedPanel[]
  activeIdxes: number[]
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
