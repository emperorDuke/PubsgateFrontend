import Link from 'next/link'
import React from 'react'
import { ButtonProps } from './@types'
import clsx from 'classNames'

const Button: React.ComponentType<ButtonProps> = (props) => {
  const {
    variant,
    fullWidth,
    leftIcon,
    rightIcon,
    children,
    link,
    ...rest
  } = props

  const classes = [
    'border-solid border-2 px-3 py-2 uppercase flex flex-nowrap items-center',
  ]

  if (variant === 'contained') {
    classes.push(
      'bg-amber-600 shadow-xl border-transparent rounded-lg hover:bg-amber-700/80 active:border-amber-500 text-white',
    )
  }

  if (link) {
    classes.push(
      'border-transparent rounded-lg bg-black text-white hover:bg-slate-500 hover:text-white active:text-amber-500',
    )
  }

  const styleClass = clsx(
    classes,
    {
      'w-full flex justify-center': fullWidth,
      'border-transparent': variant === 'icon',
      'rounded-full hover:bg-amber-600/20': variant === 'icon',
      'active:border-amber-500': variant === 'icon',
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
    <button {...rest} className={styleClass}>
      {childrenWithIcon}
    </button>
  )
}

Button.defaultProps = {
  variant: 'contained',
}

export default Button
