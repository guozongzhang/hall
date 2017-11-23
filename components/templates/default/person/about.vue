<template>
<div class="about-box">
  <div class="img-box">
    <img class="default-img" src="/images/default_bg.png">
  </div>
  <div class="version-box">
    <label>云展厅</label>
    <span>v1.0.0.171030</span>
    <p>技术支持：搭配家</p>
  </div>
  <div class="mui-content-padded start-btn">
    <button type="button" class="mui-btn mui-btn-block" @click="startHall()">我也要开云展厅</button>
  </div>
  <div class="tips">
    <vue-texttips></vue-texttips>
  </div>
</div>
</template>
<script>
import textTips from './_texttips.vue'
let Cookies = require('js-cookie')
let url = require('url')
let $ = require('jquery')
let model
export default {
  data () {
    return {
      linkPath: ''
    }
  },
  components: {
    'vue-texttips': textTips
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let token = Cookies.get('dpjia-hall-token')
      if (!token) {
        window.location.href = model.linkPath + '/login'
      }
    },

    // 开云展厅
    startHall: function () {
      $('.tips').fadeIn()
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
.about-box{
  background-color: #fff;
}
.default-img{
  width: 100%;
  vertical-align: middle;
}
.version-box{
  margin-top: 18px;
  text-align: center;
}
.version-box label{
  color: #050505;
  font-size: 16px;
  font-weight: 600;
}
.version-box span{
  display: inline-block;
  background-color: #4e73cd;
  color: #fff;
  padding: 2px 5px;
  margin-left: 5px;
  border-radius: 3px;
  font-size: 14px;
}
.version-box p{
  color: #030303;
  font-size: 16px;
  margin: 12px 0;
}
.start-btn{
  margin: 35px 20px 0 20px;
}
.start-btn button{
  height: 44px;
  line-height: 12px;
  border-color: #4e73cd;
  color: #5175ce;
  font-size: 16px;
}
.tips{
  display: none;
}
</style>
