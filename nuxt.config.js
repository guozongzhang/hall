let ENV = require('./config/local_env.json')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '搭配家云展厅',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;', name: 'viewport' }
    ],
    script: [
      { src: '/js/mui.min.js' },
      { src: '/js/mui.zoom.js' },
      { src: '/js/mui.previewimage.js' },
      { src: '/js/mui.picker.js' },
      { src: '/js/mui.poppicker.js' },
      { src: '/js/jquery.min.js' },
      { src: '/js/jquery.form.js' },
      {src: 'https://hm.baidu.com/hm.js?f68e430ad04f189c825f4842107a1bdd'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/dpjia.ico' },
      { rel: 'stylesheet', href: '/css/mui.min.css' },
      { rel: 'stylesheet', href: '/css/mui.picker.css' },
      { rel: 'stylesheet', href: '/css/mui.poppicker.css' },
      { rel: 'stylesheet', href: '/css/font-awesome.css' },
      { rel: 'stylesheet', href: '/css/animate.css' },
      { rel: 'stylesheet', href: '/css/layout.css' }
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
    },
    vendor: ['axios']
  },
  router: {
    middleware: 'theme'
  },
  plugins: ['~plugins/common', '~plugins/ga.js'],
  env: {
    baseUrl: ENV ? ENV.api : 'http://192.168.1.120/openapi/api/1.0/'
  }
}
