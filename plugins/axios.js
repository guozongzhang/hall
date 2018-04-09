import axios from 'axios'
let Cookies = require('js-cookie')
function getToken () {
  let token = Cookies.get('dpjia-hall-token-' + process.env.PORT)
  let obj
  if (token) {
    obj = {
      'X-DP-Key': '7748955b16d6f1a02be76db2773dd316',
      'X-DP-ID': '7748955b16d6f1a0',
      'X-DP-Token': token
    }
  } else {
    obj = {
      'X-DP-Key': '7748955b16d6f1a02be76db2773dd316',
      'X-DP-ID': '7748955b16d6f1a0'
    }
  }
  return obj
}
let params = {
  baseURL: process.env.baseUrl,
  headers: getToken()
}
export default axios.create(params)
