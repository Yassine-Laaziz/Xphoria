import { Image } from 'sanity'

// Sanity Interfaces
export interface SanityMeta {
  _createdAt: string
  _rev: string
  _type: 'product'
  _updatedAt: string
  _id: string
}

export interface SanityProduct extends SanityMeta {
  name: string
  slogan?: string
  price: number
  image: Image
  options: {
    color: string
    colorName: string
    images: Image[]
    sizes: string[]
  }[]
}

// Display Product Interface
export interface DisplayProduct extends SanityMeta {
  name: string
  slogan?: string
  price: number
  image: string
  options: {
    color: string
    colorName: string
    images: string[]
    sizes: string[]
  }[]
  reviews: Review[]
}

// User Interfaces
export interface ProductOptions {
  size: string
  color: string
  colorName: string
  mainImage: string
}

export interface CartItem {
  productID: string
  qty: number
  chosenOptions: ProductOptions
}

export interface CartItemWithData extends CartItem {
  name: string
  slogan?: string
  price: number
  image: string
  options: {
    color: string
    colorName: string
    images: string[]
    sizes: string[]
  }[]
}

export interface Social {
  name: string
  url: string
  logo: Image
}

// Database
export interface Purchase {
  ProductID: string
  userID: string
  userImg?: string
  username: string
  purchaseDate: Date
  quantity: number
}

export interface Review {
  productID: string
  userID: string
  userImg?: string
  username: string
  rating: number
  comment: string
}

// User Class
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

export interface DatabaseUser {
  _id: string
  img?: string
  username: string
  email: string
  cart: CartItem[]
}

export interface JWT {
  jti: 'IEsXAR4beVlOfKYxg3fnF'
  iat: 1701878055
  exp: 1703346855
}

export interface userJWT extends JWT {
  username: 'Xphoria'
  email: 'yassinelaaziz0@gmail.com'
  id: '657098851e77ca091f1d7801'
}
