<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">注册账号</h1>
  </header>
  <div class="mui-content">
    <component :is="register"></component>
  </div>
</div>
</template>
<script>
  export default {
    head: {
      title: '注册'
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('register', 'login/register.vue')
    },
    methods: {
      init: function () {
        console.log()
      }
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
