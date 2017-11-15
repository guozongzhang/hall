<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <h1 class="mui-title">嘉利信得云展厅</h1>
    <a class="mui-icon mui-icon-info-filled mui-pull-right" style="color: #999;"></a>
  </header>
  <div class="mui-content">
    <component :is="search"></component>
    <component :is="slider" :imgarr="imgs"></component>
    <component :is="classifytab"></component>
    <div style="height: 20px;background-color: #f4f4f4;"></div>
    <component :is="hotfur"></component>
    <div style="height: 20px;background-color: #f4f4f4;"></div>
    <component :is="newfur"></component>
    <component :is="copyright"></component>
  </div>
</div>
</template>
<script>
export default {
  head: {
    title: '首页'
  },
  beforeCreate () {
    // 注册组件 component(名字, 相对路径)
    this.component('search', 'home/search.vue')
    this.component('slider', 'home/sliders.vue')
    this.component('classifytab', 'home/classifytab.vue')
    this.component('hotfur', 'home/hotfur.vue')
    this.component('newfur', 'home/newfur.vue')
    this.component('copyright', 'home/copyright.vue')
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
<style>
  html,body{
    background-color: #fff;
  }
  .mui-content{
    background-color: #fff;
    padding-bottom: 50px;
  }
  .mui-bar{
    background-color: #ededed;
    box-shadow: none;
  }
</style>
