<template>
<div class="box">
  <component :is="fastvue"></component>
</div>
</template>
<script>
  let modal
  export default {
    head: {
      title: '快速报备'
    },
    data () {
      return {

      }
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('fastvue', 'report/fast.vue')
    },
    methods: {
      init: function () {
      }
    },
    mounted () {
      modal = this
      modal.init()
    }
  }
</script>
<style>
  
</style>
