import firebase from '../../lib/firebaseService'
import { RANK_CHANGE } from './constants'

export const ranksChange = (ranks) => ({type: RANK_CHANGE, payload: ranks})

const rankRef = firebase.database().ref('ranks/')

export const saveRank = (rank) => {
  rankRef.child(rank.name.toLowerCase()).set(rank)
}

export const deleteRank = (key) => {
  rankRef.child(key).remove()
}

export const addRankListener = () => {
  return (dispatch) => {
    rankRef.on('value', (snapshot) => {
      dispatch(ranksChange(snapshot.val()))
    })
  }
}

export const detachRankListener = () => {
  rankRef.off()
}
