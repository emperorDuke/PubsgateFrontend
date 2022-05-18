import { ButtonProps } from './@types'

const Button: React.ComponentType<ButtonProps> = (props) => {
  const classes = ['border-solid border-2 px-3 py-2 uppercase']

  if (props.variant === 'contained') {
    classes.push(
      'bg-amber-600 shadow-xl border-transparent rounded-lg hover:bg-amber-700/80 active:border-amber-500',
    )
  }

  if (props.variant === 'icon') {
    classes.push(
      'border-transparent rounded-3xl hover:bg-amber-600/20 active:border-amber-500',
    )
  }

  if (props.className) {
    classes.push(props.className)
  }

  return (
    <button onClick={props.onClick} className={classes.join(' ')}>
      {props.children}
    </button>
  )
}

Button.defaultProps = {
  variant: 'contained',
}

export default Button
