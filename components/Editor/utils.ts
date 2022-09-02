import { Editor, Transforms, Element as SlateElement } from 'slate'
import { CustomEditor, TextAlignment, MarkFormatType } from './@types'

export const LIST_TYPES = ['numbered-list', 'bulleted-list']
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
export const HOTKEYS: any = {
  b: 'bold',
  i: 'italic',
  u: 'underline',
}

/**
 *
 * @param editor
 * @param format
 */
export const toggleBlock = (editor: CustomEditor, format: string) => {
  const isList = LIST_TYPES.includes(format)
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  )

  // remove <ol> or <ul> wrapper node from inner node
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })

  let newProperties: any

  // set `align` property on the node if the incoming format is a
  //`text alignment feature e.g center, left, justify, right`
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : (format as TextAlignment),
    }
  } else {
    // if that node is active toggle `paragraph` else if its a list item type
    // set node to <li> else set node to whatever
    // WHATEVER has no special code logic
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }

  // change the node type and also set node alignment
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    // wrapping the list-item in a <ol> or <ul>
    const block: any = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

/**
 *
 * @param editor
 * @param format
 */
export const toggleMark = (editor: CustomEditor, format: MarkFormatType) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

/**
 *
 * @param editor
 * @param format
 * @param blockType
 * @returns boolean
 */
export const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType = 'type',
) => {
  const { selection } = editor

  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (node) =>
        !Editor.isEditor(node) &&
        SlateElement.isElement(node) &&
        node[blockType] === format,
    }),
  )

  return !!match
}

/**
 *
 * @param editor
 * @param format
 * @returns boolean
 */
export const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}
