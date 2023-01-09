export type Product = {
  name: string
  slogan?: string
  slug: { _type: string; current: string }
  price: number
  image: object
  noBgImages: { color: string; images: object[] }[]
  sizes: number[]
}

export type ProductOptions = {
  size: number
  color: string
}
