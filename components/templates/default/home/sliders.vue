<template>
<div class="mui-slider">
  <div class="maodian" id="item1"></div>
  <div class="mui-slider-group mui-slider-loop">
    <!--支持循环，需要重复图片节点-->
    <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img :src="imgsArr[0].pic" /></a></div>

    <div class="mui-slider-item" v-for="tmp in imgsArr">
      <a :href="tmp.url"><img :src="tmp.pic" /></a>
    </div>
    <!--支持循环，需要重复图片节点-->
    <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img :src="imgsArr[imgsArr.length-1].pic" /></a></div>
  </div>
  <div class="mui-slider-indicator">
    <div class="mui-indicato" v-bind:class="index == 1 ? 'mui-active' : ''" v-for="(item, index) in imgsArr"></div>
  </div>
</div>
</template>
<script>
export default {
  props: ['imgarr'],
  data () {
    return {
      imgsArr: [
        {
          pic: '/images/banner.png',
          url: 'javascript:;'
        }
      ]
    }
  },
  watch: {
    imgarr: function () {
      this.imgsArr = this.imgarr
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
    position: relative;
  }
  .mui-slider-item img {
    max-height: 240px;
  }
  .maodian {
    position: absolute;
    height: 1px;
    top: -44px;
  }
</style>