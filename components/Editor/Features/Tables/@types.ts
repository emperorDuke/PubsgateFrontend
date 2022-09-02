export type TableBlockType = 'table-cell' | 'table' | 'table-row'

export interface TableElementBlock {
  [key: string]: JSX.Element
  table: JSX.Element
  'table-cell': JSX.Element
  'table-row': JSX.Element
}

export type TableElement = {
  type: TableBlockType
}
