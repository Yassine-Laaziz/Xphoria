export type Product = {
  name: string
  slogan?: string
  slug: { _type: string; current: string }
  price: number
  image: object
  noBgImages: {
    color: string
    colorName: string
    images: object[]
    sizes: number[]
  }[]
}

export type ProductOptions = {
  size: number
  color: string
  colorName: string
}

export type Config = {
  brand: string
  slogan: string
  logo: object
  socials: social[]
  license: string
  footerText: string
  recommended: string
}

export type social = {
  name: string
  url: string
  logo: object
}

export class User {
  username: string
  email: string
  id: string
  img?: string

  constructor(username: string, email: string, id: string, img?: string) {
    this.username = username
    this.email = email
    this.id = id
    this.img = img
  }
}
