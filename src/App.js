import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './components/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'

import Shop from './routes/shop/shop.component'
import Checkout from './routes/cart/checkout.component'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="cart" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
