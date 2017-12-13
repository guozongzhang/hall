<template>
<div class="box">
  <component :is="newreport"></component>
</div>
</template>
<script>
  let $ = require('jquery')
  // let modal
  export default {
    head: {
      title: '我的项目'
    },
    data () {
      return {

      }
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('newreport', 'report/newproject.vue')
      this.component('test', 'dev/selectedtest.vue')
    },
    methods: {
      init: function () {
      },
      show: function (even) {
        var el = event.currentTarget
        $(el).addClass('show').siblings().removeClass('show')
      },

      // 提交新建项目
      postReport: function () {
      },

      // 改变可行性
      changeStart: function (index) {
        alert(0)
        console.log(index)
        this.startlength = index
      }
    },
    mounted () {
      this.init()
      // modal = this
    }
  }
</script>
<style>
  
</style>
