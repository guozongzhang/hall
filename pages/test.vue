<template>
  <section>
    <div>
      <component :is="test"></component>
      <component :is="slider"></component>
    </div>
  </section>
</template>

<script>
  export default {
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('test', 'dev/test.vue')
      this.component('slider', 'dev/sliders.vue')
    }
  }
</script>
