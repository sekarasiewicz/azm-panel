import { servantRanksRef, servantsRef, fbService } from '../../lib/firebaseService'
import { SERVANT_CHANGE } from './constants'

export const servantsChange = (servants) => ({type: SERVANT_CHANGE, payload: servants})

export const saveServant = (servant) => {
  const servantKey = servantsRef.push().key

  let updates = {}
  updates['/servants/' + servantKey] = servant
  if (servant.rank) {
    updates['/servantRanks/' + servant.rank + '/' + servantKey] = true
  }

  return fbService.database().ref().update(updates)
}

export const deleteServant = (key, rank) => {
  servantsRef.child(key).remove()
  if (rank) {
    servantRanksRef.child(rank).child(key).remove()
  }
}

export const addServantListener = () => {
  return (dispatch) => {
    servantsRef.on('value', (snapshot) => {
      dispatch(servantsChange(snapshot.val()))
    })
  }
}

export const detachServantListener = () => {
  servantsRef.off()
}
