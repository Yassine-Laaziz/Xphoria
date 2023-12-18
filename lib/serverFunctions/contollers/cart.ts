'use server'

import { CartItem, CartItemWithData, SanityProduct } from '../../../types'
import { fetchData, urlForImage } from '../../sanity'

export async function hydrateCart(cart: CartItem[]): Promise<CartItemWithData[]> {
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

export async function cleanCart(cart: CartItem[]): Promise<CartItem[] | undefined> {
  const allProducts: SanityProduct[] = await fetchData('*[_type == "product"]')
  if (!allProducts) return

  const cleanedCart: CartItem[] = []

  for (const cartItem of cart) {
    const { productID, qty, chosenOptions } = cartItem

    // Check if this is an actual product
    const matchingProduct = allProducts.find(p => p._id === productID)
    if (!matchingProduct) continue

    // check if these are valid chosen options
    const matchingOptions = matchingProduct.options.find(
      opt => opt.color === chosenOptions.color && opt.sizes.find(size => size === chosenOptions.size)
    )
    if (!matchingOptions) continue

    // Check if a similar product with similiar options already exists in the sanitized cart
    const existingItem = cleanedCart.find(
      item =>
        item.productID === productID && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )

    if (existingItem) existingItem.qty += qty
    else cleanedCart.push({ productID, qty, chosenOptions })
  }

  return cleanedCart
}
