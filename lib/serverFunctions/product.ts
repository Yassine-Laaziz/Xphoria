'use server'

import UserModel from '../../models/Users'
import ReviewModel from '../../models/Reviews'
import { DisplayProduct, Review, SanityProduct, CartItem, ProductOptions } from '../../types'
import { connect } from '../mongodb'
import { fetchData, urlForImage } from '../sanity'
import { getDatabaseUser } from './getUser'

const sanityProducts: SanityProduct[] | null = await fetchData('*[_type == "product"]')
const sanitizeObj = (obj: object) => JSON.parse(JSON.stringify(obj))
export async function getDisplayProducts(): Promise<DisplayProduct[]> {
  if (!sanityProducts) return []

  const products: DisplayProduct[] = []
  for (const product of sanityProducts) {
    const { _id } = product
    await connect()
    const reviews: Review[] = await ReviewModel.find({ productID: _id })

    sanityProducts.forEach(product => {
      const image = urlForImage(product.image).url()

      const options = product.options.map(option => ({
        ...option,
        images: option.images.map(img => urlForImage(img).url()),
      }))

      // Create a new product structure with reviews
      products.push(
        sanitizeObj({
          ...product,
          image,
          options,
          reviews,
        })
      )
    })
  }

  return products
}

export async function getDisplayProduct(id: string): Promise<DisplayProduct | null> {
  const product: SanityProduct | undefined = sanityProducts?.find(p => p._id === id)
  if (!product) return null

  await connect()
  const reviews: Review[] = await ReviewModel.find({ productID: id })

  const image = urlForImage(product.image).url()

  const options = product.options.map(option => ({
    ...option,
    images: option.images.map(img => urlForImage(img).url()),
  }))

  return sanitizeObj({ ...product, reviews, options, image })
}

type AddT = {
  redirect?: string
  cart?: CartItem[]
}

export async function addToBag(productID: string, qty: number, chosenOptions: ProductOptions): Promise<AddT | undefined> {
  try {
    await connect()

    const user = await getDatabaseUser()
    if (!user) return { redirect: '/Auth' }
    const cart = [...user.cart]

    if (!sanityProducts) return

    // Check if this is an actual product
    const matchingProduct = sanityProducts.find(p => p._id === productID)
    if (!matchingProduct) return

    // check if these are valid chosen options
    const matchingOptions = matchingProduct.options.find(
      opt => opt.color === chosenOptions.color && opt.sizes.find(size => size === chosenOptions.size)
    )
    if (!matchingOptions) return

    // Check if a similar product with similiar options already exists in the sanitized cart
    cart.forEach(item => sanitizeObj(item))
    const existingItemIndex = cart.findIndex(
      item =>
        item.productID === productID && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      cart[existingItemIndex].qty += qty
    } else {
      // No existing product with the same options, add a new item to the sanitized cart
      cart.push({ productID, qty, chosenOptions })
    }

    await UserModel.findByIdAndUpdate(user._id, { cart })
    return { cart }
  } catch (e) {
    return
  }
}

type RemoveT = {
  redirect?: string
  cart?: CartItem[]
}
export async function removeFromBag(productID: string, chosenOptions: ProductOptions): Promise<RemoveT | undefined> {
  try {
    await connect()

    const user = await getDatabaseUser()
    if (!user) {
      return { redirect: '/Auth' }
    }
    const cart = user.cart

    // Find the index of the item to be removed
    const existingItemIndex = cart.findIndex(
      item =>
        item.productID === productID && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )

    if (existingItemIndex !== -1) cart.splice(existingItemIndex, 1)
    // Removed the item from the cart

    await UserModel.findByIdAndUpdate(user._id, { cart })

    return { cart }
  } catch (e) {
    return
  }
}
