export interface Ingredient {
  calories?: number
  carbohydrates?: number
  fat?: number
  image?: string
  image_large: string
  image_mobile?: string
  name: string
  price: number
  proteins?: number
  type?: string
  __v?: number
  _id?: string
  uuid?: string
}

export interface ILocation {
  hash: string,
  pathname: string,
  search: string,
  key?: string
  state:  {
    [key:string]: IBackground
  }
}

export interface IBackground {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: {
    [key:string]: string | undefined
  } | undefined
};

export interface ILogin {
  name?: string,
  email: string,
  password?: string
}

export interface IAuth {
  user: {
    email: string,
    name: string,
    password: string
  },
  getUser: () => void,
  signIn: (form: ILogin) => void,
  signOut: (token: string | null) => void
}

export interface IOrder {
  createdAt: string,
  ingredients: Array<string>,
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string
}

export interface IOnClick {
  onClick: () => void
}