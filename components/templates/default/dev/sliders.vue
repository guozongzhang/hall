<template>
<div class="mui-slider">
  <div class="mui-slider-group mui-slider-loop">
    <!--支持循环，需要重复图片节点-->
    <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg" /></a></div>

    <div class="mui-slider-item">
      <a href="#"><img src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg" /></a>
    </div>
    <div class="mui-slider-item">
      <a href="#"><img src="http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg" /></a>
    </div>
    <div class="mui-slider-item">
      <a href="#"><img src="http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg" /></a>
    </div>
    <div class="mui-slider-item">
      <a href="#"><img src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg" /></a>
    </div>
    <!--支持循环，需要重复图片节点-->
    <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg" /></a></div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    init: function () {
    }
  },
  mounted () {
    this.init()
  }
}
</script>