import React from 'react'
import { SelectProps } from './@types'
import clsx from 'classNames'

const Select: React.ComponentType<SelectProps> = (props) => {
  const { required, errorMessage, label, hideDetails, ...rest } = props

  const labelProps = {
    htmlFor: props.name || label,
  }

  const inputProps = {
    id: props.id || label,
    name: props.name || label,
  }

  const labelStyleClass = clsx(
    'text-header-col capitalize block mb-3 font-semibold',
    {
      "after:content-['*'] after:ml-1 after:text-red-500": props.required,
    },
  )

  return (
    <div>
      <label className={labelStyleClass} {...labelProps}>
        {label && label.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ')}
      </label>
      <select
        {...inputProps}
        {...rest}
        className={clsx(
          'rounded-lg py-3 px-2 w-full capitalize bg-white',
          'active:border-sky-600 placeholder-slate-400',
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
      {!hideDetails && (
        <span className="block h-4 mb-3 text-xs capitalize text-red-500 p-1">
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default Select
