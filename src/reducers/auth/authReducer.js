import { SET_USER, AUTH_ERROR } from './constants'

const initialState = {
  user: {},
  error: {},
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      }
    default: return state
  }
}
