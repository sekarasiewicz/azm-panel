import { rankRef, servantRanksRef, servantsRef } from '../../lib/firebaseService'
import { RANK_CHANGE } from './constants'

export const ranksChange = (ranks) => ({type: RANK_CHANGE, payload: ranks})

export const addRank = (rank) => {
  return rankRef.push().set(rank)
}

export const updateRank = (rank, key) => {
  return rankRef.child(key).set(rank)
}

export const deleteRank = (key) => {
  rankRef.child(key).remove()
  const srRef = servantRanksRef.child(key)

  return srRef.once('value').then(snapshot => {
    snapshot.forEach(data => {
      servantsRef.child(data.key).once('value').then(snapshot => {
        let servant = snapshot.val()
        servant.rank = null
        servantsRef.child(data.key).update(servant)
      })
    })
  }).then(() => srRef.remove())
}

export const addRankListener = () => {
  return (dispatch) => {
    rankRef.orderByChild('level').on('value', (snapshot) => {
      let ranks = {}
      snapshot.forEach((data) => {
        ranks[data.key] = data.val()
      })
      dispatch(ranksChange(ranks))
    })
  }
}

export const detachRankListener = () => {
  rankRef.off()
}
