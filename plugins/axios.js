import axios from 'axios'
export default axios.create({
  headers: {
    'X-DP-Key': 222,
    'X-DP-ID': 111,
    'X-DP-Token': '26ad27621d5666c54de299db80e78c1f'
  }
})
