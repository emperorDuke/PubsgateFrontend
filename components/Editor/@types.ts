import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor
export type TextAlignment = 'left' | 'center' | 'justify' | 'right'
export type MarkFormatType = 'bold' | 'italic' | 'underline' | 'code'
export type BlockFormatType =
  | 'paragraph'
  | 'heading-one'
  | 'heading-two'
  | 'block-quote'
  | 'numbered-list'
  | 'list-item'
  | 'bulleted-list'

export type ElementType = BlockFormatType | TextAlignment | MarkFormatType

type CustomElement = {
  [key: string]: TextAlignment | CustomText[] | ElementType | undefined
  type: ElementType
  children: CustomText[]
  align?: TextAlignment
}

type CustomText = {
  [key: string]: string | boolean | undefined
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export interface MarkAndBlockBtn {
  format: ElementType
  icon: string
}

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
