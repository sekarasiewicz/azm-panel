import { servantRanksRef, servantsRef, fbService, storageRef } from '../../lib/firebaseService'
import {
  SERVANT_CHANGE, SERVANT_RANK_CHANGE,
  SERVANT_AVATARS_FETCHED, SERVANT_AVATAR_CHANGED } from './constants'

export const servantsChange = (servants) => ({type: SERVANT_CHANGE, payload: servants})
export const servantAvatarsFetched = (avatars) => (
  {type: SERVANT_AVATARS_FETCHED, payload: avatars})

export const servantAvatarChanged = avatar => ({type: SERVANT_AVATAR_CHANGED, payload: avatar})

export const fetchAvatars = (servants) => {
  return (dispatch) => {
    Promise.all(Object.keys(servants).filter(s => servants[s].avatar).map(key => {
      return storageRef.child(`${key}/${servants[key].avatar}`).getDownloadURL().then(url => {
        return {[key]: url}
      }).catch(error => console.log('ERROR', error))
    }))
      .then(payload => {
        const toDispatch = payload.reduce((obj, item) => {
          return {...obj, ...item}
        }, {})

        dispatch(servantAvatarsFetched(toDispatch))
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
  // TODO usuwanie starych avatarow!
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

export const addServant = (servantObj) => saveServant(servantObj, servantsRef.push().key)

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
  // TODO usuniecie avatara
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
