import Vuex from 'vuex'

import mutations from './mutations'

const store = () => {
  return new Vuex.Store({
    state: {
      theme: 'default',
      authUser: null
    },
    mutations
  })
}

export default store
