import { servantRanksRef, servantsRef, fbService, storageRef } from '../../lib/firebaseService'
import { SERVANT_CHANGE, SERVANT_RANK_CHANGE, SERVANT_AVATARS_FETCHED } from './constants'

export const servantsChange = (servants) => ({type: SERVANT_CHANGE, payload: servants})
export const servantAvatarsFetched = (avatars) => ({type: SERVANT_AVATARS_FETCHED, payload: avatars})

export const fetchAvatars = (servants) => {
  return (dispatch) => {
    Promise.all(Object.keys(servants).filter(s => servants[s].avatar).map(key => {
      console.log('fetchAvatars')
      return storageRef.child(`${key}/${servants[key].avatar}`).getDownloadURL().then(url => {
        return {key: key, url: url}
        // TODO Fetch on new file Does not work !, you have to take url from Uploaded file
      }).catch(error => console.log('ERROR', error))
    }))
      .then(payload => {
        const toDispatch = payload.reduce((obj, item) => {
          obj[item.key] = item.url
          return obj
        }, {})

        dispatch(servantAvatarsFetched(toDispatch))
      })
  }
}

export const servantRanksChange = (servantRanks) => (
  {type: SERVANT_RANK_CHANGE, payload: servantRanks})

export const saveServant = (servantObj, key) => {
  const { servant, avatarObj } = servantObj
  let updates = {}
  if (servantObj.servant.rank) {
    updates['/servantRanks/' + servant.rank + '/' + key] = true
  }
  updates['/servants/' + key] = servant

  const toSave = [fbService.database().ref().update(updates)]

  if (avatarObj) {
    // TODO Get avatar from promise!
    toSave.push(storageRef.child(`${key}/${servant.avatar}`).put(avatarObj))
  }

  return Promise.all(toSave)
}

export const addServant = (servantObj) => saveServant(servantObj, servantsRef.push().key)

export const updateServant = (servantObj, key, oldRank) => {
  if (servantObj.servant.rank !== oldRank && oldRank) {
    servantRanksRef.child(oldRank).child(key).remove()
  }
  // TODO usuwanie starych avatarow!
  return saveServant(servantObj, key)
}

export const deleteServant = (key, rank) => {
  const toRemove = [servantsRef.child(key).remove()]
  if (rank) {
    toRemove.push(servantRanksRef.child(rank).child(key).remove())
  }
  // TODO usuniecie avatara
  return Promise.all(toRemove)
}

export const addServantListener = () => {
  return (dispatch) => {
    servantsRef.on('value', (snapshot) => {
      dispatch(servantsChange(snapshot.val()))
      // TODO Fetch Avatars only ONCE!
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
