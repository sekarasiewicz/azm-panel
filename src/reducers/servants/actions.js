import { servantRanksRef, servantsRef, fbService, storageRef } from '../../lib/firebaseService'
import {
  SERVANT_CHANGE, SERVANT_RANK_CHANGE, SERVANT_AVATAR_CHANGED } from './constants'

export const servantsChange = (servants) => ({type: SERVANT_CHANGE, payload: servants})

export const servantAvatarChanged = avatar => ({type: SERVANT_AVATAR_CHANGED, payload: avatar})

export const fetchAvatars = (servants) => {
  return (dispatch) => {
    Object.keys(servants).filter(s => servants[s].avatar).map(key => {
      return storageRef.child(`${key}/${servants[key].avatar}`).getDownloadURL().then(url => {
        dispatch(servantAvatarChanged({[key]: url}))
      }).catch(error => console.log('ERROR', error))
    })
  }
}

export const servantRanksChange = (servantRanks) => (
  { type: SERVANT_RANK_CHANGE, payload: servantRanks })

export const updateAvatar = (avatar) => {
  return dispatch => {
    dispatch(servantAvatarChanged(avatar))
  }
}

export const saveAvatar = (avatarObj, key) => {
  return storageRef.child(`${key}/${avatarObj.name}`).put(avatarObj)
}

export const saveServant = (servant, key) => {
  let updates = {}
  if (servant.rank) {
    updates['/servantRanks/' + servant.rank + '/' + key] = true
  }
  updates['/servants/' + key] = servant

  return fbService.database().ref().update(updates)
}

export const addServant = (servant) => {
  const key = servantsRef.push().key
  // Kind of stupid I prefere to get promise which return something, instead
  // update promise return undefined!
  return {key, promise: saveServant(servant, key)}
}

export const updateServant = (servant, key, oldRank, oldAvatar) => {
  const toUpdate = []
  if (servant.rank !== oldRank && oldRank) {
    toUpdate.push(servantRanksRef.child(oldRank).child(key).remove())
  }
  if (servant.avatar !== oldAvatar && oldAvatar) {
    toUpdate.push(storageRef.child(`${key}/${oldAvatar}`).delete())
  }
  return saveServant(servant, key).then(() => Promise.all(toUpdate))
}

export const deleteServant = (key, rank, avatarName) => {
  const toRemove = [servantsRef.child(key).remove()]
  if (rank) {
    toRemove.push(servantRanksRef.child(rank).child(key).remove())
  }

  if (avatarName) {
    toRemove.push(storageRef.child(`${key}/${avatarName}`).delete())
  }

  return Promise.all(toRemove)
}

export const addServantListener = (initializing) => {
  return (dispatch, getState) => {
    servantsRef.on('value', (snapshot) => {
      const { servants } = getState()

      dispatch(servantsChange(snapshot.val()))
      // Want to fetch all avatars only when there are no avatars
      if (!servants.avatars) {
        dispatch(fetchAvatars(snapshot.val()))
      }
    })
  }
}

export const addServantRankListener = () => {
  return dispatch => {
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
