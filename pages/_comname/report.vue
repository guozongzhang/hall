<template>
<div class="box">
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">我的项目</h1>
    <a href="javascript:void(0)" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-right fa fa-plus add"></a>
  </header>
  <ul class="navul">
    <li @click="getlist('all')" v-bind:class="{active:'all'== active}">
      <span class="text">全部项目</span>
      <span class="bglan"></span>
    </li>
    <li @click="getlist('wait')"  v-bind:class="{active:'wait'== active}">
      <span class="text">未报备项目</span>
      <span class="bglan"></span>
    </li>
    <li @click="getlist('rading')" v-bind:class="{active:'rading'== active}">
      <span class="text">已报备项目</span>
      <span class="bglan"></span>
    </li>
  </ul>
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
  .navul {
    width: 100%;
    overflow: hidden;
    margin-top: 44px;
    height: 40px;
    padding: 5px 0px;
    background: #fff;
  }
  .navul li {
    float: left;
    width: 33.33%;
    height: 30px;
    list-style-type: none;
    border-right: 1px solid #CBCBCB;
    position: relative;
  }
  .navul li:last-child{
    border: 0px;
  }
  .navul li span{
    float: left;
    font-size: 14px;
    height: 30px;
    line-height: 26px;
    text-align: center;
    width: 100%;
    color: #9B9B9B
  }
  
  .navul li .bglan {
    width: 27%;
    margin: 0 auto;
    height: 5px;
    background: #4E7AE7;
    position: absolute;
    left: 50px;
    top: 25px;
    border-radius: 50px;
    display: none;
  }
  .navul li.active .text{
    color: #4E7AE7;
  }
  .navul li.active .bglan{
    display: block;
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
