import { SET_USER, AUTH_ERROR, INITIALIZING } from './constants'
import firebase from '../../lib/firebaseService'

export function setUser (payload) {
  return {
    type: SET_USER,
    payload,
  }
}

export function authError (payload) {
  return {
    type: AUTH_ERROR,
    payload,
  }
}

export function initializing (payload) {
  return {
    type: INITIALIZING,
    payload,
  }
}

export function login (data) {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .catch(error => {
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
      dispatch(setUser(user))
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
