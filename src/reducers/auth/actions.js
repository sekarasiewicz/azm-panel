import { SET_USER, AUTH_ERROR, INITIALIZING } from './constants'
import firebase from '../../lib/firebaseService'

export function setUser (user) {
  return {
    type: SET_USER,
    user,
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    error,
  }
}

export function initializing (initializing) {
  console.log('initializing', initializing)
  return {
    type: INITIALIZING,
    initializing,
  }
}

export function login (data) {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .catch(error => {
        console.log('login error', error)
        dispatch(authError(error))
      })
  }
}

export function logout () {
  // return dispatch => {
  firebase.auth().signOut()
  // .catch(error => dispatch(authError(error)))
}

export function initializeApp (redirectTo) {
  return dispatch => {
    dispatch(initializing({
      initializing: true,
      redirectTo: redirectTo,
    }))
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(setUser({}))
      }
    })
  }
}

// Probably unnecessary
export function updateUser (userObj) {
  const user = firebase.auth().currentUser
  user.updateProfile({
    displayName: userObj.displayName,
    photoURL: userObj.photoURL,
  }).then(() => {
    console.log('updateUser Success')
    // Update successful.
  }).catch((error) => {
    console.log('updateUser Error', error)
    // An error happened.
  })
}
