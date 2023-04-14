import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'
import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
const styles = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '20px',
  alignItems: 'center',
}

const Checkout = () => {
  const { cartItems, updateCart, cartTotal } = useContext(CartContext)
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <hr />
      <span className="total">
        Total: <strong>${cartTotal}</strong>
      </span>
    </div>
  )
}

export default Checkout
