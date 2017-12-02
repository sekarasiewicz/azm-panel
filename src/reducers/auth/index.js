import { SET_USER, AUTH_ERROR, INITIALIZING } from './constants'

const initialState = {
  user: null,
  error: {},
  initializing: false,
  redirectTo: '/servants',
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        initializing: false,
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case INITIALIZING:
      return {
        ...state,
        ...action.payload,
      }
    default: return state
  }
}
