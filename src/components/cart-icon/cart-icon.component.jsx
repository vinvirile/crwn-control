import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

const CartIcon = () => {
  const { isOpen, setIsOpen } = useContext(CartContext)

  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen)
      }}
      className='cart-icon-container'
    >
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  )
}

export default CartIcon
