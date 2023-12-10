import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'
import { CartItemWithData } from '../../types'
import { getDatabaseUser } from '../serverFunctions/getUser'
import hydrateCart from '../serverFunctions/hydrateCart'

interface LayoutContextProps {
  cart: {
    showCart: boolean
    setShowCart: Dispatch<SetStateAction<boolean>>
    cartItems: CartItemWithData[]
    setCartItems: Dispatch<SetStateAction<CartItemWithData[]>>
  }
}

const LayoutContext = createContext<LayoutContextProps>({
  cart: {
    showCart: false,
    setShowCart: () => {},
    cartItems: [],
    setCartItems: () => {},
  },
})

export function CartProvider({ children }: PropsWithChildren<{}>) {
  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItemWithData[]>([])

  useEffect(() => {
    getDatabaseUser().then(async user => {
      if (user) {
        const cart = user.cart.map(item => ({ productID: item.productID, qty: item.qty, chosenOptions: item.chosenOptions }))
        const cartWithData = await hydrateCart(cart)
        setCartItems(cartWithData)
      }
    })
  }, [])

  return <LayoutContext.Provider value={{ cart: { showCart, setShowCart, cartItems, setCartItems } }}>{children}</LayoutContext.Provider>
}

export const useLayoutContext = (): LayoutContextProps => useContext(LayoutContext)
