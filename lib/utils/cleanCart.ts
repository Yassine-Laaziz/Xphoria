import { FullCartItem, Product, ProductOptions } from '../../types'
import { fetchData } from '../sanity'

export default async function cleanCart(cart: dirtyCartItem[]): Promise<FullCartItem[] | undefined> {
  // this function takes in a cart, the cart may contain unvalid products or may contain no images
  // and prices to save db storage, this function provides the image and prices and eliminates unvalid products

  const allProducts: Product[] = await fetchData('*[_type == "product"]')
  if (!allProducts) return

  const cleanedCart: FullCartItem[] = []

  for (const cartItem of cart) {
    const { productSlug, qty, chosenOptions } = cartItem

    const matchingProduct = allProducts.find(p => p.name === productSlug)
    if (!matchingProduct) continue

    const matchingOptions = matchingProduct.noBgImages.find(
      opt => opt.color === chosenOptions.color && opt.sizes.includes(chosenOptions.size)
    )
    if (!matchingOptions) continue

    // Check if a similar product with different options already exists in the sanitized cart
    const existingItemIndex = cleanedCart.findIndex(
      item =>
        item.productSlug === productSlug &&
        item.chosenOptions.color === chosenOptions.color &&
        item.chosenOptions.size === chosenOptions.size
    )

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      cleanedCart[existingItemIndex].qty += qty
    } else {
      // No existing product with the same options, add a new item to the sanitized cart
      cleanedCart.push({ productSlug, qty, chosenOptions, price: matchingProduct.price, img: matchingProduct.image })
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
