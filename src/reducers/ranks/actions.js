import firebase from '../../lib/firebaseService'
import { RANK_CHANGE } from './constants'

export const ranksChange = (ranks) => ({type: RANK_CHANGE, payload: ranks})

// TODO Move refs to conf or something like that
const rankRef = firebase.database().ref('ranks/')
const servantRanksRef = firebase.database().ref('servantRanks/')
const servantRef = firebase.database().ref('servants/')

export const saveRank = (rank) => {
  return rankRef.push().set(rank)
}

export const deleteRank = (key) => {
  rankRef.child(key).remove()
  const srRef = servantRanksRef.child(key)

  srRef.once('value').then(snapshot => {
    snapshot.forEach(data => {
      servantRef.child(data.key).once('value').then(snapshot => {
        let servant = snapshot.val()
        servant.rank = null
        servantRef.child(data.key).update(servant)
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
