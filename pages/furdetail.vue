<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <ul class="navheader">
      <li class="active"><a href="#item1">商品</a></li>
      <li><a href="#item2">详情</a></li>
    </ul>
    <a class="mui-icon mui-icon-info-filled mui-pull-right" style="color: #999;"></a>
    <a href="/sellerinfo" class="mui-icon mui-icon-info-filled mui-pull-right" style="color: #999;"></a>
  </header>
  <div class="mui-content">
    <component :is="swiperdetail" :imgarr="imgs"></component>
    <component :is="detail" :info="detailinfo"></component>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let url = require('url')
let querystring = require('querystring')
let model
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
      imgs: [],
      detailinfo: {}
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      let urlObj = querystring.parse(myURL.query)
      if (urlObj.id > 0) {
        axios.get('functions/app_homepage/app_furnitures?id=' + urlObj.id).then(function (data) {
          model.imgs = data.data.furniture_intro_pics
          model.detailinfo = data.data
        }).catch(function () {
          window.mui.toast('获取数据失败!')
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

</style>
