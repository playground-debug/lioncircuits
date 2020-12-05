import React, { useContext, useState, useEffect } from "react"
import { auth, database } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const currentUserConst = auth.currentUser;
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  if (currentUser) {
    console.log('Current user:', currentUser.uid);
    console.log('Current user UID:', currentUserConst.uid);
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function user(uid) {
    return database.ref(`users/${uid}`)
  }

  function address(uid) {
    return database.ref(`users/${uid}/address`)
  }

  function users() {
    return database.ref('user')
  }

  function setUser(email, phoneNumber) {
    console.log('Outside database');
    if (auth.currentUser) {
      console.log('Inside Database');
      return user(auth.currentUser.uid).set({
        'email': email,
        'phoneNumber': phoneNumber
      })
    }
  }

  function updateUser(key, value) {
    if (auth.currentUser) {
      console.log('Key:', key);
      console.log('Updating User')
      return user(auth.currentUser.uid).update({
        [key]: value
      })
    }
  }

  function updateUserAddress(value) {
    if (auth.currentUser) {
      console.log('Adding New Address');
      return address(auth.currentUser.uid).push().set(value)
    }
  }

  function getUser() {
    console.log('Getting Data');
    if (auth.currentUser) {
      console.log('Got Data');
      return user(auth.currentUser.uid).get()
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    user,
    users,
    setUser,
    getUser,
    updateUser,
    updateUserAddress
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}