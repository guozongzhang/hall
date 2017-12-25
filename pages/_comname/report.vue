<template>
<div class="box">
  <header class="mui-bar mui-bar-nav my-project">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left">返回</a>
    <h1 class="mui-title">我的项目</h1>
    <a :href="linkPath + '/newproject'" class="mui-icon mui-icon-left-nav mui-pull-right fa fa-plus add" ></a>
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
    box-shadow: none;
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
  .add {
    height: 44px;
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
