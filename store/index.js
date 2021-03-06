import Vuex from 'vuex'

import mutations from './mutations'

const store = () => {
  return new Vuex.Store({
    state: {
      theme: 'default',
      comid: 0,
      comname: ''
    },
    mutations
  })
}

export default store
