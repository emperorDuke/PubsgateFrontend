import { InputProps } from './@types'
import clsx from 'classNames'

const Input: React.ComponentType<InputProps> = (props) => {
  const { required, ...rest } = props

  const labelProps = {
    htmlFor: props.name || props.label,
  }

  const inputProps = {
    name: props.name || props.label,
  }

  const labelStyleClass = clsx({
    "after:content-['*'] after:ml-1 after:text-red-500": required,
    'text-slate-600 capitalize block mb-3 font-semibold': true,
    'border-red-500 focus:ring-pink-500': !!props.errorMessage,
  })

  return (
    <div>
      <label className={labelStyleClass} {...labelProps}>
        {props.label && props.label.split('_').join(' ')}
      </label>
      <input
        {...inputProps}
        {...rest}
        className="border-solid border-2 rounded-lg py-3 px-2 w-full active:border-sky-600 shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200"
      />
      <span className="block h-4 mb-3 text-xs capitalize text-red-500 p-1">
        {props.errorMessage}
      </span>
    </div>
  )
}

export default Input
