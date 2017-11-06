import axios from 'axios'
import Vue from 'vue'
Vue.use(axios)
export default axios.create({
  headers: {
    'X-DP-Key': 222,
    'X-DP-ID': 111,
    'X-DP-Token': ''
  }
})
