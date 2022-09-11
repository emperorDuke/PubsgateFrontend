import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'
import { HeadingElement } from './Features/Headings/@types'
import { ImageElement } from './Features/Images/@types'
import { ListElement } from './Features/Lists/@types'
import { TableElement } from './Features/Tables/@types'
import { ToolbarProps } from './Toolbar/@types'

export interface EditorProps extends ToolbarProps {
  onChange: (value: {}) => void
  value: any
}

export interface DefaultNodeProperties {
  [key: string]: CustomText[] | TextAlignment
  align: TextAlignment
  children: CustomText[]
}

export interface DefaultElement {
  [key: string]: ParagraphBlockType
  type: ParagraphBlockType
}

export interface CustomText {
  [key: string]: string | boolean | undefined
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor
export type TextAlignment = 'left' | 'center' | 'justify' | 'right'
export type MarkFormatType = 'bold' | 'italic' | 'underline' | 'code'
export type ParagraphBlockType = 'paragraph'
export type CustomElement<P> = P & DefaultNodeProperties

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element:
      | CustomElement<ImageElement>
      | CustomElement<HeadingElement>
      | CustomElement<TableElement>
      | CustomElement<ListElement>
      | CustomElement<DefaultElement>
    Text: CustomText
  }
}
