import {
  Editor,
  Node,
  Path,
  Range,
  Transforms,
  Element as SlateElement,
} from 'slate'
import { CustomEditor } from '../../@types'
import { insertImage, isImageUrl } from './utils'

export const withImages = (editor: CustomEditor) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url as string)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const withCorrectVoidBehavior = (editor: CustomEditor) => {
  const { deleteBackward, insertBreak } = editor

  // if current selection is void node, insert a default node below
  editor.insertBreak = () => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return insertBreak()
    }

    const selectedNodePath = Path.parent(editor.selection.anchor.path)
    const selectedNode = Node.get(editor, selectedNodePath)

    if (Editor.isVoid(editor, selectedNode)) {
      const block = { type: 'paragraph', children: [{ text: '' }] }
      Node.isNode(block) && Editor.insertNode(editor, block)

      return
    }

    insertBreak()
  }

  // if prev node is a void node, remove the current node and select the void node
  editor.deleteBackward = (unit) => {
    if (!editor.selection || !Range.isCollapsed(editor.selection)) {
      return deleteBackward(unit)
    }

    const textPath = editor.selection.anchor.path
    const textNode = Node.get(editor, textPath)
    const paragraphPath = Path.parent(textPath)

    if (!Node.string(textNode) && Path.hasPrevious(paragraphPath)) {
      const prevNodePath = Path.previous(paragraphPath)
      const prevNode = Node.get(editor, prevNodePath)

      if (Editor.isVoid(editor, prevNode)) {
        Transforms.removeNodes(editor)

        return
      }
    }

    deleteBackward(unit)
  }

  return editor
}
