export interface Product {
  name: string
  slogan?: string
  price: number
  image: object
  noBgImages: {
    color: string
    colorName: string
    images: object[]
    sizes: number[]
  }[]
}

export interface ProductOptions {
  size: number
  color: string
  colorName: string
}

export class CartItem {
  product: string
  qty: number
  chosenOptions: ProductOptions

  constructor(product: string, qty: number, chosenOptions: ProductOptions) {
    this.product = product
    this.qty = qty
    this.chosenOptions = chosenOptions
  }
}

export interface Purchase {
  user: string
  product: string
  purchaseDate: Date
  quantity: number
}

export interface Review {
  product: string
  username: string
  userID: string
  img: string
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
  id: string
  purchases: Purchase[]
  reviews: Review[]
  cart: CartItem[]
  img?: string

  constructor(username: string, email: string, id: string, purchases: Purchase[], reviews: Review[], cart: CartItem[], img?: string) {
    this.username = username
    this.email = email
    this.id = id
    this.purchases = purchases
    this.reviews = reviews
    this.cart = cart
    this.img = img
  }
}
