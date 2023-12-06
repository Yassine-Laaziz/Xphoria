import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'
import { FullCartItem } from '../../types'
import { getUserByServer } from '../serverFunctions/getUser'
import cleanCart from '../utils/cleanCart'

interface LayoutContextProps {
  cart: {
    showCart: boolean
    setShowCart: Dispatch<SetStateAction<boolean>>
    cartItems: FullCartItem[]
    setCartItems: Dispatch<SetStateAction<FullCartItem[]>>
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
  const [cartItems, setCartItems] = useState<FullCartItem[]>([])

  useEffect(() => {
    getUserByServer().then(async user => {
      if (user) {
        const cleanedCart = await cleanCart(user.cart)
        if (cleanedCart) setCartItems(cleanedCart)
      }
    })
  }, [])

  return <LayoutContext.Provider value={{ cart: { showCart, setShowCart, cartItems, setCartItems } }}>{children}</LayoutContext.Provider>
}

export const useLayoutContext = (): LayoutContextProps => useContext(LayoutContext)
