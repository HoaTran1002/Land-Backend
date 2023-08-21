//model

export interface IAccount {
  _id: string
  name: string
  password: string
  email: string
  age: number
  address: string
  avatar: string
  currentJob: string
  income: number
  role: string
}
export interface IRole {
  name: string
}

//response object
export interface IResonseObject {
  status?: number
  message: string
  data?: unknown
}
export interface IResponseErrorObject {
  message: string
  status?: number
}
