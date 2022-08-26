import { createContext, useState, useEffect } from 'react'
import SHOP_DATA from '../shop-data.js'

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js'

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoriesMap: () => null,
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  useEffect(() => {
    return async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
  }, [])

  const value = { categoriesMap }
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
