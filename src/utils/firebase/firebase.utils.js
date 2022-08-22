import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

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
