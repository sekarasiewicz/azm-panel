import { SET_USER, AUTH_ERROR } from './constants'
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

export function login (data) {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(user => dispatch(setUser(user)))
      .catch(error => dispatch(authError(error)))
  }
}

export function logout () {
  console.log('was here before')
  return dispatch => {
    console.log('was here dispatch')
    firebase.auth().signOut().then(() => {
      dispatch(setUser({}))
    }).catch(error => dispatch(authError(error)))
  }
}

export function userState () {
  return dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(setUser({}))
      }
    })
  }
}

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
