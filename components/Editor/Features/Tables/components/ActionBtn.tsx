import { useSlate } from 'slate-react'
import clsx from 'classNames'
import { editorActionIcons } from '../../../Toolbar/Icons'
import Button from '../../../../Button'
import { hasTable, insertTable } from '../utils'

export const TableButton = () => {
  const editor = useSlate()
  const isActive = hasTable(editor)

  return (
    <Button
      variant="icon"
      disabled={isActive}
      className={clsx({
        'text-black-500': isActive,
        'text-gray-400': !isActive,
      })}
      onMouseDown={(event) => {
        event.preventDefault()
        insertTable(editor)
      }}
    >
      {editorActionIcons['table-large']}
    </Button>
  )
}
