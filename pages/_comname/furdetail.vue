<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">商品详情</h1>
    <a :href="linkPath + '/sellerinfo?userid=' + userid" class="mui-pull-right link-seller"></a>
    <a :href="linkPath + '/'" class="mui-pull-right go-home fa fa-home"></a>
  </header>
  <div class="mui-content">
    <component :is="swiperdetail" :imgarr="imgs"></component>
    <component :is="detail" :info="detailinfo"></component>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let url = require('url')
let querystring = require('querystring')
let model
let myURL
export default {
  head: {
    title: '商品详情页'
  },
  beforeCreate () {
    // 注册组件 component(名字, 相对路径)
    this.component('swiperdetail', 'goods/swiperdetail.vue')
    this.component('detail', 'goods/detail.vue')
  },
  data () {
    return {
      linkPath: '',
      userid: 0,
      imgs: [],
      detailinfo: {}
    }
  },
  methods: {
    init: function () {
      myURL = url.parse(window.location.href)
      model.userid = Cookies.get('designer-id-' + process.env.port) || '0'
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let urlObj = querystring.parse(myURL.query)
      if (urlObj.id > 0) {
        axios.get('functions/app_homepage/app_furnitures?id=' + urlObj.id + '&com_id=' + this.$store.state.comid).then(function (data) {
          model.imgs = data.data.furniture_intro_pics.filter(item => {
            return item.intro_type === 'intro'
          })
          model.detailinfo = data.data
        }).catch(function (error) {
          if (error.response.data.message === 'token is invalid') {
            window.mui.toast('登录信息过期!')
            setTimeout(function () {
              Cookies.set('dpjia-hall-token-' + process.env.port, '', {domain: '.dpjia.com'})
              window.location.href = model.linkPath + '/'
            }, 2000)
          }
        })
      } else {
        window.mui.toast('没有指定商品!')
      }
    }
  },
  mounted () {
    model = this
    model.init()
  }
}
</script>
<style>
  .
  html,body {
    background-color: #fff;
  }
  .mui-content {
    background-color: #fff;
    padding-bottom: 50px;
  }
  .mui-bar {
    background-color: #ededed;
    box-shadow: none;
  }
  .go-home{
    position: relative;
    top: 11px;
    right: 9px;
    font-size: 20px;
    color: #948f8e;
  }
  .navheader {
    overflow: hidden;
    width: 40%;
    border: 1px solid #757575;
    height: 30px;
    margin-top: 6px;
    padding: 0;
    border-radius: 2px;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -20%;
  }
  .navheader li {
    float: left;
    list-style-type: none;
    width: 50%;
    text-align: center;
    line-height: 30px;
  }
  .navheader li a{
    color: #000;
    font-size: 14px;
  }
  .navheader li.active{
    background: #7f7f7f;
  }
  .navheader li.active a{
    color: #fff;
  }
  .link-seller{
    position: relative;
    top: 13px;
    display: inline-block;
    width: 18px;
    height: 17px;
    background: url('/images/link_seller.png') no-repeat;
    background-size: 18px;
  }
</style>
