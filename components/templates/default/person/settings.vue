<template>
<div>
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media set-box" style="display: none">
      <a href="javascript:;">
        <div class="mui-switch mui-switch-mini" v-bind:class="isActive ? 'mui-active' : ''" @click="switchState()">
          <div class="mui-switch-handle"></div>
        </div>
        <div class="mui-media-body vip-price">
          <span class="vip-title">专属价</span>
          <p class='mui-ellipsis vip-tips'>开启后,商品详情页显示与当前登录身份相关的专属价;<br>关闭后,详情页不出现专属价项。</p>
        </div>
      </a>
    </li>
    <li class="mui-table-view-cell sub-item">
      <a class="mui-navigate-right" :href="linkPath + '/editpwd'">更改密码</a>
    </li>
  </ul>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let url = require('url')
let model
export default {
  data () {
    return {
      linkPath: '',
      isActive: true
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    },

    // 设置专属价
    switchState: async function () {
      let isDesigner = Cookies.get('can-upgrade')
      if (isDesigner === 'no') {
        model.isActive = false
        window.mui.toast('您不属于该云展厅的销售经理，不能开启专属价!')
        return false
      }
      model.isActive = !model.isActive
      let param = {
        point: this.$store.state.comid,
        type: 'cloud_price',
        action: 'vip_price',
        fur_type: model.isActive ? 'on' : 'off'
      }
      axios.post('classes/user_preference', null, {
        data: param
      }).then(function (data) {
        window.mui.toast('设置成功!')
      }).catch(function () {
        window.mui.toast('收藏失败!')
      })
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
  font-size: 14px;
  color: #696969;
}
.vip-price .vip-tips{
  margin-top: 3px;
  font-size: 12px;
  line-height: 15px;
  color: #447dff;
}
.sub-item{
  height: 44px;
  line-height: 22px;
  font-size: 14px;
  color: #050505 !important;
}
</style>
