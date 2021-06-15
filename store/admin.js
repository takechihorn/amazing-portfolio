import firebaseApp from '@/plugins/firebase'

export const state = () => ({
  groups: [],
})

export const mutations = {
  loadGroups(state, payload) {
    state.groups.push(payload)
  },
}

export const actions = {
  createGroup({ commit }, payload) {
    commit('setBusy', true, { root: true })
    commit('clearError', null, { root: true })
    firebaseApp
      .database()
      .ref('groups')
      .push(payload)
      .then(() => {
        commit('setBusy', false, { root: true })
        commit('setJobDone', true, { root: true })
      })
      .catch((error) => {
        commit('setBusy', false, { root: true })
        commit('setError', error, { root: true })
      })
  },
  getGroups({ commit }) {
    firebaseApp
      .database()
      .ref('groups')
      .on('child_added', (snapShot) => {
        const item = snapShot.val()
        item.key = snapShot.key
        commit('loadGroups', item)
      })
  },
}

export const getters = {
  groups(state) {
    return state.groups
  },
}
