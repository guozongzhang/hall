const mutations = {
  setTheme (state, themeobj) {
    state.theme = themeobj.theme || 'default'
    state.comid = themeobj.comid || '0'
  }
}
export default mutations
