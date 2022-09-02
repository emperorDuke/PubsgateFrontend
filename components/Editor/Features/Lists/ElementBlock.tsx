import React from 'react'
import { RenderElementProps } from 'slate-react'

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props
  const style = { textAlign: element.align }

  const blocks: { [key: string]: JSX.Element } = {
    'list-item': (
      <li style={style} {...attributes} className="list-item ml-3">
        {children}
      </li>
    ),
    'numbered-list': (
      <ol style={style} {...attributes} className="list-decimal">
        {children}
      </ol>
    ),
    'bulleted-list': (
      <ul style={style} {...attributes} className="list-disc">
        {children}
      </ul>
    ),
  }

  return (
    <React.Fragment>
      {Object.keys(blocks).includes(element.type) && blocks[element.type]}
    </React.Fragment>
  )
}
