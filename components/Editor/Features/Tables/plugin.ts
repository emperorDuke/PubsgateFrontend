import {
  Editor,
  Element as SlateElement,
  Node,
  Path,
  Point,
  Range,
  Transforms,
} from 'slate'
import { CustomEditor } from '../../@types'

export const withTables = (editor: CustomEditor) => {
  const { deleteBackward, deleteForward, insertBreak, normalizeNode } = editor

  editor.deleteBackward = (unit) => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return deleteBackward(unit)
    }

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

      if (Point.equals(editor.selection.anchor, start)) {
        return
      }
    }

    const [paragraph] = Array.from(
      Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'paragraph',
      }),
    )

    if (paragraph) {
      const [paragraphNode, paragraphPath] = paragraph

      if (Path.hasPrevious(paragraphPath) && !Node.string(paragraphNode)) {
        const [table] = Array.from(
          Editor.nodes(editor, {
            at: Path.previous(paragraphPath),
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
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak()
    }

    const [cellParagraph] = Array.from(
      Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === 'paragraph',
      }),
    )

    if (cellParagraph) {
      const [, cellParagraphPath] = cellParagraph
      const block = { type: 'paragraph', children: [{ text: '' }] }

      Transforms.insertNodes(editor, block as Node, {
        at: Path.next(cellParagraphPath),
        select: true,
      })

      return
    }

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

    insertBreak()
  }

  editor.normalizeNode = (entry) => {
    const [node, nodePath] = entry

    if (SlateElement.isElement(node) && node.type === 'table') {
      const pointAfterTable = Editor.after(editor, nodePath)
      const block = { type: 'paragraph', children: [{ text: '' }] }

      if (!pointAfterTable && Node.isNode(block)) {
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
