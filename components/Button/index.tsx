import { ButtonProps } from './@types'

const Button: React.ComponentType<ButtonProps> = (props) => {
  return (
    <button className="border-orange-500 text-orange-500">
      {props.children}
    </button>
  )
}

export default Button
