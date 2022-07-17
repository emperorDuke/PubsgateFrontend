import { SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  required?: boolean
  items?: Array<{ label: string; value: string; id: string | number }>
  errorMessage?: string | null
}
