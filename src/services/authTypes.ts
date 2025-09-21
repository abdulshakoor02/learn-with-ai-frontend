export interface UserData {
  _id: string
  name: string
  email: string
  mobile?: string
  createdAt?: string
  updatedAt?: string
}

export interface SessionData {
  user: {
    id: string
    email: string
    name: string
    mobile?: string
  }
  accessToken: string
}

export interface BackendUser {
  _id: string
  name: string
  email: string
  mobile: string
  createdAt: string
  updatedAt: string
}