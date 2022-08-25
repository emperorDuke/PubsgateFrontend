export interface FormSchema {
  fieldType: 'select' | 'input' | 'file'
  disabled: boolean
  selectOptions?: Array<{ id: number | string; label: string; value: string }>
  required?: boolean
}

export type FieldSchema<P> = {
  [K in keyof P]: Readonly<FormSchema>
}

export interface Editor {
  __typename?: string
  id: string
  affiliation?: string
  specialisation?: string
  user: Partial<User>
}

export interface User {
  __typename?: string
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface Discipline {
  __typename?: string
  id: number | string
  name: string
  slug: string
}

export type PublicationFrequency =
  | 'ANNUALLY'
  | 'BIANNUALLY'
  | 'TRIANUALLY'
  | 'QUARTERLY'

export interface Journal {
  [key: string]: string | PublicationFrequency | File | undefined | number
  __typename?: string
  id?: string | number
  name: string
  issn: string
  discipline: string
  publicationStartDate: string
  publicationFrequency: PublicationFrequency
  isoAbbreviation: string
  logo: File | string
}
