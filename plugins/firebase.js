import firebase from 'firebase'
const config = require('../config')()
const firebaseConfig = config.firebaseConfig

// eslint-disable-next-line import/no-mutable-exports
let firebaseApp

if (!firebaseApp && !firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
  firebaseApp = firebase.app()
}

export default firebaseApp
