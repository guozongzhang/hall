<template>
<div class="login-box">
  <div class="mui-content-padded">
    <h3>{{comName}}云展厅</h3>
  </div>
  <div v-show="type == 'number'">
    <div class="mui-input-row number-box">
      <input type="text" v-model="info.number" placeholder="搭配家账号">
      <span class="has-data" v-show="info.number.length > 0"></span>
    </div>
    <div class="mui-input-row mui-password">
      <input type="password" v-model="info.pwd" placeholder="密码" @focus="onFocus()">
      <span class="has-data" v-show="info.pwd.length > 0 && isfocus"></span>
      <span class="has-data clear-data" v-show="info.pwd.length > 0 && !isfocus" @click="clearData()"></span>
    </div>
    <div class="pwd-box">
      <div class="mui-input-row mui-checkbox mui-left" @click="remeberMe()">
        <label>记住密码</label>
        <span class="remeber" v-bind:class="info.remeber ? 'active' : ''"></span>
      </div>
      <a :href="linkPath + '/forgetpwd'" class="forget-pwd">忘记密码</a>
    </div>
  </div>
  <div v-show="type == 'phone'">
     <div class="mui-input-row number-box">
      <input type="text" v-model="info.phone" placeholder="手机号码">
    </div>
    <div class="mui-input-row mui-password">
      <input type="text" v-model="info.verify" placeholder="动态密码">
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
</div>
</template>
<script>
import axios from '~/plugins/axios'
let url = require('url')
let Cookies = require('js-cookie')
let $ = require('jquery')
let _ = require('underscore')
let model
let startTime = 60
export default {
  data () {
    return {
      comName: '',
      linkPath: '',
      type: 'number',
      subBtnText: '手机验证码登录',
      verify: '获取动态密码',
      verifyState: false,
      isfocus: false,
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
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let rem = Cookies.get('dpjia-hall-remeber')
      model.info.remeber = rem
      model.getCompany()
    },

    // 获取公司名称
    getCompany: function () {
      let param = {
        where: {
          com_id: this.$store.state.comid
        },
        keys: 'id,com_name,full_name'
      }
      axios.get('classes/companys', {
        params: param
      }).then(function (data) {
        Cookies.set('com-name', data.data.items[0].com_name)
        model.comName = data.data.items[0].com_name
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.reload()
          }, 2000)
        }
      })
    },

    // 清除密码数据
    clearData: function () {
      model.info.pwd = ''
    },

    // 聚焦密码输入
    onFocus: function () {
      model.isfocus = false
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
      model.getSms()
    },

    // 单纯获取验证码（验证手机号已经注册过）
    getSms: function () {
      if (!model.verifyState) {
        axios.get('requestSmsCode/send_sms', {
          params: {
            type: 'web',
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

    // 记住我
    remeberMe: function () {
      model.info.remeber = !model.info.remeber
    },

    // 切换登录方式
    switchLogin: function () {
      model.type = model.type === 'number' ? 'phone' : 'number'
      model.subBtnText = model.type === 'number' ? '手机验证码登录' : '账号登录'
    },

    // 登录
    loginBtn: function () {
      // 账号登录
      if (model.type === 'number') {
        if (_.isEmpty($.trim(model.info.number))) {
          window.mui.toast('账号不能为空!')
          return false
        }
        if (_.isEmpty($.trim(model.info.pwd))) {
          window.mui.toast('密码不能为空!')
          return false
        }
      } else {
        // 手机验证码
        if (_.isEmpty($.trim(model.info.phone))) {
          window.mui.toast('手机号不能为空!')
          return false
        }
        if (_.isEmpty($.trim(model.info.verify))) {
          window.mui.toast('动态密码不能为空!')
          return false
        }
      }
      let obj
      // 账号
      if (model.type === 'number') {
        obj = {
          username: model.info.number,
          password: model.info.pwd
        }
        axios.get('users/login', {
          params: obj
        }).then(function (data) {
          model.hadLogin(data.data)
        }).catch(function (msg) {
          window.mui.toast('登录失败!')
        })
      } else {
        // 手机号
        obj = {
          mobile: model.info.phone,
          code: model.info.verify
        }
        axios.get('users/cloud_login', {
          params: obj
        }).then(function (data) {
          model.hadLogin(data.data)
        }).catch(function (msg) {
          window.mui.toast('登录失败!')
        })
      }
    },

    // 登录成功
    hadLogin: function (data) {
      Cookies.set('dpjia-hall-token', data.token)
      if (model.info.remeber) {
        Cookies.set('dpjia-hall-remeber', true)
      } else {
        Cookies.set('dpjia-hall-remeber', '')
      }
      window.mui.toast('登录成功!')
      Cookies.set('designer-id', data.user_poi_users)
      setTimeout(function () {
        window.location.href = model.linkPath + '/'
      }, 1000)
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style scoped>
.login-box{
  background-color: #fff;
  padding: 20px;
}
.login-box h3{
  margin-top: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #7e7e7e;
}
.number-box{
  position: relative;
  margin-bottom: 20px;
}
.has-data{
  position: absolute;
  right: 12px;
  top: 12px;
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/images/login.png') no-repeat;
  background-size: 242px;
  background-position: -149px -19px;
  cursor: pointer;
}
.remeber{
  position: absolute;
  left: 4px;
  top: 10px;
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/images/login.png') no-repeat;
  background-size: 242px;
  background-position: -69px -19px;
  cursor: pointer;
}
.remeber.active{
  background-position: -109px -19px;
}
.clear-data{
  background-position: -188px -19px;
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
  top: 12px;
  right: 14px;
  font-size: 15px;
  color: #7e7e7e;
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
  width: 42px;
  height: 42px;
  background: url('/images/login.png') no-repeat;
  background-size: 242px;
  background-position: -12px -8px;
  cursor: pointer;
}
</style>
