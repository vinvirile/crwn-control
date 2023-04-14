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
  updateCart: () => null,
  cartTotal: () => null,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const cartItemsCount = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity
  }, 0)

  const cartTotal = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.price
  }, 0)

  const updateCart = (action, productId) => {
    const productIndex = cartItems.findIndex((item) => item.id === productId)

    switch (action) {
      case 'del':
        if (productIndex === -1) return
        setCartItems(
          cartItems.filter((item) => {
            return item.id !== productId
          })
        )
        break

      case 'dec':
        if (productIndex === -1) return
        if (cartItems[productIndex].quantity < 2) return
        cartItems[productIndex].quantity--
        setCartItems([...cartItems])
        break

      case 'inc':
        if (productIndex === -1) return
        cartItems[productIndex].quantity++
        setCartItems([...cartItems])
        break
    }
  }

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItemsCount,
    updateCart,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
