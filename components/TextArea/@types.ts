import { TextareaHTMLAttributes } from 'react'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  required?: boolean
  errorMessage?: string | null
  dense?: boolean
}
