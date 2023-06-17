import { connect } from '../mongodb'
import { err } from '../constants'
import UserModel from '../../models/Users'
import { CartItem, Product, ProductOptions, User } from '../../types'
import { getUserByJWT } from '../serverFunctions/getUser'
import { fetchData } from '../sanity'

interface ReturnT {
  msg?: string
  redirect?: string
  success?: boolean
  username?: string
  img?: string
}

export default async function addToBag(product: string, qty: number, chosenOptions: ProductOptions): Promise<ReturnT> {
  try {
    // await connect()

    // const userJWT = await getUserByJWT()
    // const user: User | null = await UserModel.findById(userJWT?.id)
    // if (!user) {
    //   return { redirect: '/auth/login' }
    // }

    // const cart = [...user.cart]

    // // Sanitization
    // const allProducts: Product[] = await fetchData('*[_type == "product"]', true)
    // if (!allProducts) return { msg: err }

    // const matchingProduct = allProducts.find(p => p.name === product)
    // if (!matchingProduct) {
    //   return { msg: `Product "${product}" not found.` }
    // }

    // const matchingOptions = matchingProduct.noBgImages.find(
    //   opt => opt.color === chosenOptions.color && opt.sizes.includes(chosenOptions.size)
    // )
    // if (!matchingOptions) {
    //   return { msg: `Options not available for product "${product}".` }
    // }

    // // Check if a similar product with different options already exists in the cart
    // const existingItemIndex = cart.findIndex(
    //   item =>
    //     item.product === product && (item.chosenOptions.color !== chosenOptions.color || item.chosenOptions.size !== chosenOptions.size)
    // )

    // if (existingItemIndex !== -1) {
    //   // Separate the product with different options in the cart
    //   const existingItem = cart.splice(existingItemIndex, 1)[0]
    //   const newItem = new CartItem(product, qty, chosenOptions)
    //   cart.push(existingItem) // Add back the existing item with different options
    //   cart.push(newItem) // Add the new item
    // } else {
    //   // No existing product with different options, simply add the new item to the cart
    //   cart.push(new CartItem(product, qty, chosenOptions))
    // }

    // console.log(cart)

    // await UserModel.findByIdAndUpdate(user.id, { cart })

    return { success: true }
  } catch (e) {
    console.log(`e${e}`)
    return { msg: err }
  }
}
