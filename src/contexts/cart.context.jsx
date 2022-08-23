import { createContext, useState } from 'react'

export const CartContext = createContext({
  setCartItems: () => null,
  cartItems: null,
  isOpen: null,
  setIsOpen: () => null,
})

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const value = { isOpen, setIsOpen, cartItems, setCartItems }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
