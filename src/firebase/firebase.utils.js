import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyBTPL03rdhzaw9w-abyyUHdw7gOQtjzTJM",
  authDomain: "crwn-db-7af58.firebaseapp.com",
  projectId: "crwn-db-7af58",
  storageBucket: "crwn-db-7af58.appspot.com",
  messagingSenderId: "173954184683",
  appId: "1:173954184683:web:9f22ed1a08250f652755ae"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("Error creating user", error.message)
    }
  }
  return userRef
}
firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
