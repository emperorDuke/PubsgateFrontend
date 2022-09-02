import React, { useCallback, useMemo } from 'react'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'
import { HOTKEYS, toggleMark } from './utils'
import { BlockButton, MarkButton } from './Toolbar/ActionButton'
import { Element } from './Blocks'
import { Leaf } from './Leafs'
import { withTables } from './Features/Tables/plugin'
import { TableButton } from './Features/Tables/components/ActionBtn'

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "This table is just a basic example of rendering a table, and it doesn't have fancy functionality. But you could augment it to add support for navigating with arrow keys, displaying table headers, adding column and rows, or even formulas if you wanted to get really crazy!",
      },
    ],
  },
]

const CustomEditor: React.ComponentType = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  )
  const editor = useMemo(
    () => withTables(withHistory(withReact(createEditor()))),
    [],
  )

  return (
    <Slate
      editor={editor}
      value={initialValue as Descendant[]}
      // onChange={(value) => {
      //   const isAstChange = editor.operations.some(
      //     (op) => 'set_selection' !== op.type,
      //   )

      //   if (isAstChange) {
      //     console.log(JSON.stringify(value))
      //   }
      // }}
    >
      <div className="py-3 flex">
        <MarkButton format="bold" icon="format-bold" />
        <MarkButton format="italic" icon="format-italic" />
        <MarkButton format="underline" icon="format-underlined" />
        <BlockButton format="heading-one" icon="looks-one" />
        <BlockButton format="heading-two" icon="looks-two" />
        <BlockButton format="block-quote" icon="format-quote-close" />
        <BlockButton format="numbered-list" icon="format-list-numbered" />
        <BlockButton format="bulleted-list" icon="format-list-bulleted" />
        <BlockButton format="left" icon="format-align-left" />
        <BlockButton format="center" icon="format-align-center" />
        <BlockButton format="right" icon="format-align-right" />
        <BlockButton format="justify" icon="format-align-justify" />
        <TableButton />
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (event.ctrlKey && event.key === hotkey) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      ></Editable>
    </Slate>
  )
}

export default CustomEditor
