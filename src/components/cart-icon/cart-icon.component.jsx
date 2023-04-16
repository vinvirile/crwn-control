import { useContext } from 'react'
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from './cart-icon.styles.jsx'

import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(CartContext)

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartItemsCount || 0}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
