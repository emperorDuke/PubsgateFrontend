import React from 'react'
import { SelectProps } from './@types'
import clsx from 'classNames'

const Select: React.ComponentType<SelectProps> = (props) => {
  const { required, errorMessage, label, ...rest } = props

  const labelProps = {
    htmlFor: props.name || label,
  }

  const inputProps = {
    name: props.name || label,
  }

  const labelStyleClass = clsx('text-slate-600 capitalize block mb-3', {
    "after:content-['*'] after:ml-1 after:text-red-500": props.required,
  })

  return (
    <div>
      <label className={labelStyleClass} {...labelProps}>
        {props.label}
      </label>
      <select
        {...inputProps}
        {...rest}
        className={clsx(
          'border-solid border-2 rounded-lg py-3 px-2 w-full capitalize bg-transparent',
          'active:border-sky-600 shadow-sm placeholder-slate-400',
          'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500',
          'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200',
          { 'border-red-500 focus:ring-pink-500': !!errorMessage },
          props.className,
        )}
      >
        {props.items &&
          props.items.map((item) => (
            <option value={item.value} key={item.id}>
              {item.label}
            </option>
          ))}
      </select>

      <span className="block h-4 mb-3 text-xs capitalize text-red-500 p-1">
        {errorMessage}
      </span>
    </div>
  )
}

export default Select
