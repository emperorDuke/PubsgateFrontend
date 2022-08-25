import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from 'react'
import {
  ExpansionCtxType,
  ItemHeaderProps,
  ItemProps,
  PanelCallback,
  PanelProps,
  ResolvedPanel,
} from './@types'
import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'classNames'

// context
const ExpansionCtx = createContext<ExpansionCtxType>({
  activeIdx: 0,
  panelsRequireResolve: false,
  openPanel: false,
  resolvedPanels: [
    {
      idx: 0,
      resolved: false,
    },
  ],
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
    setResolvedPanels(
      [...Array(totalPanel)].map((p, i) => ({
        idx: i,
        resolved: i === 0 ? true : false,
      })),
    )
  }, [totalPanel])

  useEffect(() => {
    if (accordion) setOpenPanel(true)
  }, [accordion, setOpenPanel])

  const handleExpansionItemClick = (idx: number) => {
    setActiveIdx(idx)

    if (!accordion) {
      setOpenPanel(!openPanel)
    }
  }

  const handleNextPanel = () => {
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
  }

  const call = (c: (args: PanelCallback) => ReactNode) => {
    return c({
      next: handleNextPanel,
    })
  }

  const ctxProps: ExpansionCtxType = {
    expand: handleExpansionItemClick,
    panelsRequireResolve: typeof children === 'function',
    openPanel,
    activeIdx,
    resolvedPanels,
  }

  return (
    <ExpansionCtx.Provider value={ctxProps}>
      {typeof children === 'function' ? call(children) : children}
    </ExpansionCtx.Provider>
  )
}

// ExpansionPanelItem
const Item: React.ComponentType<ItemProps> = (props) => {
  const componentName = 'ItemHeader'

  const { expand, activeIdx, openPanel } = useContext(ExpansionCtx)

  const panelHeader = useMemo(() => {
    return React.Children.map(
      props.children,
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).name === componentName &&
        React.cloneElement(child, {
          __onClick: expand,
          __idx: props.index,
        }),
    )
  }, [props.children, props.index, expand])

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
    <div className="mb-3">
      <div className="flex flex-nowrap border border-solid border-border-col rounded-lg items-center px-2">
        {panelHeader}
        <div className="grow" />
        <ChevronDownIcon
          className={clsx(
            'h-4 w-4 text-inherit mt-2 transition-rotate duration-200 ease-in',
            {
              'rotate-180': activeIdx === props.index && openPanel,
            },
          )}
        />
      </div>
      <div
        className={clsx('w-auto', {
          block: activeIdx === props.index && openPanel,
          hidden:
            activeIdx !== props.index ||
            (activeIdx === props.index && !openPanel),
        })}
      >
        {children}
      </div>
    </div>
  )
}

// ExpansionPanelItemHeader
const ItemHeader: React.ComponentType<ItemHeaderProps> = (props) => {
  const { resolvedPanels, panelsRequireResolve } = useContext(ExpansionCtx)

  const handleClick = () => {
    if (
      typeof props.__idx == 'number' &&
      props.__onClick &&
      !panelsRequireResolve
    ) {
      props.__onClick(props.__idx)
    }

    if (
      typeof props.__idx == 'number' &&
      props.__onClick &&
      panelsRequireResolve &&
      resolvedPanels.some((r) => r.idx === props.__idx && r.resolved)
    ) {
      props.__onClick(props.__idx)
    }
  }
  return (
    <button
      className={clsx('w-full flex justify-start py-2', props.className)}
      onClick={handleClick}
    >
      {props.children}
    </button>
  )
}

export default Object.assign(Panel, {
  Item,
  Header: ItemHeader,
})
