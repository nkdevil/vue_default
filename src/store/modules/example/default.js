// import { axios } from '@/store/axios.js'
const getDefaultState = () => {
  return {
    test: '',
    default: ''
  }
}

const DEFAULT_STATE = getDefaultState() // state 선언

const DEFAULT_ACTIONS = {
  async getTest ({commit, dispatch}, payload) {
    await dispatch('getDefault', 'hi!')
    commit('getTest', payload)
  },
  getDefault: ({commit}, payload) => {
    commit('getDefault', payload)
  }
}

const DEFAULT_MUTATIONS = {
  getTest: (state, payload) => {
    state.test = payload
  },
  getDefault: (state, payload) => {
    state.default = payload
  }
}

const DEFAULT_GETTERS = {
  testData (state) {
    return state.test
  },
  defaultData (state) {
    return state.default
  }
}

export {
  DEFAULT_STATE,
  DEFAULT_ACTIONS,
  DEFAULT_MUTATIONS,
  DEFAULT_GETTERS
}
