export interface Product {
  name: string
  slogan?: string
  price: number
  image: string
  noBgImages: {
    color: string
    colorName: string
    images: string[]
    sizes: number[]
  }[]
}

export interface ProductOptions {
  size: number
  color: string
  colorName: string
}

export interface CartItem {
  name: string
  qty: number
  chosenOptions: ProductOptions
}
export interface FullCartItem {
  name: string
  price: number
  qty: number
  image: string
  chosenOptions: ProductOptions
  noBgImages: {
    color: string
    colorName: string
    images: string[]
    sizes: number[]
  }[]
}

export interface Purchase {
  user: string
  productName: string
  purchaseDate: Date
  quantity: number
}

export interface Review {
  productName: string
  username: string
  userID: string
  img?: string
  rating: number
  comment: string
}

export interface sortedReviews {
  [key: string]: Review[]
}

export interface social {
  name: string
  url: string
  logo: object
}

export class User {
  username: string
  email: string
  _id: string
  purchases: Purchase[]
  reviews: Review[]
  cart: CartItem[]
  img?: string

  constructor(username: string, email: string, _id: string, purchases: Purchase[], reviews: Review[], cart: CartItem[], img?: string) {
    this.username = username
    this.email = email
    this._id = _id
    this.purchases = purchases
    this.reviews = reviews
    this.cart = cart
    this.img = img
  }
}
