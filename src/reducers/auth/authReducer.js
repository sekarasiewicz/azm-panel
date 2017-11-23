import { SET_USER, AUTH_ERROR, LOADING } from './constants'

const initialState = {
  user: {},
  error: {},
  loading: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        loading: false,
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    default: return state
  }
}
