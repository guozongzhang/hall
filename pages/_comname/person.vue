<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-icon mui-icon-left-nav mui-pull-left" :href="linkPath"></a>
    <h1 class="mui-title">用户中心</h1>
  </header>
  <div class="mui-content">
    <component :is="basic"></component>
  </div>
</div>
</template>
<script>
  let url = require('url')
  let model
  export default {
    head: {
      title: '个人中心'
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('basic', 'person/basic.vue')
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
</style>
