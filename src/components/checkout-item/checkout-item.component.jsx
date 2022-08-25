import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const cursorPointer = {
  cursor: 'pointer',
}

const CheckoutItem = ({ item }) => {
  const { name, quantity } = item

  const { updateCart, cartTotal } = useContext(CartContext)

  return (
    <div style={{ display: 'flex' }}>
      <span>{name}</span>
      <span
        onClick={() => {
          updateCart(item, 'decrement')
        }}
        style={cursorPointer}
      >
        &larr;
      </span>
      <span> {quantity} </span>
      <span
        onClick={() => {
          updateCart(item, 'increment')
        }}
        style={cursorPointer}
      >
        &rarr;
      </span>
      <span
        onClick={() => {
          updateCart(item, 'remove')
        }}
        style={cursorPointer}
      >
        X
      </span>
    </div>
  )
}

export default CheckoutItem
