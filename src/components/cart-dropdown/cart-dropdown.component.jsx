import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import './card-dropdown.styles.scss'

const hideStyle = {
  display: 'none',
}

const CartDropDown = () => {
  const { isOpen, cartItems, setIsOpen } = useContext(CartContext)

  return (
    <div style={!isOpen ? hideStyle : {}} className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to='checkout'>
        <Button onClick={() => setIsOpen(false)}>GO TO CHECKOUT</Button>
      </Link>
    </div>
  )
}

export default CartDropDown
