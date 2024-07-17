export type NewUserInputData = {
  name: string
} & LoginInputData

export type LoginInputData = {
  email: string
  password: string
}
