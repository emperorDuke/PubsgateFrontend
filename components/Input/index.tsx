import { InputProps } from './@types'
import clsx from 'classNames'

const Input: React.ComponentType<InputProps> = (props) => {
  const labelProps = {
    htmlFor: props.name || props.label,
  }

  const inputProps = {
    name: props.name || props.label,
  }

  const labelStyleClass = clsx({
    "after:content-['*'] after:ml-1 after:text-red-500": props.required,
    'text-slate-600 capitalize block mb-3': true,
  })

  return (
    <div>
      <label className={labelStyleClass} {...labelProps}>
        {props.label}
      </label>
      <input
        {...inputProps}
        {...props}
        className="border-solid border-2 rounded-lg py-3 px-2 w-full active:border-amber-600 shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600-
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      />
      <span className="block h-4 mb-2 text-sm"></span>
    </div>
  )
}

export default Input
