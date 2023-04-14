import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem }) => {
  const { updateCart } = useContext(CartContext)

  const { id, name, imageUrl, price, quantity } = cartItem

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${`alt`}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={() => updateCart('dec', id)} className="arrow">
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={() => updateCart('inc', id)} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">{price * quantity}</span>
      <div onClick={() => updateCart('del', id)} className="remove-button">
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
