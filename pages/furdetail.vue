<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <ul class="navheader">
      <li class="active"><a href="#item1">商品</a></li>
      <li><a href="#item2">详情</a></li>
    </ul>
    <a class="mui-icon mui-icon-info-filled mui-pull-right" style="color: #999;"></a>
    <a class="mui-icon mui-icon-info-filled mui-pull-right" style="color: #999;"></a>
  </header>
  <div class="mui-content">
    <component :is="slider" :imgarr="imgs"></component>
    <component :is="detail"></component>
  </div>
</div>
</template>
<script>
export default {
  head: {
    title: 'dpjia-index'
  },
  beforeCreate () {
    // 注册组件 component(名字, 相对路径)
    this.component('slider', 'home/sliders.vue')
    this.component('detail', 'goods/detail.vue')
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
  .
  html,body {
    background-color: #fff;
  }
  .mui-content {
    background-color: #fff;
    padding-bottom: 50px;
  }
  .mui-bar {
    background-color: #ededed;
    box-shadow: none;
  }
  .navheader {
    overflow: hidden;
    width: 40%;
    border: 1px solid #757575;
    height: 30px;
    margin-top: 6px;
    padding: 0;
    border-radius: 2px;
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -20%;
  }
  .navheader li {
    float: left;
    list-style-type: none;
    width: 50%;
    text-align: center;
    line-height: 30px;
  }
  .navheader li a{
    color: #000;
    font-size: 14px;
  }
  .navheader li.active{
    background: #7f7f7f;
  }
  .navheader li.active a{
    color: #fff;
  }

</style>
