import { servantRanksRef, servantsRef, fbService, storageRef } from '../../lib/firebaseService'
import { SERVANT_CHANGE, SERVANT_RANK_CHANGE, SERVANT_AVATARS_FETCHED } from './constants'

export const servantsChange = (servants) => ({type: SERVANT_CHANGE, payload: servants})
export const servantAvatarsFetched = (avatars) => ({type: SERVANT_AVATARS_FETCHED, payload: avatars})

export const fetchAvatars = (servants) => {
  return (dispatch) => {
    Promise.all(Object.keys(servants).filter(s => servants[s].avatar).map(key => {
      return storageRef.child(`${key}/${servants[key].avatar}`).getDownloadURL().then(url => {
        return { [key]: url }
      })
    })).then(payload => {
      const toDispatch = payload.reduce((obj, item) => {
        obj[Object.keys(item)[0]] = Object.values(item)[0]
        return obj
      }, {})
      dispatch(servantAvatarsFetched(toDispatch))
    })
  }
}

export const servantRanksChange = (servantRanks) => (
  {type: SERVANT_RANK_CHANGE, payload: servantRanks})

export const saveServant = (servantObj, key) => {
  const servant = servantObj.servant
  let updates = {}
  if (servantObj.servant.rank) {
    updates['/servantRanks/' + servant.rank + '/' + key] = true
  }
  updates['/servants/' + key] = servant

  const toSave = [fbService.database().ref().update(updates)]

  if (servantObj.avatarObj) {
    toSave.push(storageRef.child(`${key}/${servant.avatar}`).put(servantObj.avatarObj))
  }

  return Promise.all(toSave)
}

export const addServant = (servantObj) => saveServant(servantObj, servantsRef.push().key)

export const updateServant = (servantObj, key, oldRank) => {
  if (servantObj.servant.rank !== oldRank && oldRank) {
    servantRanksRef.child(oldRank).child(key).remove()
  }
  return saveServant(servantObj, key)
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
      dispatch(fetchAvatars(snapshot.val()))
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
