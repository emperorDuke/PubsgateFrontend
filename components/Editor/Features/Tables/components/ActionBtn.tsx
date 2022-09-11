import { useSlate } from 'slate-react'
import clsx from 'classNames'
import { editorActionIcons } from '../../../Toolbar/Icons'
import Button from '../../../../Button'
import { hasTable, insertTable } from '../utils'
import { Menu } from '@headlessui/react'
import Input from '../../../../Input'
import React, { useContext } from 'react'
import ToolbarContext from '../../../Toolbar/context'

export const TableButton = () => {
  const editor = useSlate()
  const toolbarCtx = useContext(ToolbarContext)
  const [cellNumber, setCellNumber] = React.useState({
    row: 0,
    column: 0,
  })

  const isActive = hasTable(editor)

  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    insertTable(editor, cellNumber.row, cellNumber.column)
  }

  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCellNumber({
      ...cellNumber,
      column: Number(e.target.value),
    })
  }

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCellNumber({
      ...cellNumber,
      row: Number(e.target.value),
    })
  }

  return (
    <Menu as="div">
      <Menu.Button
        as={Button}
        variant="icon"
        size={toolbarCtx.size}
        disabled={isActive}
        className={clsx({
          'text-black-500': isActive,
          'text-gray-400': !isActive,
        })}
      >
        {editorActionIcons['table-large']}
      </Menu.Button>
      <Menu.Items>
        <Menu.Item
          as="div"
          disabled
          className="absolute z-50 bg-white flex flex-col rounded-lg border shadow-2xl p-3"
        >
          <Input
            label="Number of rows"
            className="w-5 h-5"
            value={cellNumber.row}
            onChange={handleRowChange}
          />
          <Input
            label="Number of columns"
            className="w-5 h-5"
            value={cellNumber.column}
            onChange={handleColChange}
          />
          <Button onClick={handleApply} fullWidth>
            Apply
          </Button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
