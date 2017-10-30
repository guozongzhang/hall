'use strict'
require('babel-polyfill')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const router = require('koa-router')()
const serve = require('koa-static')
const mount = require('koa-mount')
const url = require('url')
const qs = require('querystring')
const fs = require('fs')

// 静态文件服务
app.use(mount('/dist', serve(__dirname + '/dist')))
app.use(mount('/', serve(__dirname + '/public')))
app.use(mount('/', serve(__dirname + '/vendor')))

// 视图处理
app.use(views(__dirname + '/views', {
  map: {
    jade: 'jade'
  }
}))

// 路由
let renderAction = async (ctx, controller, action) => {
  let vi = controller + '/' + action + '.jade'
  await ctx.render(vi,
    {
      params: ctx.params,
      route: {
        controller: controller,
        action: action
      },
      query: qs.parse(url.parse(ctx.request.url).query)
    }
  )
}
router.get('/:controller/:action', async (ctx, next) => {
  await renderAction(ctx, ctx.params.controller, ctx.params.action)
})
router.get('/:controller', async (ctx, next) => {
  let controller = ctx.params.controller
  if (fs.existsSync(__dirname + '/views/home/' + controller + '.jade')) {
    await renderAction(ctx, 'home', controller)
  } else {
    await renderAction(ctx, controller, 'index')
  }
})

router.get('/', async (ctx, next) => {
  await renderAction(ctx, 'home', 'index')
})

app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(5050)
