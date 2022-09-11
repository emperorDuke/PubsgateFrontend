import Image from 'next/image'
import React from 'react'
import { RenderElementProps } from 'slate-react'

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props

  const blocks: { [key: string]: JSX.Element } = {
    image: (
      <div className="relative w-full h-44" {...attributes}>
        <Image
          src={element.url as string}
          alt={element.url as string}
          layout="fill"
          className="rounded-t-lg"
        />
        {children}
      </div>
    ),
  }

  return (
    <React.Fragment>
      {Object.keys(blocks).includes(element.type) && blocks[element.type]}
    </React.Fragment>
  )
}
