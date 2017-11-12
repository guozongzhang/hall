<template>
<div class="text-tips">
  <div class="mui-popup-backdrop mui-active"></div>
  <div class="mui-popup mui-popup-in">
    <div class="self-title">
      <span class="close-icon" @click="clodeTips()"></span>
    </div>
    <div class="self-body">
      <label>请通过以下方式联系我们,将为您免费开通</label>
      <p>电话：<a>18518080508</a></p>
      <p>微信：18518080508</p>
      <p>邮箱：dpjia@dpjia.com</p>
    </div>
  </div>
</div>
</template>
<script>
let $ = require('jquery')
export default {
  data () {
    return {
    }
  },
  methods: {
    init: function () {
    },

    clodeTips: function () {
      $('.tips').fadeOut()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
.text-tips .mui-popup-in{
  width: 90%;
  height: 200px;
  background-color: #fff;
  border-radius: 0;
}
.text-tips .self-title{
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ababab;
}
.self-title .close-icon {
  position: relative;
  top: 10px;
  right: 10px;
  float: right;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('/images/person.png') no-repeat;
  background-size: 498px;
  background-position: -361px -68px;
  cursor: pointer;
}
.self-body {
  height: 120px;
  padding: 15px 20px;
}
.self-body label{
  display: block;
  font-size: 15px;
  color: #616161;
  margin-bottom: 5px;
}
.self-body p{
  font-size: 15px;
  color: #050505;
  margin: 0;
  padding: 0;
  height: 30px;
  line-height: 30px;
}
</style>
