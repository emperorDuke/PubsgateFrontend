import { ButtonProps } from './@types'

const Button: React.ComponentType<ButtonProps> = (props) => {
  const classes = ['border-solid border-2 p-2']

  if (props.icon) {
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

export default Button
