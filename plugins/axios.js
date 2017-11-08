import axios from 'axios'
export default axios.create({
  baseURL: process.env.baseUrl,
  headers: {
    'X-DP-Key': 222,
    'X-DP-ID': 111,
    'X-DP-Token': 'a5266336dce226ccf5a396fd2a376def'
  }
})
