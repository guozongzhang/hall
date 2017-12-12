<template>
<div class="box">
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">我的项目</h1>
    <a href="javascript:void(0)" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-right fa fa-plus add"></a>
  </header>
  
  <div class="mui-content">
    <component :is="report"></component>
  </div>
</div>
</template>
<script>
  export default {
    head: {
      title: '我的项目'
    },
    data () {
      return {
        active: 'all'
      }
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('report', 'report/list.vue')
    },
    methods: {
      init: function () {
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
    box-shadow: none;
  }
  .register-link{
    position: relative;
    top: 12px;
    right: 10px;
    font-size: 14px;
    color: #3f3f3f;
  }
  .add {
    font-size:18px;
  }
</style>
