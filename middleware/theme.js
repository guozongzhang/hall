import axios from '~/plugins/axios'
let mockRequest = (query, store) => {
  return new Promise(resolve => {
    let company = query.themename
    let param = {
      where: {
        route_abb: company
      }
    }
    axios.get('classes/company_mobile_skins', {
      params: param
    }).then(function (response) {
      let obj = null
      if (response.data.items.length > 0) {
        obj = {
          theme: response.data.items[0].theme,
          comid: response.data.items[0].com_id_poi_companys
        }
      } else {
        obj = {
          theme: 'default',
          comid: 0,
          comname: ''
        }
      }
      resolve(obj)
    }).catch(function (error) {
      console.log(error)
    })
  })
}

export default async function ({query, store, isServer, req, res}) {
  if (isServer) {
    let _theme = {}
    let company = query.themename
    let _cookie = req.headers.cookie
    let _themeData = {}
    // 检查cookie里面是否有公司和主题`
    if (_cookie) {
      try {
        _themeData = _cookie.match(/theme=([\w":,\d{}]+);/)[1]
        _themeData = JSON.parse(_themeData)
        _theme = _themeData[company]
      } catch (ex) {
      }
    }
    // 如果cookie没有公司和主题，则发请求获取
    if (!_theme) {
      _theme = await mockRequest(query, store)
      _themeData[company] = {
        theme: _theme.theme,
        comid: _theme.comid
      }
      res.setHeader('Set-Cookie', [`theme=${JSON.stringify(_themeData)}`])
    }
    store.commit('setTheme', _theme)
  }
}
