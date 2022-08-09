import { InputProps } from './@types'
import clsx from 'classNames'

const Input: React.ComponentType<InputProps> = (props) => {
  const { required, errorMessage, label, ...rest } = props

  const labelProps = {
    htmlFor: props.name || label,
  }

  const inputProps = {
    id: props.id || label,
    name: props.name || label,
  }

  const labelStyleClass = clsx(
    'text-slate-600 capitalize block mb-3 font-semibold sr-only',
    {
      "after:content-['*'] after:ml-1 after:text-red-500": required,
    },
  )

  return (
    <div>
      <label className={labelStyleClass} {...labelProps}>
        {label && label.split('_').join(' ')}
      </label>
      <input
        {...inputProps}
        {...rest}
        className={clsx(
          'border-solid border rounded-lg py-3 px-2 w-full border-border-col',
          'active:border-sky-600 shadow-sm placeholder-slate-400',
          'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500',
          'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200',
          { 'border-red-500 focus:ring-pink-500': !!errorMessage },
        )}
      />
      <span className="block h-4 mb-3 text-xs capitalize text-red-500 p-1">
        {errorMessage}
      </span>
    </div>
  )
}

export default Input
