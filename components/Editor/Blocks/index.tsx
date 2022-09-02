import React from 'react'
import { RenderElementProps } from 'slate-react'
import { Element as TableElementBlock } from '../Features/Tables/ElementBlock'
import { Element as ListElementBlock } from '../Features/Lists/ElementBlock'
import { Element as HeadingElementBlock } from '../Features/Headings/ElementBlocks'

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props
  const style = { textAlign: element.align }

  switch (element.type) {
    case 'paragraph':
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
    default:
      return (
        <React.Fragment>
          <HeadingElementBlock {...props} />
          <ListElementBlock {...props} />
          <TableElementBlock {...props} />
        </React.Fragment>
      )
  }
}
