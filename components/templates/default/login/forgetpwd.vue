<template>
<div class="login-box">
  <div class="mui-content-padded">
    <h3>重置密码</h3>
  </div>
  <div class="mui-input-row number-box">
    <input type="text" placeholder="手机号" v-model="info.phone">
  </div>
  <div class="mui-input-row number-box">
    <input type="text" placeholder="动态验证码" v-model="info.verify">
    <a href="javascript:;" id="getverify" @click="getVerify()">{{verify}}</a>
  </div>
  <div class="mui-input-row number-box">
    <input type="text" placeholder="设置新密码" v-model="info.newpwd">
  </div>
  <div class="mui-input-row number-box">
    <input type="text" placeholder="确认新密码" v-model="info.conpwd">
  </div>
  <div class="mui-content-padded login-btn">
    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="resetPwd()">确认重置密码</button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let ESVal = require('es-validate')
let $ = require('jquery')
let _ = require('underscore')
let model
let startTime = 60
export default {
  data () {
    return {
      verify: '获取动态密码',
      verifyState: false,
      info: {
        phone: '',
        verify: '',
        newpwd: '',
        conpwd: ''
      }
    }
  },
  methods: {
    init: function () {
    },

    // 获取动态密码
    getVerify: function () {
      if (_.isEmpty($.trim(model.info.phone))) {
        window.mui.toast('手机号不能为空!')
        return false
      }
      if (!(/^1(3|4|5|7|8)\d{9}$/.test($.trim(model.info.phone)))) {
        window.mui.toast('手机号格式错误!')
        return false
      }
      if (!model.verifyState) {
        axios.get('requestSmsCode/sms', {
          params: {
            type: 'admin',
            mobile: model.info.phone
          }
        }).then(function () {
          model.verifyState = true
          model.countdowntime()
          window.mui.toast('验证码发送成功!')
        }).catch(function () {
          window.mui.toast('验证码发送失败!')
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

    // 重置密码
    resetPwd: function () {
      if (!model.validateForm(model.info)) {
        return false
      }
      let param = model.info
      axios.get('', {
        params: param
      }).then(function () {
        window.mui.toast('重置密码成功!')
      }).catch(function () {
        window.mui.toast('重置密码失败!')
      })
    },

    // 信息验证
    validateForm (data) {
      let result = ESVal.validate(data, {
        phone: {
          required: true,
          msg: '手机号不能为空!'
        },
        verify: {
          required: true,
          msg: '验证码不能为空!'
        },
        newpwd: {
          required: true,
          msg: '密码不能为空!'
        },
        conpwd: {
          required: true,
          msg: '确认密码不能为空!'
        }
      })
      if (!result.status) {
        window.mui.toast(result.msg)
      }
      return result.status
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
  margin-top: 22px;
  margin-bottom: 20px;
  text-align: center;
  color: #7e7e7e;
}
.number-box{
  margin-bottom: 20px;
}
#getverify{
  position: absolute;
  top: 12px;
  right: 14px;
  font-size: 15px;
  color: #7e7e7e;
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
