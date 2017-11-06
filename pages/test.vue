<template>
  <section>
    <div>
      <component :is="imgpre"></component>
      <component :is="test"></component>
      <component :is="slider"></component>
    </div>
  </section>
</template>
<script>
  import axios from 'axios'
  export default {
    head: {
      title: 'dpjia-test'
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('test', 'dev/test.vue')
      this.component('slider', 'dev/sliders.vue')
      this.component('imgpre', 'dev/imgpreview.vue')
    },
    methods: {
      init: function (str) {
        axios.get('http://192.168.1.120/openapi/api/1.0/admin/current').then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
        console.log(str)
      }
    },
    mounted () {
      this.init('11111')
    }
  }
</script>
