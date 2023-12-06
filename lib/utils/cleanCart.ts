import { CartItem, Product, ProductOptions } from '../../types'
import { fetchData } from '../sanity'

export default async function cleanCart(cart: dirtyCartItem[]): Promise<CartItem[] | undefined> {
  // this function takes in a cart and validates the products and removes anything other than
  // productSlug, qty, chosenOptions

  const allProducts: Product[] = await fetchData('*[_type == "product"]')
  if (!allProducts) return

  const cleanedCart: CartItem[] = []

  for (const cartItem of cart) {
    const { productSlug, qty, chosenOptions } = cartItem

    // Check if this is an actual product
    const matchingProduct = allProducts.find(p => p.name === productSlug)
    if (!matchingProduct) continue

    // check if these are valid chosen options
    const matchingOptions = matchingProduct.noBgImages.find(opt => opt.color === chosenOptions.color)
    if (!matchingOptions) continue

    // Check if a similar product with similiar options already exists in the sanitized cart
    const existingItemIndex = cleanedCart.findIndex(
      item =>
        item.productSlug === productSlug &&
        item.chosenOptions.color === chosenOptions.color &&
        item.chosenOptions.size === Number(chosenOptions.size)
    )

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      cleanedCart[existingItemIndex].qty += qty
    } else {
      // No existing product with the same options, add a new item to the sanitized cart
      console.log(cartItem)
      cleanedCart.push({ productSlug, qty, chosenOptions })
    }
  }

  return cleanedCart
}

interface dirtyCartItem {
  productSlug: string
  qty: number
  chosenOptions: ProductOptions
  price?: number
  img?: string
}
