import { useContext } from 'react'
import Button from '../button/button.component'

import { CartContext } from '../../contexts/cart.context'

import CartItem from '../cart-item/cart-item.component'

import './cart-dropdown.styles.scss'
import { Link } from 'react-router-dom'

const CartDropDown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext)

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to="../cart">
        <Button onClick={() => setIsCartOpen(false)}>Go to Checkout</Button>
      </Link>
    </div>
  )
}

export default CartDropDown
