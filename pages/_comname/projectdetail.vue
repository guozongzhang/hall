<template>
<div>
  <div class="mui-content">
    <component :is="detail"></component>
  </div>
</div>
</template>
<script>
  export default {
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('detail', 'report/detail.vue')
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
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
