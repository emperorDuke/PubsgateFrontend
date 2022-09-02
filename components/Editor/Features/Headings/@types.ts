export type HeadingBlockType = 'heading-one' | 'heading-two' | 'block-quote'

export interface HeadingElement {
  [key: string]: HeadingBlockType
  type: HeadingBlockType
}
