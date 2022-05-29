import Link from 'next/link'
import React from 'react'
import { ButtonProps } from './@types'
import clsx from 'classNames'

const Button: React.ComponentType<ButtonProps> = (props) => {
  const classes = [
    'border-solid border-2 px-3 py-2 uppercase flex flex-nowrap items-center',
  ]

  if (props.variant === 'contained') {
    classes.push(
      'bg-amber-600 shadow-xl border-transparent rounded-lg hover:bg-amber-700/80 active:border-amber-500 text-white',
    )
  }

  if (props.link) {
    classes.push(
      'border-transparent rounded-lg bg-black text-white hover:bg-slate-500 hover:text-white active:text-amber-500',
    )
  }

  const styleClass = clsx(
    classes,
    {
      'w-full flex justify-center': props.fullWidth,
      'border-transparent': props.variant === 'icon',
      'rounded-full hover:bg-amber-600/20': props.variant === 'icon',
      'active:border-amber-500': props.variant === 'icon',
    },
    props.className,
  )

  const children = (
    <React.Fragment>
      {props.leftIcon && <span className="mr-3">{props.leftIcon}</span>}
      {props.children}
      {props.rightIcon && <span className="ml-3">{props.rightIcon}</span>}
    </React.Fragment>
  )

  return props.link && props.href ? (
    <Link href={props.href}>
      <a className={styleClass}>{children}</a>
    </Link>
  ) : (
    <button onClick={props.onClick} className={styleClass}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: 'contained',
}

export default Button
