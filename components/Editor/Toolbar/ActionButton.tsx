import { useSlate } from 'slate-react'
import Button from '../../Button'
import clsx from 'classNames'
import { BlockBtn, MarkBtn } from './@types'
import { editorActionIcons } from './Icons'
import {
  isBlockActive,
  isMarkActive,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleMark,
} from '../utils'
import { MarkFormatType } from '../@types'
import { useContext } from 'react'
import ToolbarContext from './context'

export const BlockButton = ({ format, icon }: BlockBtn) => {
  const editor = useSlate()
  const toolbarCtx = useContext(ToolbarContext)

  const isAlignment = TEXT_ALIGN_TYPES.includes(format)
  const isActive = isBlockActive(editor, format, isAlignment ? 'align' : 'type')

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleBlock(editor, format)
  }

  return (
    <Button
      variant="icon"
      size={toolbarCtx.size}
      className={clsx({
        'text-black-500': isActive,
        'text-gray-400': !isActive,
      })}
      onClick={handleClick}
    >
      {editorActionIcons[icon]}
    </Button>
  )
}

export const MarkButton = ({ format, icon }: MarkBtn) => {
  const editor = useSlate()
  const toolbarCtx = useContext(ToolbarContext)

  const isActive = isMarkActive(editor, format)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleMark(editor, format as MarkFormatType)
  }

  return (
    <Button
      variant="icon"
      size={toolbarCtx.size}
      className={clsx({
        'text-black-500': isActive,
        'text-gray-400': !isActive,
      })}
      onClick={handleClick}
    >
      {editorActionIcons[icon]}
    </Button>
  )
}
