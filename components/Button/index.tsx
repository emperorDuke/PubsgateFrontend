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

  const styleClass = clsx(
    'border-solid border px-3 py-2 uppercase flex flex-nowrap items-center justify-center',
    {
      'h-10 w-10': size === 'x-small' && variant === 'icon',
      'h-11 w-11': size === 'small' && variant === 'icon',
      'h-12 w-12': size === 'medium' && variant === 'icon',
      'h-14 w-14': size === 'large' && variant === 'icon',
      'h-16 w-16': size === 'x-large' && variant === 'icon',
      'bg-primary shadow-xl border-transparent': variant === 'contained',
      'rounded-lg hover:bg-primary-dark/80': variant === 'contained',
      'text-white active:border-primary-light': variant === 'contained',
      'border-transparent rounded-lg bg-black text-white': link,
      'hover:bg-slate-500 hover:text-white active:text-primary-light': link,
      'w-full': fullWidth,
      'border-transparent': variant === 'icon',
      'rounded-full hover:bg-primary/20': variant === 'icon',
      'active:border-primary-light': variant === 'icon',
      'border-primary rounded-lg text-primary': variant === 'outlined',
      'hover:bg-primary-light/10': variant === 'outlined',
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
