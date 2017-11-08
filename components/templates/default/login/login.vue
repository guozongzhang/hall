<template>
<div class="login-box">
  <div class="mui-content-padded">
    <h3>登录搭配家云商城</h3>
  </div>
  <div v-show="type == 'number'">
    <div class="mui-input-row number-box">
      <input type="text" v-model="info.number" placeholder="搭配家账号">
    </div>
    <div class="mui-input-row mui-password">
      <input type="password" v-model="info.pwd" placeholder="密码">
    </div>
    <div class="pwd-box">
      <div class="mui-input-row mui-checkbox mui-left">
        <label>记住密码</label>
        <input name="checkbox" value="true" v-model="info.remeber" type="checkbox" >
      </div>
      <a href="#" class="forget-pwd">忘记密码</a>
    </div>
  </div>
  <div v-show="type == 'phone'">
     <div class="mui-input-row number-box">
      <input type="text" v-model="info.phone" placeholder="手机号码">
    </div>
    <div class="mui-input-row mui-password">
      <input type="password" v-model="info.verify" placeholder="动态密码">
      <a href="javascript:;" id="getverify" @click="getVerify()">{{verify}}</a>
    </div>
  </div>
  <div class="mui-content-padded login-btn">
    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="loginBtn()">登录</button>
  </div>
  <p class="or">或</p>
  <div class="mui-content-padded phone-btn">
    <button type="button" class="mui-btn mui-btn-block" @click="switchLogin()">{{subBtnText}}</button>
  </div>
  <div class="wechat-login">
    <a href="">
      <i class="fa fa-weixin"></i>
    </a>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let model
let startTime = 60
export default {
  data () {
    return {
      type: 'number',
      subBtnText: '手机验证码登录',
      verify: '获取动态密码',
      verifyState: false,
      info: {
        number: '',
        pwd: '',
        phone: '',
        verify: '',
        remeber: false
      }
    }
  },
  methods: {
    init: function () {
    },

    // 获取动态密码
    getVerify: function () {
      if (!model.verifyState) {
        axios.get('requestSmsCode/sms', {
          params: {
            type: 'admin',
            mobile: model.info.phone
          }
        }).then(function (response) {
          model.verifyState = true
          model.countdowntime()
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
      }
    },

    // 倒计时函数
    countdowntime: function () {
      var time = setTimeout(this.countdowntime, 1000)
      if (startTime === 0) {
        clearTimeout(time)
        model.verify = '获取动态密码'
        startTime = 60
        model.verifyState = false
        return false
      } else {
        startTime--
      }
      model.verify = startTime + 's后重新获取'
    },

    // 切换登录方式
    switchLogin: function () {
      model.type = model.type === 'number' ? 'phone' : 'number'
      model.subBtnText = model.type === 'number' ? '手机验证码登录' : '账号登录'
    },

    // 登录
    loginBtn: function () {
      let obj
      if (model.type === 'number') {
        obj = {
          number: model.info.number,
          pwd: model.info.pwd,
          remeber: model.info.remeber
        }
      } else {
        obj = {
          phone: model.info.phone,
          verify: model.info.verify
        }
      }
      console.log(obj)
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
.pwd-box{
  font-size: 14px;
  margin-top: 10px;
}
.pwd-box .forget-pwd{
  position: relative;
  top: 10px;
  right: 2px;
  float: right;
  color: #616161;
}
.mui-checkbox{
  display: inline-block;
}
.pwd-box .mui-checkbox label{
  position: relative;
  top: 4px;
  padding-left: 34px;
  color: #616161;
}
.pwd-box .mui-checkbox input[type=checkbox]{
  left: 0;
  top: 0;
}
#getverify{
  position: absolute;
  top: 15px;
  right: 14px;
  font-size: 15px;
  color: #7e7e7e;
}
.mui-content-padded{
  margin: 20px 0;
}
.mui-content-padded button{
  height: 50px;
  font-size: 16px;
}
.login-btn button{
  background-color: #4e73cd;
  color: #aab8e4;
}
.phone-btn button{

  border-color: #4e73cd;
  color: #5175ce;
}
.or{
  text-align: center;
}
.wechat-login{
  text-align: center;
  margin-top: 40px;
}
.wechat-login a{
  display: inline-block;
  width: 66px;
  height: 66px;
  text-align: center;
  border-radius: 100%;
  background-color: #3fd256;
}
.wechat-login a i{
  position: relative;
  top: 10px;
  font-size: 40px;
  color: #fff;
}
</style>
