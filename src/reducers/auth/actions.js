import { SET_CURRENT_USER } from './constants'

export function setCurrentUser (user) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}

export function login (data) {
  return dispatch => {
    console.log('login')
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
