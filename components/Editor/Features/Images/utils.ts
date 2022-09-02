import { Transforms } from 'slate'
import { CustomEditor } from '../../@types'

const imageExtensions = ['jpeg', 'jpg', 'png']

export const insertImage = (editor: CustomEditor, url: string) => {
  const text = { text: '' }
  const image: any = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

export const isImageUrl = (url: string) => {
  if (!url) return false

  const ext = new URL(url).pathname.split('.').pop()
  return ext && imageExtensions.includes(ext)
}
