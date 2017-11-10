import axios from 'axios'
export default axios.create({
  baseURL: process.env.baseUrl,
  headers: {
    'X-DP-Key': '0c31e550cfdab86f2c2ea59327907798',
    'X-DP-ID': 'cfdab86f2c2ea593'
  }
})
