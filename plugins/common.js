import Vue from 'vue'
Vue.filter('refcd', (value, typ) => {
  return 'yuguo'
})
Vue.use({
  install: function (Vue, options) {
    Vue.prototype.component = function (name, path) {
      // return `/components/templates/${this.$store.state.theme}/${path}`
      this[name] = () => import(`~/components/templates/${this.$store.state.theme}/${path}`)
    }
  }
})
