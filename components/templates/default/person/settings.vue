<template>
<div>
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media set-box">
      <a href="javascript:;">
        <div class="mui-switch mui-switch-mini" v-bind:class="isActive ? 'mui-active' : ''" @click="switchState()">
          <div class="mui-switch-handle"></div>
        </div>
        <div class="mui-media-body vip-price">
          <span>专属价</span>
          <p class='mui-ellipsis vip-tips'>开启后,商品详情页显示与当前登录身份相关的专属价;<br>关闭后,详情页不出现专属价项。</p>
        </div>
      </a>
    </li>
    <li class="mui-table-view-cell sub-item">
      <a class="mui-navigate-right" href="/editpwd">更改密码</a>
    </li>
  </ul>
</div>
</template>
<script>
let model
export default {
  data () {
    return {
      isActive: true
    }
  },
  methods: {
    init: function () {
    },

    // 设置专属价
    switchState: function () {
      model.isActive = !model.isActive
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
.mui-table-view-cell:after{
  background-color: #fff;
}
.set-box{
  border-bottom: 1px solid #cccccc;
}
.vip-price .vip-title{
  font-size: 15px;
  color: #696969;
}
.vip-price .vip-tips{
  margin-top: 3px;
  font-size: 12px;
  line-height: 15px;
  color: #447dff;
}
.sub-item{
  height: 50px;
  line-height: 28px;
  color: #050505 !important;
}
</style>
