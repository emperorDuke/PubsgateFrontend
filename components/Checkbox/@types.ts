import React, { HTMLAttributes } from 'react'
import { ButtonProps } from '../Button/@types'

export interface CheckboxProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  required?: boolean
  errorMessage?: string | null
  dense?: boolean
  onChange?: (event?: React.FormEvent<HTMLDivElement>) => void
  size?: ButtonProps['size']
  disabled?: boolean
}
