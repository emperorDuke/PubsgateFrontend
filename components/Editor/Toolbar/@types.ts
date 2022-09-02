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
