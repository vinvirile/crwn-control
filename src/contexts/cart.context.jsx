import { createContext, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd

  const productIndex = cartItems.findIndex(
    (item) => item.name === productToAdd.name
  )

  if (productIndex !== -1) {
    cartItems[productIndex].quantity += 1
    return [...cartItems]
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]

  // If found, increment quantity
  // return new array with modified cartItems/ new cart item
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartItemsCount: () => 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const cartItemsCount = cartItems.reduce((accumulator, currentValue) => {
    console.log(currentValue)
    return accumulator + currentValue.quantity
  }, 0)

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItemsCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
