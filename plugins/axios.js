import axios from 'axios'
export default axios.create({
  baseURL: process.env.baseUrl,
  headers: {
    'X-DP-Key': '7748955b16d6f1a02be76db2773dd316',
    'X-DP-ID': '7748955b16d6f1a0'
  }
})
