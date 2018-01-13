import * as firebase from 'firebase'
import { FIREBASE } from './config'

const fbService = firebase.initializeApp(FIREBASE)
const rankRef = firebase.database().ref('ranks/')
const servantRanksRef = firebase.database().ref('servantRanks/')
const servantsRef = firebase.database().ref('servants/')

export {
  fbService,
  rankRef,
  servantRanksRef,
  servantsRef,
}
