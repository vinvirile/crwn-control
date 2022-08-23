import { createContext, useState, useEffect } from 'react'
import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
  setCurrentProducts: () => null,
  currentProducts: null,
})

export const ProductsProvider = ({ children }) => {
  const [currentProducts, setCurrentProducts] = useState(PRODUCTS)
  const value = { currentProducts }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
