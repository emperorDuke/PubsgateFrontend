import {
  Transforms,
  Range,
  Descendant,
  Editor,
  Element as SlateElement,
} from 'slate'
import { CustomEditor } from '../../@types'

const rows = 5
const columns = 4

export const createTableNode = () => {
  const rowCells = []

  for (let i = 0; i < rows; i++) {
    let columnCells: any[] = []

    for (let j = 0; j < columns; j++) {
      columnCells.push({
        type: 'table-cell',
        children: [{ text: '' }],
      })
    }

    rowCells.push({
      type: 'table-row',
      children: columnCells,
    })
  }

  return {
    type: 'table',
    children: rowCells,
  }
}

export const insertTable = (editor: CustomEditor) => {
  const { selection } = editor
  const properties: any = createTableNode()

  if (selection && Range.isCollapsed(selection)) {
    Transforms.insertNodes(editor, properties)
  }
}

export const hasTable = (editor: CustomEditor) => {
  const { selection } = editor

  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (node) =>
        !Editor.isEditor(node) &&
        SlateElement.isElement(node) &&
        node.type === 'table',
    }),
  )

  return !!match
}
