import { useContext } from 'react'
import Button from '../button/button.component'

import { CartContext } from '../../contexts/cart.context'

import CartItem from '../cart-item/cart-item.component'

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles'
import { Link } from 'react-router-dom'

const CartDropDown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext)

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Link to="../cart">
        <Button onClick={() => setIsCartOpen(false)}>Go to Checkout</Button>
      </Link>
    </CartDropdownContainer>
  )
}

export default CartDropDown
