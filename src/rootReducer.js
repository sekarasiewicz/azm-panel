import { combineReducers } from 'redux'
import auth from './reducers/auth'
import servants from './reducers/servants'

export default combineReducers({auth, servants})
