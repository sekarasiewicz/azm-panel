import { combineReducers } from 'redux'
import auth from './auth'
import servants from './servants'

export default combineReducers({auth, servants})
