import { SET_USER, AUTH_ERROR, INITIALIZING } from './constants'
import { fbService } from '../../lib/firebaseService'

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
    fbService.auth().signInWithEmailAndPassword(data.email, data.password)
      .catch(error => {
        dispatch(authError(error))
      })
  }
}

export function logout () {
  fbService.auth().signOut()
}

export function initializeApp (redirectTo) {
  return dispatch => {
    dispatch(initializing({ redirectTo: redirectTo }))
    fbService.auth().onAuthStateChanged((user) => {
      dispatch(setUser(user))
    })
  }
}

// Probably unnecessary
export function updateUser (userObj) {
  const user = fbService.auth().currentUser
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
