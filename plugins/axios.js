import axios from 'axios'
export default axios.create({
  baseURL: process.env.baseUrl,
  headers: {
    'X-DP-Key': 222,
    'X-DP-ID': 111,
    'X-DP-Token': '4be59d9215e5f48c772c560bcfb02fc0'
  }
})
