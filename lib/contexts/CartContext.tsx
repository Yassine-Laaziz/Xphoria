import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'
import { CartItem as TCartItem } from '../../types'

interface useCartContext {
  cartItems: TCartItem[]
  setCartItems: Dispatch<SetStateAction<TCartItem[]>>
  showCart: boolean
  setShowCart: Dispatch<SetStateAction<boolean>>
}

const CartContext = createContext<useCartContext>({
  cartItems: [],
  setCartItems: () => {},
  showCart: false,
  setShowCart: () => {},
})

export function CartProvider({ children }: PropsWithChildren<{}>) {
  const [cartItems, setCartItems] = useState<TCartItem[]>([])
  const [showCart, setShowCart] = useState<boolean>(false)

  useEffect(() => {
    const retrievedCartItems = localStorage.getItem('cart')
    if (!Array.isArray(retrievedCartItems)) return
    setCartItems(retrievedCartItems)
  }, [])

  return <CartContext.Provider value={{ cartItems, setCartItems, showCart, setShowCart }}>{children}</CartContext.Provider>
}

export const useCartContext = (): useCartContext => useContext(CartContext)
