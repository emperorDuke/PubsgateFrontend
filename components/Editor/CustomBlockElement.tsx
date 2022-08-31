import { RenderElementProps } from 'slate-react'

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const style = { textAlign: element.align }

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes} className="ml-3">
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes} className="list-disc">
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes} className="text-4xl">
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes} className="text-3xl">
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes} className="list-item ml-3">
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes} className="list-decimal">
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}
