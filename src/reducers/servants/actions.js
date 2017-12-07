import firebase from '../../lib/firebaseService'
import {
  // SERVANTS_LOAD,
  // SERVANTS_ADD,
  // SERVANTS_REMOVE,
  // SERVANTS_UPDATE,
  SERVANTS_CHANGE,
} from './constants'

// export const loadServants = (servants) => ({type: SERVANTS_LOAD, payload: servants})
// export const addServant = (servant) => ({type: SERVANTS_ADD, payload: servant})
// export const updateServant = (servant) => ({type: SERVANTS_UPDATE, payload: servant})
// export const removeServant = (id) => ({type: SERVANTS_REMOVE, payload: id})

// export const fetchTodos = () => {
//   // TODO add loading
//   return (dispatch) => {
//     firebase.database.
//   }
// }

export const servantsChange = (servants) => ({type: SERVANTS_CHANGE, payload: servants})

const servantRef = firebase.database().ref('servants/')

export const saveServant = (servant) => {
  servantRef.push().set(servant)
}

export const deleteServant = (key) => {
  servantRef.child(key).remove()
}

export const addServantListener = () => {
  return (dispatch) => {
    servantRef.on('value', (snapshot) => {
      dispatch(servantsChange(snapshot.val()))
    })
  }
}
