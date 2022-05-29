import React from 'react'
import { SelectProps } from './@types'
import clsx from 'classNames'

const Select: React.ComponentType<SelectProps> = (props) => {
  const labelStyleClass = clsx({
    "after:content-['*'] after:ml-1 after:text-red-500": props.required,
    'text-slate-600 capitalize block mb-3': true,
  })

  return (
    <div>
      <label className={labelStyleClass}>{props.label}</label>
      <select></select>
    </div>
  )
}

export default Select
