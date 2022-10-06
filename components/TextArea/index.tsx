import { TextAreaProps } from './@types'
import clsx from 'classNames'

const TextArea: React.ComponentType<TextAreaProps> = (props) => {
  const { required, errorMessage, label, dense, id, name, ...rest } = props

  const labelProps = {
    htmlFor: id || label,
  }

  const textareaProps = {
    id: id || label,
    name: name || label,
  }

  const labelStyleClass = clsx(
    'text-header-col capitalize block mb-3 font-semibold',
    {
      "after:content-['*'] after:ml-1 after:text-red-500": required,
    },
  )

  return (
    <div className="w-full">
      <label className={labelStyleClass} {...labelProps}>
        {label && label.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ')}
      </label>
      <textarea
        {...textareaProps}
        {...rest}
        className={clsx(
          'border-solid border rounded-lg py-3 px-2 w-full',
          'active:border-sky-600 placeholder-slate-400',
          'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500',
          'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200',
          { 'border-red-500 focus:ring-pink-500': !!errorMessage },
        )}
      />

      {!dense && (
        <p className="block h-4 mb-3 text-xs capitalize text-red-500 p-1">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default TextArea
