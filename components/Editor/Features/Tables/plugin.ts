import {
  Editor,
  Element as SlateElement,
  Path,
  Point,
  Range,
  Transforms,
} from 'slate'
import { CustomEditor } from '../../@types'

export const withTables = (editor: CustomEditor) => {
  const { deleteBackward, deleteForward, insertBreak, normalizeNode } = editor

  editor.deleteBackward = (unit) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Array.from(
        Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'table-cell',
        }),
      )

      if (cell) {
        const [, cellPath] = cell
        const start = Editor.start(editor, cellPath)

        if (Point.equals(selection.anchor, start)) {
          return
        }
      }
    }

    deleteBackward(unit)
  }

  editor.deleteForward = (unit) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Array.from(
        Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'table-cell',
        }),
      )

      if (cell) {
        const [, cellPath] = cell
        const end = Editor.end(editor, cellPath)

        if (Point.equals(selection.anchor, end)) {
          return
        }
      }
    }

    deleteForward(unit)
  }

  editor.insertBreak = () => {
    const { selection } = editor

    if (selection) {
      const [table] = Array.from(
        Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'table',
        }),
      )

      if (table) {
        return
      }
    }

    insertBreak()
  }

  editor.normalizeNode = (entry) => {
    const [node, nodePath] = entry

    if (SlateElement.isElement(node) && node.type === 'table') {
      const pointAfterTable = Editor.after(editor, nodePath)
      const block: any = {
        type: 'paragraph',
        children: [{ text: '' }],
      }

      if (!pointAfterTable) {
        Transforms.insertNodes(editor, block, {
          at: Path.next(nodePath),
          select: true,
        })
        return
      }

      normalizeNode(entry)
    }
  }

  return editor
}
