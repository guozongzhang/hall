<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">登录</h1>
    <a :href="linkPath + '/register'" class="mui-pull-right register-link">注册</a>
  </header>
  <div class="mui-content">
    <component :is="login"></component>
  </div>
</div>
</template>
<script>
  let url = require('url')
  let model
  export default {
    head: {
      title: '登录'
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('login', 'login/login.vue')
    },
    data () {
      return {
        linkPath: ''
      }
    },
    methods: {
      init: function () {
        let myURL = url.parse(window.location.href)
        model.linkPath = '/' + myURL.pathname.split('/')[1]
      }
    },
    mounted () {
      model = this
      this.init()
    }
  }
</script>
<style>
  html,body{
    background-color: #fff !important;
  }
  .mui-bar{
    box-shadow: none;
  }
  .register-link{
    position: relative;
    top: 12px;
    right: 10px;
    font-size: 14px;
    color: #3f3f3f;
  }
  .mui-title{
    height: 44px !important;
    line-height: 44px !important;
  }
</style>
