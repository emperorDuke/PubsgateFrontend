import React, { useContext, useMemo } from 'react'
import { ToolbarCtxProps, ToolbarGroupProps, ToolbarProps } from './@types'
import ToolbarContext from './context'
import clsx from 'classNames'

const Toolbar: React.FC<ToolbarProps> = ({
  size = 'medium',
  children,
  className,
  variant = 'normal',
}) => {
  const globarProps: ToolbarCtxProps = useMemo(() => ({ size, variant }), [
    size,
    variant,
  ])

  return (
    <ToolbarContext.Provider value={globarProps}>
      <div className={clsx('py-2 flex flex-wrap w-full px-2', className)}>
        {children}
      </div>
    </ToolbarContext.Provider>
  )
}

const Group: React.FC<ToolbarGroupProps> = (props) => {
  const toolbarCtx = useContext(ToolbarContext)
  const show = props.name !== 'alignments' && toolbarCtx.variant === 'minimal'

  return (
    <>
      {show && (
        <div className="flex flex-row flex-wrap items-start justify-start">
          {props.children}
        </div>
      )}
    </>
  )
}

export default Object.assign(Toolbar, { Group })
