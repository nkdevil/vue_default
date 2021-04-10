// import { axios } from '@/store/axios.js'
import { DEFAULT_STATE, DEFAULT_ACTIONS, DEFAULT_MUTATIONS, DEFAULT_GETTERS } from '@/store/modules/example/default'

const getDefaultState = () => {
  return {
    ...DEFAULT_STATE
  }
}

const state = getDefaultState() // state 선언

const actions = {
  ...DEFAULT_ACTIONS
}

const mutations = {
  ...DEFAULT_MUTATIONS
}

const getters = {
  ...DEFAULT_GETTERS
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
