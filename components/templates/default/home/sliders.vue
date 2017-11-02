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