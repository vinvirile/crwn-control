import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'

const cursorPointer = {
  cursor: 'pointer',
}

const CheckoutItem = ({ item }) => {
  const itemob = item
  const { name, quantity, imageUrl, price } = item

  const { updateCart } = useContext(CartContext)

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <div
          onClick={() => {
            updateCart(item, 'decrement')
          }}
          className='arrow'
        >
          &#10094;
        </div>
        {quantity}
        <div
          onClick={() => {
            updateCart(item, 'increment')
          }}
          className='arrow'
        >
          &#10095;
        </div>
      </span>
      <span className='price'> {price} </span>
      <div
        onClick={() => {
          updateCart(item, 'remove')
        }}
        className='remove-button'
      >
        &#10005;
      </div>
    </div>
  )

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
