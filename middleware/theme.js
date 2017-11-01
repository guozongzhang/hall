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
    setTimeout(function () {
      resolve(theme)
    }, 2000)
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
