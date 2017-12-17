import { SET_USER, AUTH_ERROR, INITIALIZING } from './constants'
import { DEFAULT_PATH } from '../../lib/config'

const initialState = {
  user: null,
  error: null,
  initializing: true,
  redirectTo: DEFAULT_PATH,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        initializing: false,
        error: null,
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
