<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">设置</h1>
  </header>
  <div class="mui-content">
    <component :is="settings"></component>
  </div>
</div>
</template>
<script>
  export default {
    head: {
      title: '设置'
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('settings', 'person/settings.vue')
    },
    methods: {
      init: function () {}
    },
    mounted () {
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
