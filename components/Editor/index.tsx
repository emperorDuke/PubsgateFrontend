import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { withCorrectVoidBehavior, withImages } from './Features/Images/plugin'
import { ImageTab } from './Features/Images/components/actionBtn'
import { EditorProps } from './@types'
import Toolbar from './Toolbar'

const initValue = {
  type: 'paragraph',
  children: [
    {
      text:
        'Since the editor is based on a recursive tree model, similar to an HTML document, you can create complex nested structures, like tables:',
    },
  ],
}

const CustomEditor: React.ComponentType<EditorProps> = (props) => {
  const [initval, setInitVal] = useState<Descendant[]>([])

  useEffect(() => {
    if (props.value) {
      setInitVal([JSON.parse(props.value)])
    }
  }, [props.value])

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  )
  const editor = useMemo(
    () =>
      withCorrectVoidBehavior(
        withImages(withTables(withHistory(withReact(createEditor())))),
      ),
    [],
  )

  const handleChange = (value: {}) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type,
    )

    if (isAstChange) {
      props.onChange(JSON.stringify(value))
    }
  }

  const toolbarProps = {
    size: props.size,
    variant: props.variant,
  }

  return (
    <section className="border border-border-col rounded-lg bg-white">
      {initval && initval.length && (
        <Slate editor={editor} value={initval} onChange={handleChange}>
          <Toolbar {...toolbarProps}>
            <MarkButton format="bold" icon="format-bold" />
            <MarkButton format="italic" icon="format-italic" />
            <MarkButton format="underline" icon="format-underlined" />
            <BlockButton format="heading-one" icon="looks-one" />
            <BlockButton format="heading-two" icon="looks-two" />
            <BlockButton format="block-quote" icon="format-quote-close" />

            <Toolbar.Group name="lists">
              <BlockButton format="numbered-list" icon="format-list-numbered" />
              <BlockButton format="bulleted-list" icon="format-list-bulleted" />
            </Toolbar.Group>

            <Toolbar.Group name="alignments">
              <BlockButton format="left" icon="format-align-left" />
              <BlockButton format="center" icon="format-align-center" />
              <BlockButton format="right" icon="format-align-right" />
              <BlockButton format="justify" icon="format-align-justify" />
            </Toolbar.Group>

            <Toolbar.Group name="objects">
              <TableButton />
              <ImageTab />
            </Toolbar.Group>
          </Toolbar>
          <Editable
            as="article"
            className="p-3"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter text…"
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
      )}
    </section>
  )
}

export default CustomEditor
