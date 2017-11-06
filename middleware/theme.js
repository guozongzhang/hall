// import axios from 'axios'
let mockRequest = (query, store) => {
  let company = query.company
  let themes = {
    1: 'red',
    2: 'default'
  }
  let theme = themes[company]
  if (!theme) {
    theme = 'default'
  }
  return new Promise(resolve => {
    resolve(theme)
    // var instance = axios.create({
    //   headers: {
    //     'X-DP-Key': 222,
    //     'X-DP-ID': 111,
    //     'X-DP-Token': '26ad27621d5666c54de299db80e78c1f'
    //   }
    // })
    // instance.get('http://192.168.1.120/openapi/api/1.0/admin/current').then(function (response) {
    //   resolve(theme)
    //   console.log('them', response)
    // }).catch(function (error) {
    //   console.log(error)
    // })
  })
}

export default async function ({query, store, isServer, req, res}) {
  if (isServer) {
    let _theme
    let company = query.company
    let _cookie = req.headers.cookie
    let _themeData = {}
    if (_cookie) {
      try {
        _themeData = _cookie.match(/theme=({[\w\d":,\s]+})/)[1]
        _themeData = JSON.parse(_themeData)
        _theme = _themeData[company]
      } catch (ex) {
      }
    }
    if (!_theme) {
      _theme = await mockRequest(query, store)
      _themeData[company] = _theme
      res.setHeader('Set-Cookie', [`theme=${JSON.stringify(_themeData)}`])
    }
    store.commit('setTheme', _theme)
  }
}
