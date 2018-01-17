import { SERVANT_CHANGE, SERVANT_RANK_CHANGE } from './constants'

const initialState = {
  servants: null,
  servantRanks: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SERVANT_CHANGE:
      return {...state, servants: action.payload}
    case SERVANT_RANK_CHANGE:
      return {...state, servantRanks: action.payload}
    default: return state
  }
}
