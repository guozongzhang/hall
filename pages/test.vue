<template>
  <section>
    <div>
      <component :is="imgpre"></component>
      <component :is="test"></component>
      <component :is="slider"></component>
      <component :is="input"></component>
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
      this.component('input', 'dev/input.vue')
    },
    methods: {
      init: function () {
        var instance = axios.create({
          headers: {
            'X-DP-Key': 222,
            'X-DP-ID': 222,
            'X-DP-Token': '26ad27621d5666c54de299db80e78c1f'
          }
        })
        instance.get('http://192.168.1.120/openapi/api/1.0/admin/current').then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
