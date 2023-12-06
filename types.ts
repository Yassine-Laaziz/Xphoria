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
  noBgImages: {
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
  noBgImages: {
    color: string
    colorName: string
    images: string[]
    sizes: string[]
  }[]
  reviews: DatabaseReview[]
}

// User Interfaces
export interface ProductOptions {
  size: string
  color: string
  colorName: string
}

export interface CartItem {
  _id: string
  qty: number
  chosenOptions: ProductOptions
}

export interface CartItemWithData extends CartItem {
  name: string
  slogan?: string
  price: number
  image: string
  noBgImages: {
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

// Database Interfaces
export interface DatabasePurchases {
  userID: string
  purchaseDate: Date
  quantity: number
}

export interface UserPurchase {
  productID: string
  purchaseDate: Date
  quantity: number
}

export interface DatabaseReview {
  userID: string
  username: string
  img?: string
  rating: number
  comment: string
}

export interface UserReview {
  productID: string
  rating: number
  comment: string
}

export interface DatabaseProduct {
  name: string
  slogan?: string
  price: number
  image: Image
  noBgImages: {
    color: string
    colorName: string
    images: Image[]
    sizes: string[]
  }[]
  sanity_id: string
  purchases: DatabasePurchases[]
  reviews: DatabaseReview[]
  _id: string
  createdAt: string
  updatedAt: string
}

// User Class
export class User {
  username: string
  email: string
  _id: string
  purchases: UserPurchase[]
  reviews: UserReview[]
  cart: CartItem[]
  img?: string

  constructor(
    username: string,
    email: string,
    _id: string,
    purchases: UserPurchase[],
    reviews: UserReview[],
    cart: CartItem[],
    img?: string
  ) {
    this.username = username
    this.email = email
    this._id = _id
    this.purchases = purchases
    this.reviews = reviews
    this.cart = cart
    this.img = img
  }
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
