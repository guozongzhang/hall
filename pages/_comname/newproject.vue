<template>
  <div class="box">
    <component :is="newreport"></component>
  </div>
</template>
<script>
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
      // this.component('newreport', 'report/_table.vue')
    },
    methods: {
      init: function () {
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
<style>
  
</style>
