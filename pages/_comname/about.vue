<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">关于</h1>
  </header>
  <div class="mui-content">
    <component :is="about"></component>
  </div>
</div>
</template>
<script>
  export default {
    head: {
      title: '关于'
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('about', 'person/about.vue')
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
</style>
