import { Element, Transforms } from 'slate'
import { CustomEditor } from '../../@types'

const imageExtensions = ['jpeg', 'jpg', 'png']

export const insertImage = (editor: CustomEditor, url: string) => {
  const image = { type: 'image', url, children: [{ text: '' }] }
  Transforms.insertNodes(editor, image as Element)
}

export const isImageUrl = (url: string) => {
  if (!url) return false

  const ext = new URL(url).pathname.split('.').pop()
  return ext && imageExtensions.includes(ext)
}
