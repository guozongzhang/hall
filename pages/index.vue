<template>
<div class="mui-content">
  <component :is="index"></component>
  <component :is="slider" :imgarr="imgs"></component>
</div>
</template>

<script>
  export default {
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      this.component('index', 'home/index.vue')
      this.component('slider', 'home/sliders.vue')
    },
    data () {
      return {
        imgs: [
          {
            url: 'http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg',
            link: ''
          },
          {
            url: 'http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg',
            link: ''
          },
          {
            url: 'http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg',
            link: ''
          },
          {
            url: 'http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg',
            link: ''
          }
        ]
      }
    }
  }
</script>
