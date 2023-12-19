import { createContext, useReducer, useState, useContext, useEffect, Dispatch, PropsWithChildren, SetStateAction, useCallback } from 'react'
import { CartItemWithData, DisplayProduct, ProductOptions } from '../../types'
import { getDatabaseUser } from '../serverFunctions/getUser'
import { updateCart } from '../serverFunctions/contollers/product'
import { hydrateCart } from '../serverFunctions/contollers/cart'

interface CartContextProps {
  showCart: boolean
  setShowCart: Dispatch<SetStateAction<boolean>>
  cartItems: CartItemWithData[]
  totalPrice: number
  totalQty: number
  addItem: (product: DisplayProduct, chosenOptions: ProductOptions) => void
  removeItem: (productID: string, chosenOptions: ProductOptions) => void
  modifyQty: (productID: string, chosenOptions: ProductOptions, qty: number) => void
}

const CartContext = createContext<CartContextProps>({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  totalPrice: 0,
  totalQty: 0,
  addItem: () => {},
  removeItem: () => {},
  modifyQty: () => {},
})

export function CartProvider({ children }: PropsWithChildren<{}>) {
  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartState, dispatch]: [CartState, Dispatch<CartAction>] = useReducer(cartReducer, { cartItems: [], totalPrice: 0, totalQty: 0 })
  const { cartItems, totalPrice, totalQty } = cartState
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | undefined>()

  useEffect(() => {
    async function initialize() {
      const user = await getDatabaseUser()
      if (!user?.cart) return
      const cartItems = await hydrateCart(user.cart)
      dispatch({ type: 'REFRESH', cartItems })
    }
    initialize()
  }, [])

  useEffect(() => {
    // Clear any existing timeout
    clearTimeout(timeoutID)

    // Set a new timeout for the debounced execution
    const newTimeoutID = setTimeout(async () => {
      const verifiedCart = await updateCart(cartItems)
      if (verifiedCart) dispatch({ type: 'REFRESH', cartItems: verifiedCart })
    }, 10000)
    setTimeoutID(newTimeoutID)

    // Return a cleanup function to cancel the pending timeout
    return () => clearTimeout(newTimeoutID)
  }, [cartItems])

  function addItem(product: DisplayProduct, chosenOptions: ProductOptions) {
    dispatch({ product, chosenOptions, type: 'ADD_ITEM' })
  }

  function removeItem(productID: string, chosenOptions: ProductOptions) {
    dispatch({ productID, chosenOptions, type: 'REMOVE_ITEM' })
  }

  function modifyQty(productID: string, chosenOptions: ProductOptions, qty: number) {
    dispatch({ productID, chosenOptions, type: 'MODIFY_QTY', qty })
  }

  return (
    <CartContext.Provider value={{ showCart, setShowCart, cartItems, addItem, modifyQty, removeItem, totalPrice, totalQty }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = (): CartContextProps => useContext(CartContext)

type CartAction =
  | { type: 'REFRESH'; cartItems: CartItemWithData[] }
  | { type: 'ADD_ITEM'; product: DisplayProduct; chosenOptions: ProductOptions }
  | { type: 'REMOVE_ITEM'; productID: string; chosenOptions: ProductOptions }
  | { type: 'MODIFY_QTY'; productID: string; chosenOptions: ProductOptions; qty: number }

type CartState = {
  cartItems: CartItemWithData[]
  totalPrice: number
  totalQty: number
}

/**
 * This function updates the frontend cart state,
 * while useEffect listens for state changes and updates the server after debounce
 */
function cartReducer(state: CartState, action: CartAction): CartState {
  const updatedCart: CartItemWithData[] = JSON.parse(JSON.stringify(state.cartItems))

  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, chosenOptions } = action

      const foundItem = updatedCart.find(
        item =>
          item.productID === product._id &&
          item.chosenOptions.color === chosenOptions.color &&
          item.chosenOptions.size === chosenOptions.size
      )

      if (foundItem) foundItem.qty = Math.max(1, foundItem.qty + 1)
      else {
        const { _id, image, name, options, price } = product
        updatedCart.push({ productID: _id, image, name, options, price, chosenOptions, qty: 1 })
      }
      const { totalPrice, totalQty } = calculateTotals(updatedCart)
      return { cartItems: updatedCart, totalPrice, totalQty }
    }
    case 'MODIFY_QTY': {
      const { productID, chosenOptions, qty } = action
      const foundItem = updatedCart.find(
        item =>
          item.productID === productID && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
      )

      if (foundItem) foundItem.qty = Math.max(1, foundItem.qty + qty)
      const { totalPrice, totalQty } = calculateTotals(updatedCart)
      return { cartItems: updatedCart, totalPrice, totalQty }
    }
    case 'REMOVE_ITEM': {
      const { totalPrice, totalQty } = calculateTotals(updatedCart)
      return {
        totalPrice,
        totalQty,
        cartItems: state.cartItems.filter(
          item =>
            !(
              item.productID === action.productID &&
              item.chosenOptions.color === action.chosenOptions.color &&
              item.chosenOptions.size === action.chosenOptions.size
            )
        ),
      }
    }
    case 'REFRESH': {
      const { cartItems } = action
      const { totalPrice, totalQty } = calculateTotals(cartItems)
      return { cartItems, totalPrice, totalQty }
    }
    default:
      throw new Error('Unknown action type')
  }
}

function calculateTotals(cartItems: CartItemWithData[]) {
  let totalPrice = 0
  let totalQty = 0
  for (const item of cartItems) {
    totalPrice += item.price * item.qty
    totalQty += item.qty
  }
  return { totalPrice, totalQty }
}
