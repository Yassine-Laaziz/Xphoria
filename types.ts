export type Product = {
  name: string
  slug: { _type: string; current: string }
  price: number
  images: object[]
}