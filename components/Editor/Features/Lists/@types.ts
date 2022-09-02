import { Descendant } from 'slate'

export type ListBlockType = 'numbered-list' | 'list-item' | 'bulleted-list'

export type ListElement = {
  [key: string]: ListBlockType
  type: ListBlockType
}
