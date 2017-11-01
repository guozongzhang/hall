<template>
<div class="mui-content">
  <component :is="index"></component>
  <component :is="test"></component>
</div>
</template>

<script>
  export default {
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('index', 'home/index.vue')
      this.component('test', 'home/test.vue')
    }
  }
</script>
