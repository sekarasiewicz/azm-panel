import { servantRanksRef, servantsRef, fbService } from '../../lib/firebaseService'
import { SERVANT_CHANGE, SERVANT_RANK_CHANGE } from './constants'

export const servantsChange = (servants) => ({type: SERVANT_CHANGE, payload: servants})
export const servantRanksChange = (servantRanks) => (
  {type: SERVANT_RANK_CHANGE, payload: servantRanks})

export const saveServant = (servant, key) => {
  let updates = {}
  updates['/servants/' + key] = servant
  if (servant.rank) {
    updates['/servantRanks/' + servant.rank + '/' + key] = true
  }

  return fbService.database().ref().update(updates)
}

export const addServant = (servant) => saveServant(servant, servantsRef.push().key)

export const updateServant = (servant, key, oldRank) => {
  if (servant.rank !== oldRank && oldRank) {
    servantRanksRef.child(oldRank).child(key).remove()
  }
  return saveServant(servant, key)
}

export const deleteServant = (key, rank) => {
  const toRemove = [servantsRef.child(key).remove()]
  if (rank) {
    toRemove.push(servantRanksRef.child(rank).child(key).remove())
  }
  return Promise.all(toRemove)
}

export const addServantListener = () => {
  return (dispatch) => {
    servantsRef.on('value', (snapshot) => {
      dispatch(servantsChange(snapshot.val()))
    })
  }
}

export const addServantRankListener = () => {
  return (dispatch) => {
    servantRanksRef.on('value', (snapshot) => {
      dispatch(servantRanksChange(snapshot.val()))
    })
  }
}

export const detachServantListener = () => {
  servantsRef.off()
}

export const detachServantRankListener = () => {
  servantRanksRef.off()
}
