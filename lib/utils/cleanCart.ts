import { CartItem, ProductOptions, SanityProduct } from '../../types'
import { fetchData } from '../sanity'

export default async function cleanCart(cart: CartItem[]): Promise<CartItem[] | undefined> {
  // this function takes in a cart and validates the products and removes anything other than
  // name, qty, chosenOptions

  const allProducts: SanityProduct[] = await fetchData('*[_type == "product"]')
  if (!allProducts) return

  const cleanedCart: CartItem[] = []

  for (const cartItem of cart) {
    const { _id, qty, chosenOptions } = cartItem

    // Check if this is an actual product
    const matchingProduct = allProducts.find(p => p._id === _id)
    if (!matchingProduct) continue

    // check if these are valid chosen options
    const matchingOptions = matchingProduct.noBgImages.find(
      opt => opt.color === chosenOptions.color && opt.sizes.find(size => size === chosenOptions.size)
    )
    if (!matchingOptions) continue

    // Check if a similar product with similiar options already exists in the sanitized cart
    const existingItemIndex = cleanedCart.findIndex(
      item => item._id === _id && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      cleanedCart[existingItemIndex].qty += qty
    } else {
      // No existing product with the same options, add a new item to the sanitized cart
      cleanedCart.push({ _id, qty, chosenOptions })
    }
  }

  return cleanedCart
}

interface dirtyCartItem {
  _id: string
  qty: number
  chosenOptions: ProductOptions
}
