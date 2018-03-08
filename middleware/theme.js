import axios from '~/plugins/axios'
let mockRequest = async (store, params) => {
  let company = params.comname
  let param = {
    where: {
      route_abb: company
    }
  }
  let response = await axios.get('classes/company_mobile_skins', {
    params: param
  })
  let obj = {
    theme: 'default',
    comid: 0,
    comname: ''
  }
  if (response.data.items.length > 0) {
    obj = {
      theme: response.data.items[0].theme,
      comid: response.data.items[0].com_id_poi_companys,
      comname: response.data.items[0].route_abb
    }
  }
  return obj
}

export default async function ({query, store, isServer, req, res, params}) {
  if (isServer) {
    let _theme = {}
    _theme = await mockRequest(store, params)
    store.commit('setTheme', _theme)
  }
}
