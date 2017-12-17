import { SERVANT_CHANGE } from './constants'

const initialState = {
  servants: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SERVANT_CHANGE:
      return {...state, servants: action.payload}
    default: return state
  }
}
