module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '搭配家云展厅',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: 'js/mui.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/dpjia.ico' },
      {rel: 'stylesheet', href: '/css/mui.min.css'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    middleware: 'theme'
  },
  plugins: ['~plugins/common']
}