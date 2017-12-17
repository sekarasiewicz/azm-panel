import { combineReducers } from 'redux'
import auth from './auth'
import servants from './servants'
import ranks from './ranks'

export default combineReducers({auth, servants, ranks})
