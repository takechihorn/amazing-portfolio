import firebaseApp from '@/plugins/firebase'

export const state = () => ({
  user: null,
  error: null,
  busy: false,
  jobDone: false,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  },
  setBusy(state, payload) {
    state.busy = payload
  },
  setJobDone(state, payload) {
    state.jobDone = payload
  },
}

export const actions = {
  signUpUser({ commit }, payload) {
    commit('setBusy', true)
    commit('clearError')
    // 1. Signup new user
    // 2. Update firebase user profile & set Local user data
    // 3. Add user data into database
    // 4. Attach user to consumer group
    let newUser = null
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((result) => {
        newUser = result.user
        return result.user
          .updateProfile({ displayName: payload.fullname })
          .then(() => {
            const currentUser = {
              id: result.user.uid,
              email: payload.email,
              name: payload.fullname,
              role: 'consumer',
            }
            console.log('USER', currentUser)
            commit('setUser', currentUser)
          })
      })
      .then(() => {
        const userData = {
          email: payload.email,
          fullname: payload.fullname,
          createdAt: new Date().toISOString(),
        }
        return firebaseApp.database().ref(`users/${newUser.uid}`).set(userData)
      })
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  },
}

export const getters = {
  user(state) {
    return state.user
  },
  error(state) {
    return state.error
  },
  busy(state) {
    return state.busy
  },
  jobDone(state) {
    return state.jobDone
  },
}
