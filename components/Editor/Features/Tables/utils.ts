import { Transforms, Range, Editor, Element as SlateElement } from 'slate'
import { CustomEditor } from '../../@types'

export const createTableNode = (nRow: number, nCol: number) => {
  const rowCells = []

  for (let i = 0; i < nRow; i++) {
    let columnCells: any[] = []

    for (let j = 0; j < nCol; j++) {
      columnCells.push({
        type: 'table-cell',
        children: [{ type: 'paragraph', children: [{ text: ' ' }] }],
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

export const insertTable = (
  editor: CustomEditor,
  nRow: number,
  nCol: number,
) => {
  const { selection } = editor
  const properties: any = createTableNode(nRow, nCol)

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
