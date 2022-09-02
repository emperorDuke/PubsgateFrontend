import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'
import { HeadingElement } from './Features/Headings/@types'
import { ImageElementType } from './Features/Images/@types'
import { ListElement } from './Features/Lists/@types'
import { TableElement } from './Features/Tables/@types'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor
export type TextAlignment = 'left' | 'center' | 'justify' | 'right'
export type MarkFormatType = 'bold' | 'italic' | 'underline' | 'code'
export type ParagraphBlockType = 'paragraph'
export type CustomElement<P> = P & DefaultNodeProperties

export interface MarkAndBlockBtn {
  format: string
  icon: string
}

type DefaultNodeProperties = {
  [key: string]: CustomText[] | TextAlignment
  align: TextAlignment
  children: CustomText[]
}

interface DefaultElement {
  [key: string]: ParagraphBlockType
  type: ParagraphBlockType
}

type CustomText = {
  [key: string]: string | boolean | undefined
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element:
      | CustomElement<ImageElementType>
      | CustomElement<HeadingElement>
      | CustomElement<TableElement>
      | CustomElement<ListElement>
      | CustomElement<DefaultElement>
    Text: CustomText
  }
}
