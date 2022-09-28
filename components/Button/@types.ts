import React, { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: boolean
  variant?: 'contained' | 'outlined' | 'icon'
  link?: boolean
  href?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
  depressed?: boolean
}
