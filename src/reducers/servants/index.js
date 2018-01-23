import { SERVANT_CHANGE, SERVANT_RANK_CHANGE, SERVANT_AVATARS_FETCHED } from './constants'

const initialState = {
  servants: null,
  avatars: null,
  servantRanks: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SERVANT_CHANGE:
      return {...state, servants: action.payload}
    case SERVANT_RANK_CHANGE:
      return {...state, servantRanks: action.payload}
    case SERVANT_AVATARS_FETCHED:
      return {...state, avatars: action.payload}
    default: return state
  }
}
