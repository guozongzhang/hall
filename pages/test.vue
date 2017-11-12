<template>
  <section>
    <div>
      <component :is="test"></component>
    </div>
  </section>
</template>
<script>
  export default {
    head: {
      title: 'dpjia-test'
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('test', 'dev/test.vue')
    },
    methods: {
      init: function () {
        console.log()
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
