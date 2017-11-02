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
    init: function (str) {
    //   mui.init({
    //     pullRefresh : {
    //       container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    //       down : {
    //         auto: true,//可选,默认false.首次加载自动下拉刷新一次
    //       },
    //       up : {
    //         auto: true //可选,默认false.首次加载自动上拉加载一次
    //       }
    //     }
      });
      console.log(str)
    }
  },
  mounted () {
    this.init(22)
  }
}
</script>