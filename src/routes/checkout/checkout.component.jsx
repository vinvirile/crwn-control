import { useContext } from 'react'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { CartContext } from '../../contexts/cart.context'

const Checkout = () => {
  const { cartItems, setCartItems, cartTotal } = useContext(CartContext)
  console.log(cartItems)

  return (
    <div>
      {cartItems.map(item => {
        return <CheckoutItem key={item.id} item={item} />
      })}
      <span>Total: ${cartTotal}</span>
    </div>
  )
}

export default Checkout
