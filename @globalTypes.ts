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

export interface InformationHeading {
  __typename: 'InformationHeading'
  id: number | string
  name: string
}

export interface JournalSubjectArea {
  __typename: 'JournalSubjectArea'
  id: number | string
  name: string
}

export interface journalInformation {
  __typename: 'JournalInformation'
  id: number | string
  content?: string | null
  heading: Partial<InformationHeading>
}

export type PublicationFrequency =
  | 'ANNUALLY'
  | 'BI_ANNUALLY'
  | 'TRI_ANNUALLY'
  | 'QUARTERLY'

export type ServerPublicationFrequency =
  | 'bi-annually'
  | 'tri-annually'
  | 'annually'
  | 'quarterly'

export interface Journal {
  [key: string]:
    | string
    | PublicationFrequency
    | ServerPublicationFrequency
    | File
    | undefined
    | number
    | null
    | Partial<Discipline>
  __typename: 'Journal'
  id: string | number
  name: string
  slug: string
  issn: string
  discipline: Partial<Discipline> | string
  publicationStartDate: string
  publicationFrequency: PublicationFrequency | ServerPublicationFrequency
  isoAbbreviation?: string | null
  logo?: File | string | null
}
