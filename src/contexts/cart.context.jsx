import { createContext, useEffect, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const cartQuantityUpdater = (cartItems, product, action) => {
  if (cartItems.length === 0) return

  const doesCartItemExist = cartItems.find(item => {
    return item.id === product.id
  })

  if (doesCartItemExist) {
    let operation
    const { id } = doesCartItemExist
    if (action === 'decrement') {
      operation = -1

      if (doesCartItemExist.quantity === 1) {
        action = 'remove'
      }
    } else {
      operation = 1
    }

    if (action === 'remove') {
      return cartItems.filter(item => item.id !== product.id)
    }

    return cartItems.map(item => {
      return item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + operation,
          }
        : { ...item, quantity: item.quantity }
    })
  }

  return
}

export const CartContext = createContext({
  isOpen: null,
  setIsOpen: () => null,
  cartItems: [],
  setCartItems: () => null,
  addItemToCart: () => null,
  setCartCount: () => null,
  cartCount: 0,
  cartQuantityUpdater: () => null,
  cartTotal: 0,
  setCartTotal: () => null,
})

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  const addItemToCart = productToAdd => {
    setCartItems(() => addCartItem(cartItems, productToAdd))
    // setCartCount(cartCount + 1)
  }

  const updateCart = (product, action) => {
    setCartItems(() => cartQuantityUpdater(cartItems, product, action))
  }

  // create a useeffect to make sure that the cart count always matches the cart we have in bag! Remove line 77

  useEffect(() => {
    setCartTotal(() => {
      return cartItems.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price * currentValue.quantity
      }, 0)
    })
  }, [cartItems])

  useEffect(() => {
    const cartTotalCount = cartItems.reduce((previousCount, currentValue) => {
      return previousCount + currentValue.quantity
    }, 0)

    setCartCount(cartTotalCount)
  }, [cartItems])

  const value = {
    isOpen,
    setIsOpen,
    cartItems,
    setCartItems,
    addItemToCart,
    cartCount,
    setCartCount,
    updateCart,
    cartTotal,
    setCartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
