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
      try {
        const categoryMap = await getCategoriesAndDocuments()
        setCategoriesMap(categoryMap)
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  const value = { categoriesMap }
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
