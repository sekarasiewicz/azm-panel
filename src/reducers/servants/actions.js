import firebase from '../../lib/firebaseService'
import {
  SERVANTS_LOAD,
  SERVANTS_ADD,
  SERVANTS_REMOVE,
  SERVANTS_UPDATE,
} from './constants'

export const loadServants = (servants) => ({type: SERVANTS_LOAD, payload: servants})
export const addServant = (servant) => ({type: SERVANTS_ADD, payload: servant})
export const updateServant = (servant) => ({type: SERVANTS_UPDATE, payload: servant})
export const removeServant = (id) => ({type: SERVANTS_REMOVE, payload: id})

export const fetchTodos = () => {
  // TODO add loading
  return (dispatch) => {
    firebase.database.
  }
}
