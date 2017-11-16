import axios from 'axios'
function getToken () {
  let obj = {
    'X-DP-Key': '7748955b16d6f1a02be76db2773dd316',
    'X-DP-ID': '7748955b16d6f1a0'
  }
  return obj
}
let params = {
  baseURL: process.env.baseUrl,
  headers: getToken()
}
export default axios.create(params)
