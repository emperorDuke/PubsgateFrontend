import { InputHTMLAttributes } from 'react'

export interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  required?: boolean
  errorMessage?: string | null
  dense?: boolean
}
