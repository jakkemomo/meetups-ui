export type User = {
    username: string,
    email: string
}

export type AuthResponse = {
    access: string,
    refresh: string
}

export type RegisterResponse = {
  username: string,
  email: string,
}

export type SessionDto = {
  accessToken: string
  user: {
    email: string
    id: number
  }
}

export type RequestLoginBody = {
  username: string
  password: string
}

export type UserDto = {
  id: number
  email: Email
}
