// interfaces/IUser.ts

export interface User {
  _id?: string // Optional because it's not present when registering
  username: string
  email: string
  token?: string // Optional for when the user logs in and receives a token
}
