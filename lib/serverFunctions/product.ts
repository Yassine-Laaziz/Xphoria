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

type modifyT = {
  redirect?: string
  cart?: CartItem[]
}

export async function modifyQty(productID: string, qty: number, chosenOptions: ProductOptions): Promise<modifyT | undefined> {
  try {
    await connect()

    const user = await getDatabaseUser()
    if (!user) return { redirect: '/Auth' }
    const cart = [...user.cart]
    cart.forEach(item => sanitizeObj(item))

    if (!verifyIsActualProduct(chosenOptions, productID)) return

    // Check if a similar product with similiar options already exists in the sanitized cart
    const foundItem = cart.find(
      item =>
        item.productID === productID && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )

    if (foundItem && !(foundItem.qty <= 1 && qty < 0)) foundItem.qty += qty
    else if (!foundItem && qty > 0) cart.push({ productID, qty, chosenOptions })

    await UserModel.findByIdAndUpdate(user._id, { cart })
    return { cart }
  } catch (e) {
    return
  }
}

export async function removeItem(productID: string, chosenOptions: ProductOptions) {
  try {
    await connect()

    const user = await getDatabaseUser()
    if (!user) return { redirect: '/Auth' }
    user.cart.forEach(item => sanitizeObj(item))
    const cart = user.cart.filter(
      item =>
        item.productID !== productID && item.chosenOptions.color !== chosenOptions.color && item.chosenOptions.size !== chosenOptions.size
    )

    await UserModel.findByIdAndUpdate(user._id, { cart })
    return { cart }
  } catch (e) {
    return
  }
}

function verifyIsActualProduct(chosenOptions: ProductOptions, productID: string): boolean {
  if (!sanityProducts) return false
  const matchingProduct = sanityProducts.find(p => p._id === productID)
  if (!matchingProduct) return false

  const matchingOptions = matchingProduct.options.find(
    opt => opt.color === chosenOptions.color && opt.sizes.find(size => size === chosenOptions.size)
  )
  if (!matchingOptions) return false

  return true
}
