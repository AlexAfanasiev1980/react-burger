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
}

export interface IngredientConstructor {
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

export interface Card {
  calories?: number
  carbohydrates?: number
  fat?: number
  image?: string
  image_large?: string
  image_mobile?: string
  name?: string
  price?: number
  proteins?: number
  type?: string
  __v?: number
  _id?: string
}