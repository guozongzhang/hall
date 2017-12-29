<template>
<div class="box">
  <header class="mui-bar mui-bar-nav my-project">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left">返回</a>
    <h1 class="mui-title">我的项目</h1>
    <a href="http://help.dpjia.com/%E4%BA%A7%E5%93%81%E6%96%87%E6%A1%A3/%E4%BA%A7%E5%93%81%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C/%E9%A1%B9%E7%9B%AE%E6%8A%A5%E5%A4%87/%E5%BF%AB%E9%80%9F%E6%8A%A5%E5%A4%87" class="mui-pull-right help-icon">
      <svg class="svg-style">
        <use xlink:href="/svg/icon.svg#help"></use>
      </svg>
    </a>
    <a :href="linkPath + '/newproject'" class="mui-pull-right add" >
      <svg class="svg-style">
        <use xlink:href="/svg/icon.svg#plus"></use>
      </svg>
    </a>
  </header>
  
  <div class="mui-content">
    <component :is="report"></component>
  </div>

  <div class="footer">
    <a :href="linkPath + '/fast'"><div>快速报备</div></a>
  </div>
</div>
</template>
<script>
  let url = require('url')
  export default {
    head: {
      title: '我的项目'
    },
    data () {
      return {
        active: 'all',
        linkPath: ''
      }
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('report', 'report/list.vue')
    },
    methods: {
      init: function () {
        let myURL = url.parse(window.location.href)
        this.linkPath = '/' + myURL.pathname.split('/')[1]
      },
      getlist: function (state) {
        this.active = state
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
<style>
  .box{
    background: #efeff4;
  }
  html,body{
    background-color: #fff !important;
  }
  .mui-bar{
    position: relative;
    box-shadow: none;
  }
  .svg-style {
    width: 18px;
    height: 18px;
    fill: #5278e5;
  }
  .box .mui-bar .add .svg-style {
    width: 18px;
    height: 18px;
  }
  
  .box .mui-bar .help-icon {
    position: absolute;
    right: 10px;
    top: 12px;
    width: 26px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-size: 18px;
    display: inline-block;
    margin-left: 10px;
  }
  .footer{
    height: 73px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #EEEEEE;
    z-index: 10;
    padding: 6px 15px; 
  }
  .footer div{
    font-size: 16px;
    line-height: 50px;
    border-radius: 30px;
    background: #5278e5;
    text-align: center;
    color: #fff;
    box-shadow: 2px 2px 2px #ccc;
  }
  .register-link{
    position: relative;
    top: 12px;
    right: 10px;
    font-size: 14px;
    color: #3f3f3f;
  }
  .box .mui-bar .add {
    position: absolute;
    top: 13px;
    right: 46px;
    display: inline-block;
    width: 26px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-size: 16px !important;
    font-weight: 400!important;;
  }
  .my-project {
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  .my-project .mui-title{
    font-weight: 600;
  }
  .my-project .mui-action-back{
    font-size: 14px;
    color: #666;
    height: 44px;
    line-height: 26px;
  }
</style>
