<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">搜索</h1>
  </header>
  <div class="mui-content">
    <component :is="search"></component>
  </div>
</div>
</template>
<script>
  export default {
    head: {
      title: '搜索'
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('search', 'goods/search.vue')
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
</style>
