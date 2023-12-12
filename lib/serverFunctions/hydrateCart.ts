'use server'

import { CartItem, CartItemWithData, SanityProduct } from '../../types'
import { fetchData, urlForImage } from '../sanity'

export default async function hydrateCart(cart: CartItem[]): Promise<CartItemWithData[]> {
  const allProducts: SanityProduct[] = await fetchData('*[_type == "product"]')
  if (!allProducts) return []

  const cartWithData: CartItemWithData[] = []
  for (const item in cart) {
    let cartItem: CartItem = cart[item]

    const product = allProducts.find(product => product._id === cartItem.productID)
    if (!product) continue

    const { name, price, slogan } = product

    const image = urlForImage(product.image).url()

    const options = product.options.map(noBgImg => ({
      ...noBgImg,
      images: noBgImg.images.map(img => urlForImage(img).url()),
    }))

    cartWithData.push({ ...cartItem, name, image, options, price, slogan })
  }

  return cartWithData
}
