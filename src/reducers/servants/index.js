import { SERVANTS_LOAD,
  SERVANTS_ADD,
  SERVANTS_REMOVE,
  SERVANTS_UPDATE,
} from './constants'

const initialState = {
  servants: [],
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SERVANTS_LOAD:
      return {...state, servants: action.payload}
    case SERVANTS_ADD:
      return state
    case SERVANTS_REMOVE:
      return state
    case SERVANTS_UPDATE:
      return state
    default: return state
  }
}
