import { RANK_CHANGE } from './constants'

const initialState = {
  ranks: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RANK_CHANGE:
      return {...state, ranks: action.payload}
    default: return state
  }
}
