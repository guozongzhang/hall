<template>
<div class="mui-slider">
  <div class="mui-slider-group mui-slider-loop">
    <!--支持循环，需要重复图片节点-->
    <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img :src="imgarr[0].url" /></a></div>

    <div class="mui-slider-item" v-for="tmp in imgarr">
      <a href="#"><img :src="tmp.url" /></a>
    </div>
    <!--支持循环，需要重复图片节点-->
    <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img :src="imgarr[imgarr.length-1].url" /></a></div>
  </div>
  <div class="mui-slider-indicator">
    <div class="mui-indicator mui-active"></div>
    <div class="mui-indicator"></div>
    <div class="mui-indicator"></div>
    <div class="mui-indicator"></div>
  </div>
</div>
</template>
<script>
export default {
  props: ['imgarr'],
  data () {
    return {
      name: ''
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style>
  .mui-slider {
    max-height: 240px;
  }
  .mui-slider-item img {
    max-height: 240px;
  }
</style>