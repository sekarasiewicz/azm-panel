import { SET_CURRENT_USER } from './constants'
import firebase from '../../lib/firebaseService'

export function setCurrentUser (user) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}

export function login (data) {
  firebase.auth().signInWithEmailAndPassword(data.email, data.password).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  })

  return dispatch => {
    // console.log('login', firebase.app().name)
    // return axios.post('/api/auth', data).then(res => {
    //   const token = res.data.token
    //   localStorage.setItem('jwtToken', token)
    //   setAuthorizationToken(token)
    //   dispatch(setCurrentUser(jwt.decode(token)))
    // })
  }
}

export function logout () {
  return dispatch => {
    console.log('logout')
    // localStorage.removeItem('jwtToken')
    // setAuthorizationToken(false)
    // dispatch(setCurrentUser({}))
  }
}

export function checkUser () {
  firebase.auth().onAuthStateChanged((user) => {
    console.log('user', user)
    if (user) {
      // User is signed in.
      const displayName = user.displayName
      const email = user.email
      const emailVerified = user.emailVerified
      const photoURL = user.photoURL
      const isAnonymous = user.isAnonymous
      const uid = user.uid
      const providerData = user.providerData
      console.log(displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData)

      // ...
    } else {
      console.log('not logged in')
      // User is signed out.
      // ...
    }
  })
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
