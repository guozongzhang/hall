<template>
<div class="login-box">
  <p>
    您正在为账号
    <a>18702760110</a>
    修改密码
  </p>
  <div class="mui-input-row number-box">
    <input type="text" placeholder="原密码" v-model="info.oldpwd">
  </div>
  <div class="mui-input-row number-box">
    <input type="text" placeholder="新密码" v-model="info.newpwd">
  </div>
  <div class="mui-input-row number-box">
    <input type="text" placeholder="确认新密码" v-model="info.conpwd">
  </div>
  <div class="mui-content-padded login-btn">
    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="editPwd()">确认修改</button>
  </div>
</div>
</template>
<script>
let model
export default {
  data () {
    return {
      info: {
        oldpwd: '',
        newpwd: '',
        conpwd: ''
      }
    }
  },
  methods: {
    init: function () {
    },

    // 确认修改密码
    editPwd: function () {
      console.log(model.info)
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
  padding: 0 20px;
}
.login-box p{
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #7e7e7e;
  margin: 0;
}
.number-box{
  margin-bottom: 20px;
}
.login-box input{
  height: 44px;
  line-height: 44px;
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
  height: 44px;
  line-height: 12px;
  font-size: 16px;
}
.login-btn button{
  background-color: #4e73cd;
  color: #fff;
}
</style>
