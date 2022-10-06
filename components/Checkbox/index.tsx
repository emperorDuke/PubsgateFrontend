import React from 'react'
import clsx from 'classNames'
import { CheckboxProps } from './@types'

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {
    required,
    errorMessage,
    label,
    dense,
    onChange,
    className,
    id,
    size = 'medium',
    disabled,
    ...rest
  } = props

  const isXSmall = size === 'x-small'
  const isSmall = size === 'small'
  const isXLarge = size === 'x-large'
  const isLarge = size === 'large'
  const isMedium = size === 'medium'

  const [isChecked, setIsChecked] = React.useState(false)
  const labelId = React.useId()

  const labelStyleClass = clsx('text-header-col capitalize font-semibold', {
    "after:content-['*'] after:ml-1 after:text-red-500": required,
  })

  const checkboxClasses = clsx(
    'border-solid border border-transparent',
    'rounded-full uppercase flex items-center justify-center',
    {
      'hover:bg-primary/20 active:bg-primary-light/40': !disabled,
      'focus:bg-primary/20 hover:cursor-pointer': !disabled,
      'h-10 w-10': isXSmall,
      'h-11 w-11': isSmall,
      'h-12 w-12': isMedium,
      'h-14 w-14': isLarge,
      'h-16 w-16': isXLarge,
    },
  )

  const handleCheck = () => {
    setIsChecked((checked) => !checked)

    if (onChange) {
      onChange()
    }
  }

  const getBooleanish = (param?: boolean) => {
    return param ? 'true' : 'false'
  }

  return (
    <div className="w-auto">
      <div className="flex flex-nowrap items-center">
        <div
          {...rest}
          role="checkbox"
          id={id || `label${labelId}`}
          className={checkboxClasses}
          tabIndex={0}
          onClick={handleCheck}
          aria-checked={getBooleanish(isChecked)}
          aria-disabled={getBooleanish(disabled)}
          aria-required={getBooleanish(required)}
        >
          <span
            aria-hidden="true"
            className={clsx(
              'rounded text-white h-5 w-5',
              {
                'bg-gray-100 border-gray-300': disabled,
                'border-gray-400': !disabled,
                'bg-primary border': isChecked,
                'bg-white border-2': !isChecked,
              },
              className,
            )}
          >
            {isChecked && (
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"
                />
              </svg>
            )}
          </span>
        </div>
        {label && (
          <label className={labelStyleClass} htmlFor={id || `label${labelId}`}>
            {label.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ')}
          </label>
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

export default Checkbox
