import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from 'react'
import {
  ExpansionPanelCtx,
  ItemHeaderProps,
  ItemProps,
  PanelCallback,
  PanelProps,
  ResolvedPanel,
} from './@types'
import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'classNames'

// context
const ExpansionPanelContext = createContext<ExpansionPanelCtx>({
  activeIdx: 0,
  panelsRequireResolve: false,
  openPanel: false,
  resolvedPanels: [],
})

// ExpansionPanel
const Panel: React.ComponentType<PanelProps> = ({
  totalPanel,
  accordion = false,
  children,
}) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [resolvedPanels, setResolvedPanels] = useState<ResolvedPanel[]>([])
  const [openPanel, setOpenPanel] = useState(false)

  useEffect(() => {
    children
    setResolvedPanels(
      [...Array(totalPanel)].map((p, i) => ({
        idx: i,
        resolved: i === 0,
      })),
    )
  }, [totalPanel, children])

  useEffect(() => {
    if (accordion) setOpenPanel(true)
  }, [accordion, setOpenPanel])

  const handleExpansion = useCallback(
    (idx: number) => {
      setActiveIdx(idx)

      if (!accordion) setOpenPanel(!openPanel)
    },
    [setOpenPanel, setActiveIdx, accordion, openPanel],
  )

  const ctxProps: ExpansionPanelCtx = useMemo(() => {
    return {
      expand: handleExpansion,
      panelsRequireResolve: typeof children === 'function',
      openPanel,
      activeIdx,
      resolvedPanels,
    }
  }, [handleExpansion, children, openPanel, activeIdx, resolvedPanels])

  const call = (c: (args: PanelCallback) => ReactNode) => {
    return c({
      next: () => {
        if (activeIdx < totalPanel - 1) {
          const nextIndex = activeIdx + 1

          setActiveIdx(nextIndex)
          setResolvedPanels(
            resolvedPanels.map((p) => {
              if (p.idx === nextIndex) {
                p.resolved = true
                return p
              }

              return p
            }),
          )
        }
      },
    })
  }

  return (
    <ExpansionPanelContext.Provider value={ctxProps}>
      {typeof children == 'function' ? call(children) : children}
    </ExpansionPanelContext.Provider>
  )
}

// ExpansionPanelItem
const Item: React.ComponentType<ItemProps> = (props) => {
  const componentName = 'ItemHeader'

  const panelHeader = useMemo(() => {
    return React.Children.map(
      props.children,
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).name === componentName &&
        React.cloneElement(child, {
          __idx: props.index,
        }),
    )
  }, [props.children, props.index])

  const children = useMemo(() => {
    return React.Children.map(
      props.children,
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).name !== componentName &&
        child,
    )
  }, [props.children])

  return (
    <ExpansionPanelContext.Consumer>
      {(ctx) => (
        <div className="mb-3">
          {panelHeader}
          <div
            className={clsx('w-auto', {
              block: ctx.activeIdx === props.index && ctx.openPanel,
              hidden:
                ctx.activeIdx !== props.index ||
                (ctx.activeIdx === props.index && !ctx.openPanel),
            })}
          >
            {children}
          </div>
        </div>
      )}
    </ExpansionPanelContext.Consumer>
  )
}

// ExpansionPanelItemHeader
const ItemHeader: React.ComponentType<ItemHeaderProps> = (props) => {
  const ctx = useContext(ExpansionPanelContext)

  const handleClick = () => {
    if (
      typeof props.__idx == 'number' &&
      ctx.expand &&
      !ctx.panelsRequireResolve
    ) {
      ctx.expand(props.__idx)
    }

    if (
      typeof props.__idx == 'number' &&
      ctx.expand &&
      ctx.panelsRequireResolve &&
      ctx.resolvedPanels.some((r) => r.idx === props.__idx && r.resolved)
    ) {
      ctx.expand(props.__idx)
    }
  }

  const rotateChevronIcon = ctx.activeIdx === props.__idx && ctx.openPanel

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'w-full flex flex-nowrap justify-start items-center py-2',
        props.className,
      )}
    >
      {props.children}
      <span className="grow" />
      <ChevronDownIcon
        className={clsx(
          'h-4 w-4 text-inherit mt-2 transition-rotate duration-200 ease-in',
          { 'rotate-180': rotateChevronIcon },
        )}
      />
    </button>
  )
}

export default Object.assign(Panel, {
  Item,
  Header: ItemHeader,
})
