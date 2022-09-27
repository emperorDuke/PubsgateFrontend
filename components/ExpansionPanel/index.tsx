import React, {
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from 'react'
import {
  ExpansionPanelCtx,
  ItemButtonProps,
  ItemProps,
  PanelCallback,
  PanelProps,
  ResolvedPanel,
} from './@types'
import { ChevronDownIcon } from '@heroicons/react/solid'
import clsx from 'classNames'
import { ExpansionPanelContext } from './context'

// ExpansionPanel
const Panel: React.FC<PanelProps> = ({
  totalPanel,
  accordion = false,
  children,
  requireResolve = false,
  as = React.Fragment,
}) => {
  const [resolvedPanels, setResolvedPanels] = useState<ResolvedPanel[]>([])
  const [activeIdxes, setActiveIdxes] = useState<number[]>([])

  useEffect(() => {
    setResolvedPanels(
      [...Array(totalPanel)].map((p, i) => ({
        idx: i,
        resolved: i === 0,
      })),
    )
  }, [totalPanel])

  useEffect(() => {
    if (accordion) {
      setActiveIdxes([0])
    }
  }, [accordion, setActiveIdxes])

  const handleExpansion = useCallback(
    (index: number) => {
      if (accordion) {
        setActiveIdxes([index])
      } else {
        setActiveIdxes((idxes) =>
          idxes.includes(index)
            ? idxes.filter((idx) => idx !== index)
            : idxes.concat([index]),
        )
      }
    },
    [accordion, setActiveIdxes],
  )

  const ctxProps: ExpansionPanelCtx = useMemo(() => {
    return {
      expand: handleExpansion,
      requireResolve,
      resolvedPanels,
      activeIdxes,
    }
  }, [handleExpansion, resolvedPanels, requireResolve, activeIdxes])

  const call = (c: (args: PanelCallback) => ReactNode) => {
    return c({
      isActive: (idx: number) => {
        return !!(activeIdxes.length && activeIdxes.includes(idx))
      },
      resolver: () => {
        const activeIdx = activeIdxes.pop()

        if (activeIdx && activeIdx < totalPanel - 1) {
          const nextIndex = activeIdx + 1

          setActiveIdxes([nextIndex])
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
      {React.createElement(
        as,
        {},
        typeof children == 'function' ? call(children) : children,
      )}
    </ExpansionPanelContext.Provider>
  )
}

// ExpansionPanelItem
const Item: React.FC<ItemProps> = (props) => {
  const componentName = 'ItemButton'
  const wrapperJsx = props.as || 'div'

  const panelHeader = useMemo(() => {
    return React.Children.map(
      props.children,
      (child) =>
        React.isValidElement<ItemButtonProps>(child) &&
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
        <>
          {panelHeader}
          {React.createElement(
            wrapperJsx,
            {
              id: 'expansion-panel-item',
              role: 'region',
              'aria-labelledby': 'expansion-panel-btn',
              className: clsx('w-auto', props.className, {
                block: ctx.activeIdxes.includes(props.index),
                hidden: !ctx.activeIdxes.includes(props.index),
              }),
            },
            children,
          )}
        </>
      )}
    </ExpansionPanelContext.Consumer>
  )
}

// ExpansionPanelItemHeader
const ItemButton: React.FC<ItemButtonProps> = (props) => {
  const ctx = useContext(ExpansionPanelContext)
  const btnTag = props.as || 'button'

  const handleClick = () => {
    if (typeof props.__idx == 'number' && !ctx.requireResolve) {
      ctx.expand(props.__idx)
    }

    if (
      typeof props.__idx == 'number' &&
      ctx.requireResolve &&
      ctx.resolvedPanels.some((r) => r.idx === props.__idx && r.resolved)
    ) {
      ctx.expand(props.__idx)
    }
  }

  const rotateChevronIcon = () => {
    return (
      typeof props.__idx == 'number' && ctx.activeIdxes.includes(props.__idx)
    )
  }

  const isActive = () => {
    return (
      typeof props.__idx == 'number' &&
      !!ctx.activeIdxes.length &&
      ctx.activeIdxes.includes(props.__idx)
    )
  }

  const btnProps = {
    id: 'expansion-panel-btn',
    onClick: handleClick,
    'aria-controls': 'expansion-panel-item',
    'aria-expanded': isActive() ? 'true' : 'false',
    className: clsx(
      'w-full flex flex-nowrap justify-start items-center py-2',
      props.className,
    ),
  }

  const children = (
    <>
      {props.children}
      <span className="grow" />
      <ChevronDownIcon
        className={clsx(
          'h-4 w-4 text-inherit mt-2 transition-rotate duration-200 ease-in',
          { 'rotate-180': rotateChevronIcon() },
        )}
      />
    </>
  )

  return React.createElement(btnTag, btnProps, children)
}

export default Object.assign(Panel, {
  Item,
  Button: ItemButton,
})
