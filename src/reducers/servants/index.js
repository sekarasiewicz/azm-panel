import {
  SERVANT_CHANGE, SERVANT_RANK_CHANGE, SERVANT_AVATAR_CHANGED } from './constants'

const initialState = {
  servants: null,
  avatars: null,
  servantRanks: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SERVANT_CHANGE:
      return { ...state, servants: action.payload }
    case SERVANT_RANK_CHANGE:
      return { ...state, servantRanks: action.payload }
    case SERVANT_AVATAR_CHANGED:
      return {...state, avatars: {...state.avatars, ...action.payload}}
    default: return state
  }
}
