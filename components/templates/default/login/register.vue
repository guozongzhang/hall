<template>
<div class="login-box">
  <div class="mui-content-padded">
    <h3>注册新账号</h3>
  </div>
  <div v-show="step == 'one'">
    <div class="mui-input-row number-box">
      <input type="text" placeholder="手机号">
    </div>
    <div class="mui-input-row number-box">
      <input type="text" placeholder="动态验证码">
    </div>
    <div class="mui-input-row number-box">
      <input type="text" placeholder="设置密码">
    </div>
    <div class="mui-input-row number-box">
      <input type="text" placeholder="确认密码">
    </div>
    <div class="mui-content-padded login-btn">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="getNext('two')">下一步</button>
    </div>
  </div>
  <div v-show="step == 'two'">
    <div class="mui-input-row label-input">
      <label>真实姓名：</label>
      <input type="text" placeholder="">
    </div>
    <div class="mui-input-row label-input">
      <label>服务公司：</label>
      <span class="label-text">习大大</span>
    </div>
    <div class="mui-input-row label-input">
      <label>服务门店：</label>
      <select class="mui-btn mui-btn-block">
        <option value="-1">请选择</option>
        <option value="item.id" v-for="item in storesArr">{{item.name}}</option>
      </select>
    </div>
    <div class="mui-input-row label-input">
      <label>上传名片：</label>
      <img src="/images/cbd.jpg">
    </div>
    <div class="mui-content-padded login-btn register-btn">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block">提交</button>
    </div>
  </div>
</div>
</template>
<script>
let model
export default {
  data () {
    return {
      step: 'one',
      storesArr: [
        {
          id: 1,
          name: '大红门店'
        },
        {
          id: 2,
          name: '学院路店'
        },
        {
          id: 3,
          name: '展厅店'
        }
      ]
    }
  },
  methods: {
    init: function () {
    },
    // 下一步
    getNext: function (str) {
      model.step = str
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
.login-box{
  background-color: #fff;
  padding: 20px;
}
.login-box h3{
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
  color: #7e7e7e;
}
.number-box{
  margin-bottom: 20px;
}
.login-box input{
  height: 50px;
  line-height: 50px;
  border-color: #e3e4e8;
  border-radius: 3px;
  font-size: 16px;
  color: #a3a3a3;
  margin: 0;
}
.mui-content-padded{
  margin: 20px 0;
}
.mui-content-padded button{
  height: 50px;
  font-size: 16px;
}
.login-btn button,
.register-btn button{
  background-color: #4e73cd;
  color: #aab8e4;
}
.label-input{
  margin-bottom: 10px;
}
.label-input label{
  position: relative;
  top: 5px;
  width: 28% !important;
  padding: 10px 0 !important;
}
.label-text{
  position: relative;
  top: 10px;
}
.label-input input{
  border: 1px solid #e3e4e8 !important;
  width: 72% !important;
  padding: 0 15px !important;
  border-radius: 3px !important;
  height: 50px !important;
}
.label-input .mui-btn-block{
  border: 1px solid #e3e4e8 !important;
  width: 72% !important;
  height: 50px !important;
}
.label-input img{
  position: relative;
  top: 10px;
  width: 160px;
  height: 100px;
}
.register-btn button{
  margin-top: 50px;
}
</style>
