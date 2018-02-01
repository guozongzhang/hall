<template>
<div class="mui-slider">
  <div class="maodian"></div>
  <div class="mui-slider-group mui-slider-loop">
    <!--支持循环，需要重复图片节点-->
    <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img :src="imgsArr[0].fip_url" /></a></div>

    <div class="mui-slider-item" v-for="tmp in imgsArr">
      <a href="#"><img :src="tmp.fip_url || '/images/square.png'" /></a>
    </div>
    <!--支持循环，需要重复图片节点-->
    <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img :src="imgsArr[imgsArr.length-1].fip_url" /></a></div>
  </div>
  <div class="mui-slider-indicator">
    <div class="mui-indicator" v-bind:class="index == 0 ? 'mui-active' : ''" v-for="(item, index) in imgsArr" v-show="imgsArr.length > 1"></div>
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
          fip_url: '/images/square.png'
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
    min-height: 200px;
    max-height: 400px;
    position: relative;
  }
  .mui-slider-item img {
    max-height: 400px;
  }
  .maodian {
    position: absolute;
    height: 1px;
    top: -44px;
  }
  .mui-slider-indicator .mui-indicator {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 1px 6px;
    cursor: pointer;
    border-radius: 50%;
    background: #aaa;
    -webkit-box-shadow: 0 0 1px 1px rgba(130,130,130,.7);
    box-shadow: 0 0 1px 1px rgba(130,130,130,.7);
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