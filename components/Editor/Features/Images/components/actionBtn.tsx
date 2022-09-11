import React from 'react'
import { useSlate } from 'slate-react'
import Button from '../../../../Button'
import { insertImage } from '../utils'
import { editorActionIcons } from '../../../Toolbar/Icons'
import { Dialog, RadioGroup } from '@headlessui/react'
import Input from '../../../../Input'
import clsx from 'classNames'
import ToolbarContext from '../../../Toolbar/context'

export const ImageTab = () => {
  const editor = useSlate()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const toolbarCtx = React.useContext(ToolbarContext)

  const isActive = false

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      insertImage(editor, URL.createObjectURL(files[0]))
      e.target.value = ''
    }
  }

  const handleDialogOpen = () => {
    setIsOpen(true)
  }

  const handleDialogClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleDialogOpen}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-1 rounded">
          <Dialog.Panel className="mx-auto bg-white h-full w-full p-3">
            <div>
              <Input label="Image Url" />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <Button
        variant="icon"
        onClick={handleClick}
        size={toolbarCtx.size}
        className={clsx({
          'text-black-500': isActive,
          'text-gray-400': !isActive,
        })}
      >
        {editorActionIcons.image}
      </Button>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  )
}
