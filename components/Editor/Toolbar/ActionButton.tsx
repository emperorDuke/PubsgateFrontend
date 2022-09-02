import { useSlate } from 'slate-react'
import Button from '../../Button'
import clsx from 'classNames'
import { MarkAndBlockBtn } from './@types'
import { editorActionIcons } from './Icons'
import {
  isBlockActive,
  isMarkActive,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleMark,
} from '../utils'
import { MarkFormatType } from '../@types'

export const BlockButton = ({ format, icon }: MarkAndBlockBtn) => {
  const editor = useSlate()
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  )

  return (
    <Button
      variant="icon"
      className={clsx({
        'text-black-500': isActive,
        'text-gray-400': !isActive,
      })}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {editorActionIcons[icon]}
    </Button>
  )
}

export const MarkButton = ({ format, icon }: MarkAndBlockBtn) => {
  const editor = useSlate()
  const isActive = isMarkActive(editor, format)

  return (
    <Button
      variant="icon"
      className={clsx({
        'text-black-500': isActive,
        'text-gray-400': !isActive,
      })}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format as MarkFormatType)
      }}
    >
      {editorActionIcons[icon]}
    </Button>
  )
}
