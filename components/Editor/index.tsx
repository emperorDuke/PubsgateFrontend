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
import { BlockButton, MarkButton } from './ActionButton'
import { Element } from './CustomBlockElement'
import { Leaf } from './CustomLeafElement'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
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
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={initialValue}>
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
