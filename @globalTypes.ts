export interface Editor {
  id: string
  affiliation?: string
  specialisation?: string
  user: Partial<User>
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}
