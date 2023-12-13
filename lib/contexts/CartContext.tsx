import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import { CartItemWithData, ProductOptions } from '../../types'
import { getDatabaseUser } from '../serverFunctions/getUser'
import hydrateCart from '../serverFunctions/hydrateCart'
import { modifyQty, removeItem } from '../serverFunctions/product'

interface CartContextProps {
  showCart: boolean
  setShowCart: Dispatch<SetStateAction<boolean>>
  cartItems: CartItemWithData[]
  setCartItems: Dispatch<SetStateAction<CartItemWithData[]>>
  refreshCart: () => void
  changeQty: (productID: string, chosenOptions: ProductOptions, qty: number) => void
  remove: (productID: string, chosenOptions: ProductOptions) => void
  totalPrice: number
  totalQty: number
}

const CartContext = createContext<CartContextProps>({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  setCartItems: () => {},
  refreshCart: () => {},
  changeQty: () => {},
  remove: () => {},
  totalPrice: 0,
  totalQty: 0,
})

export function CartProvider({ children }: PropsWithChildren<{}>) {
  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItemWithData[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)

  const updatePriceAndQuantities = useCallback(() => {
    let newTotalPrice = 0
    let newTotalQty = 0
    for (const item of cartItems) {
      newTotalPrice += item.price * item.qty
      newTotalQty += item.qty
    }

    setTotalPrice(newTotalPrice)
    setTotalQty(newTotalQty)
  }, [cartItems])

  async function changeQty(productID: string, chosenOptions: ProductOptions, qty: number) {
    const newCart = [...cartItems]
    const item = cartItems.find(
      item =>
        item.productID === productID && item.chosenOptions.color === chosenOptions.color && item.chosenOptions.size === chosenOptions.size
    )
    if (item && !(qty < 0 && item.qty <= 1)) item.qty += qty
    setCartItems(newCart)
    updatePriceAndQuantities()
    await modifyQty(productID, qty, chosenOptions)
  }

  function remove(productID: string, chosenOptions: ProductOptions) {
    removeItem(productID, chosenOptions)
    refreshCart()
  }

  const refreshCart = useCallback(async () => {
    const user = await getDatabaseUser()
    if (user) {
      const cartWithData = await hydrateCart(user.cart)
      setCartItems(cartWithData)
      updatePriceAndQuantities()
    }
  }, [updatePriceAndQuantities])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  return (
    <CartContext.Provider value={{ showCart, setShowCart, cartItems, setCartItems, refreshCart, changeQty, remove, totalPrice, totalQty }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = (): CartContextProps => useContext(CartContext)
