const mutations = {
  setTheme (state, themeVal, comId) {
    state.theme = themeVal || 'default'
    state.comid = comId || '0'
  }
}
export default mutations
