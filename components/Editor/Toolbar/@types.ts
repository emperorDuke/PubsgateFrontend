import { Element } from 'slate'
import { MarkFormatType, TextAlignment } from '../@types'

export interface BlockBtn {
  format: Element['type'] | TextAlignment
  icon: string
}

export interface MarkBtn {
  format: MarkFormatType
  icon: string
}

export interface ToolbarCtxProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'minimal' | 'normal' | 'loaded'
}

export interface ToolbarProps extends ToolbarCtxProps {
  children?: React.ReactNode
  className?: string
}

export interface ToolbarGroupProps {
  children?: React.ReactNode
  name: 'alignments' | 'objects' | 'markers' | 'headers' | 'lists'
}
