import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import Button from '../button/button.component'
import './card-dropdown.styles.scss'

const hideStyle = {
  display: 'none',
}

const CartDropDown = () => {
  const { isOpen } = useContext(CartContext)

  return (
    <div style={!isOpen ? hideStyle : {}} className='cart-dropdown-container'>
      <div className='cart-items'>
        <Button>Go to Checkout</Button>
      </div>
    </div>
  )
}

export default CartDropDown
