import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import {
  LogoContainer,
  NavigationContainer,
  NavLinks,
  NavLink,
} from './navigation.styles'

import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='../'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        <CartDropDown />
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation
