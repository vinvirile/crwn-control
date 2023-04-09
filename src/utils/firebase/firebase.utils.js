import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB3vlz-ip7NHofkQBv3bYzHeGYxF2xUAkg',
  authDomain: 'crwn-clothing-db-50a2e.firebaseapp.com',
  projectId: 'crwn-clothing-db-50a2e',
  storageBucket: 'crwn-clothing-db-50a2e.appspot.com',
  messagingSenderId: '414167049306',
  appId: '1:414167049306:web:6ce5229278e190bcc06463',
  measurementId: 'G-43JVLTKX0Y',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (err) {
      console.log('error creating the user', err.message)
    }
  }

  return userDocRef
}
