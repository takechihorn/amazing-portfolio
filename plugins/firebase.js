import firebase from 'firebase'
const config = require('../config')()
const firebaseConfig = config.firebaseConfig

// eslint-disable-next-line import/no-mutable-exports
let firebaseApp, adminApp

if (!firebaseApp && !firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
  adminApp = firebase.initializeApp(firebaseConfig, 'fireAdmin')
} else {
  firebaseApp = firebase.app()
  adminApp = firebase.app('fireAdmin')
}

export { firebaseApp, adminApp }
