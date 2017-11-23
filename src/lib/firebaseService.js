import * as firebase from 'firebase'
import config from './config'

console.log('firebase config')
export default firebase.initializeApp(config)
