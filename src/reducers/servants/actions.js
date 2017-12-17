import firebase from '../../lib/firebaseService'
import { SERVANT_CHANGE } from './constants'

export const servantsChange = (servants) => ({type: SERVANT_CHANGE, payload: servants})

const servantRef = firebase.database().ref('servants/')

export const saveServant = (key, servant) => {
  servantRef.child(key).set(servant)
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
