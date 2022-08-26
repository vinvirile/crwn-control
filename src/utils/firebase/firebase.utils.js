import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBH_P34aJn-FzJZEDortZSSVtHEIU4kc3I',
  authDomain: 'crwn-clothing-db-fdb00.firebaseapp.com',
  projectId: 'crwn-clothing-db-fdb00',
  storageBucket: 'crwn-clothing-db-fdb00.appspot.com',
  messagingSenderId: '355722725662',
  appId: '1:355722725662:web:4f048a03140142127ce10f',
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (err) {
      console.log('error creating the user', err.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return

  return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => signOut(auth)

export const onAuthStateChangedListener = callback =>
  onAuthStateChanged(auth, callback)
