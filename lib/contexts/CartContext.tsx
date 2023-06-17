import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Product, ProductOptions, CartItem as TCartItem } from '../../types'

interface useCartContext {
  cartItems: TCartItem[]
  addItem: (product: Product, chosenOptions: ProductOptions) => void
  removeItem: () => void
}

const CartContext = createContext<useCartContext>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
})

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [cartItems, setCartItems] = useState<TCartItem[]>([])

  function addItem(product: Product, chosenOptions: ProductOptions) {}
  function removeItem() {}

  useEffect(() => {
    const retrievedCartItems = localStorage.getItem('cart')
    if (!Array.isArray(retrievedCartItems)) return
    setCartItems(retrievedCartItems)
  }, [])

  return <CartContext.Provider value={{ cartItems, addItem, removeItem }}>{children}</CartContext.Provider>
}

export const useCartContext = (): useCartContext => useContext(CartContext)
