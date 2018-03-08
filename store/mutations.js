const mutations = {
  setTheme (state, themeobj) {
    state.theme = themeobj.theme || 'default'
    state.comid = themeobj.comid || '0'
    state.comname = themeobj.comname || ''
  }
}
export default mutations
