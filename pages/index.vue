<template>
  <section>
    <div>
      <logo/>
      <component :is="news"></component>
    </div>
  </section>
</template>

<script>
  export default {
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('news', 'news.vue')
    }
  }
</script>
