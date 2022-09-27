type UserType = 'editor' | 'reviewer'

export interface UserTogglerCallbackProps {
  userType: UserType
}

export interface UserCategory {
  id: number
  name: string
  value: UserType
}

export interface UserTogglerProps {
  children?: (args: UserTogglerCallbackProps) => React.ReactNode
  headings?: React.ReactNode
}
