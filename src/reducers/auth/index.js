import { SET_USER, AUTH_ERROR, INITIALIZING } from './constants'

// MOve defaultPath to config file
// user as null
const initialState = {
  user: {},
  error: {},
  initializing: false,
  redirectTo: '/servants',
  defaultPath: '/servants',
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        initializing: false,
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case INITIALIZING:
      return {
        ...state,
        ...action.data,
      }
    default: return state
  }
}
