import React, { useState, useEffect } from 'react'
import { FileInputProps } from './@types'
import clsx from 'classNames'
import Image from 'next/image'

interface UploadedFile {
  src: string
  fileName: string
}

const FileInput: React.FC<FileInputProps> = (props) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)

  useEffect(() => {
    if (props.value && typeof props.value === 'string') {
      setUploadedFile({
        src: props.value,
        fileName: 'remote-logo',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    required,
    errorMessage,
    label,
    dense,
    id,
    name,
    onChange,
    ...rest
  } = props

  const labelProps = {
    htmlFor: id || label,
  }

  const inputProps = {
    id: id || label,
    name: name || label,
    type: 'file',
  }

  const labelStyleClass = clsx(
    'text-header-col capitalize block mb-3 font-semibold',
    {
      "after:content-['*'] after:ml-1 after:text-red-500": required,
    },
  )

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setUploadedFile({
            src: e.target.result,
            fileName: file.name,
          })
        }
      }

      reader.readAsDataURL(file)
    }

    if (onChange) onChange(e)
  }

  return (
    <div className="w-full">
      <label className={labelStyleClass} {...labelProps}>
        {label && label.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ')}
      </label>
      <div className="flex flex-nowrap items-center">
        <input
          {...inputProps}
          {...rest}
          onChange={handleFileUpload}
          className={clsx(
            'border-solid border rounded-lg py-3 w-full cursor-pointer text-sm',
            'placeholder-slate-400 border-transparent disabled:bg-slate-50',
            'disabled:text-slate-500 disabled:border-slate-200',
            { 'border-red-500 focus:ring-pink-500': !!errorMessage },
          )}
        />
        {uploadedFile && (
          <div className="relative h-10 w-14 ml-3">
            <Image
              src={uploadedFile.src}
              alt={uploadedFile.fileName}
              layout="fill"
              className="rounded-lg"
            />
          </div>
        )}
      </div>

      {!dense && (
        <p className="block h-4 mb-3 text-xs capitalize text-red-500 p-1">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default FileInput
