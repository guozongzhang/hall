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
    <div class="mui-indicator" v-bind:class="index == 0 ? 'mui-active' : ''" v-for="(item, index) in imgsArr"></div>
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
  .mui-slider-indicator .mui-active.mui-indicator {
    background: hsla(34,78%,91%,0);
    width: 0;
    height: 0;
    border: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid #5075ce;
    border-radius: 0;
    box-shadow: none;
    position: relative;
    top: 1px;
  }
</style>