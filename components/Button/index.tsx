import Link from 'next/link'
import React from 'react'
import { ButtonProps } from './@types'
import clsx from 'classNames'

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props,
  ref,
) => {
  const {
    variant = 'contained',
    fullWidth,
    leftIcon,
    rightIcon,
    children,
    link,
    size = 'medium',
    ...rest
  } = props

  const isContained = variant === 'contained'
  const isIcon = variant === 'icon'
  const isOutlined = variant === 'outlined'
  const isXSmall = size === 'x-small'
  const isSmall = size === 'small'
  const isXLarge = size === 'x-large'
  const isLarge = size === 'large'
  const isMedium = size === 'medium'

  const styleClass = clsx(
    'border-solid border px-3 py-2 uppercase flex flex-nowrap items-center justify-center',
    {
      'h-10 w-10': isXSmall && isIcon,
      'h-11 w-11': isSmall && isIcon,
      'h-12 w-12': isMedium && isIcon,
      'h-14 w-14': isLarge && isIcon,
      'h-16 w-16': isXLarge && isIcon,
      'bg-primary shadow-xl border-transparent': isContained && !link,
      'rounded-lg hover:bg-primary-dark/80': isContained && !link,
      'text-white active:border-primary-light': isContained && !link,
      'border-transparent rounded-lg bg-black text-white': link,
      'hover:bg-slate-500 hover:text-white active:text-primary-light': link,
      'w-full': fullWidth,
      'border-transparent': isIcon,
      'rounded-full hover:bg-primary/20': isIcon,
      'active:border-primary-light': isIcon,
      'border-primary rounded-lg text-primary': isOutlined,
      'hover:bg-primary-light/10': isOutlined,
    },
    props.className,
  )

  const childrenWithIcon = (
    <React.Fragment>
      {leftIcon && <span className="mr-3">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-3">{rightIcon}</span>}
    </React.Fragment>
  )

  return link && props.href ? (
    <Link href={props.href}>
      <a className={styleClass}>{childrenWithIcon}</a>
    </Link>
  ) : (
    <button {...rest} className={styleClass} ref={ref}>
      {childrenWithIcon}
    </button>
  )
}

export default React.forwardRef(Button)
