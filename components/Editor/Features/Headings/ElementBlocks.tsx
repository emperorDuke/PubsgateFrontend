import React from 'react'
import { RenderElementProps } from 'slate-react'

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props
  const style = { textAlign: element.align }

  const blocks: { [key: string]: JSX.Element } = {
    'block-quote': (
      <blockquote style={style} {...attributes} className="ml-3">
        {children}
      </blockquote>
    ),
    'heading-one': (
      <h1 style={style} {...attributes} className="text-4xl">
        {children}
      </h1>
    ),
    'heading-two': (
      <h2 style={style} {...attributes} className="text-3xl">
        {children}
      </h2>
    ),
  }

  return (
    <React.Fragment>
      {Object.keys(blocks).includes(element.type) && blocks[element.type]}
    </React.Fragment>
  )
}
