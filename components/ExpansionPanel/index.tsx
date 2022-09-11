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
  requireResolve: false,
  openPanel: false,
  resolvedPanels: [],
})

// ExpansionPanel
const Panel: React.FC<PanelProps> = ({
  totalPanel,
  accordion = false,
  children,
  requireResolve = false,
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
      requireResolve,
      openPanel,
      activeIdx,
      resolvedPanels,
    }
  }, [handleExpansion, openPanel, activeIdx, resolvedPanels, requireResolve])

  const call = (c: (args: PanelCallback) => ReactNode) => {
    return c({
      activeIndex: openPanel ? activeIdx : -1,
      resolver: () => {
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
const Item: React.FC<ItemProps> = (props) => {
  const componentName = 'ItemHeader'
  const wrapperJsx = props.as || 'div'

  const panelHeader = useMemo(() => {
    return React.Children.map(
      props.children,
      (child) =>
        React.isValidElement<ItemHeaderProps>(child) &&
        (child.type as React.FC).name === componentName &&
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
        (child.type as React.FC).name !== componentName &&
        child,
    )
  }, [props.children])

  return (
    <ExpansionPanelContext.Consumer>
      {(ctx) => (
        <section className="mb-3">
          {panelHeader}
          {React.createElement(
            wrapperJsx,
            {
              className: clsx('w-auto', props.className, {
                block: ctx.activeIdx === props.index && ctx.openPanel,
                hidden:
                  ctx.activeIdx !== props.index ||
                  (ctx.activeIdx === props.index && !ctx.openPanel),
              }),
            },
            children,
          )}
        </section>
      )}
    </ExpansionPanelContext.Consumer>
  )
}

// ExpansionPanelItemHeader
const ItemHeader: React.FC<ItemHeaderProps> = (props) => {
  const ctx = useContext(ExpansionPanelContext)

  const handleClick = () => {
    if (typeof props.__idx == 'number' && ctx.expand && !ctx.requireResolve) {
      ctx.expand(props.__idx)
    }

    if (
      typeof props.__idx == 'number' &&
      ctx.expand &&
      ctx.requireResolve &&
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
