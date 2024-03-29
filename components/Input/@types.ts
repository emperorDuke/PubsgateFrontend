import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  required?: boolean
  errorMessage?: string | null
  dense?: boolean
  leftSlot?: JSX.Element
  rightSlot?: JSX.Element
}
