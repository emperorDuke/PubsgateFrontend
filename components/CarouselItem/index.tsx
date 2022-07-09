import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { CarouselItemProps } from './@types'
import clsx from 'classNames'

const CarouselItem: ForwardRefRenderFunction<
  HTMLDivElement,
  CarouselItemProps
> = (props, ref) => {
  const captionEl = (
    <div className="flex absolute bg-black-500 hover:cursor-pointer">
      <p className="text-lg">{props.caption}</p>
    </div>
  )

  const defaultStyle = {
    height: 'inherit',
    width: 'inherit',
    borderRadius: 'inherit',
    cursor: 'auto',
  }

  const handleClick = (event?: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick && event) {
      props.onClick(event)
    }

    if (props.__setIndex && typeof props.__index === 'number') {
      props.__setIndex(props.__index)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(props.className)}
      ref={ref}
      style={{
        ...props.style,
        ...defaultStyle,
      }}
      aria-label={`slide-${props.__index}`}
      role="button"
      tabIndex={0}
    >
      {props.caption && captionEl}
      {React.Children.map(props.children, (child, i) =>
        React.isValidElement<CarouselItemProps>(child)
          ? React.cloneElement(child, {
              style: defaultStyle,
            })
          : child,
      )}
    </div>
  )
}

export default forwardRef(CarouselItem)
