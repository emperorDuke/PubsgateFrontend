import React from 'react'
import { RenderElementProps } from 'slate-react'
import { TableElementBlock } from './@types'

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props

  const blocks: TableElementBlock = {
    table: (
      <table>
        <tbody {...attributes}>{children}</tbody>
      </table>
    ),
    'table-row': (
      <tr {...attributes} className="border border-border-col border-solid">
        {children}
      </tr>
    ),
    'table-cell': (
      <td {...attributes} className="border border-border-col border-solid p-3">
        {children}
      </td>
    ),
  }

  return (
    <React.Fragment>
      {Object.keys(blocks).includes(element.type) && blocks[element.type]}
    </React.Fragment>
  )
}
