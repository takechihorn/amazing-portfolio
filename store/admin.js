import firebaseApp from '@/plugins/firebase'

export const state = () => ({
  groups: [],
})

export const mutations = {
  loadGroups(state, payload) {
    state.groups.push(payload)
  },
  updateGroup(state, payload) {
    const i = state.groups.indexOf(payload.group)
    state.groups[i].name = payload.name
  },
  removeGroup(state, payload) {
    const i = state.groups.indexOf(payload.group)
    state.groups.splice(i, 1)
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
  updateGroup({ commit }, payload) {
    commit('setBusy', true, { root: true })
    commit('clearError', null, { root: true })
    firebaseApp
      .database()
      .ref(`groups/${payload.group.key}`)
      .update({ name: payload.name })
      .then(() => {
        commit('setBusy', false, { root: true })
        commit('setJobDone', true, { root: true })
        const groupData = {
          group: payload.group,
          name: payload.name,
        }
        commit('updateGroup', groupData)
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
  removeGroup({ commit }, payload) {
    firebaseApp
      .database()
      .ref(`groups/${payload.group.key}`)
      .remove()
      .then(() => {
        commit('removeGroup', payload)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}

export const getters = {
  groups(state) {
    return state.groups
  },
}
