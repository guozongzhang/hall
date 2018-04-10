<template>
<div class="bindphone-box">
  <div class="phone-icon">
    <span class="phone-img"></span>
  </div>
  <div class="no-bind normal-style" v-if="step == 'inputmobile'">
    <h4>您还没有绑定手机号</h4>
    <p>绑定手机号,可以和已有账号进行同步,提高安全性</p>
    <ul>
      <li>● 若该手机号还没有注册,则先为您注册</li>
      <li>● 若该手机号已注册,则进行验证和绑定</li>
    </ul>
    <div class="input-box">
      <div class="mui-input-row number-box">
        <input type="text" placeholder="手机号" v-model="info.mobile">
      </div>
      <div class="mui-input-row number-box">
        <input type="text" placeholder="动态密码" v-model="info.verify">
        <a href="javascript:;" id="getverify" @click="getVerify()">{{verify}}</a>
      </div>
    </div>
    <div class="mui-content-padded submit-btn">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="submitData()">提交验证</button>
    </div>
  </div>
  <div class="set-pwd normal-style" v-if="step == 'setpwd'">
    <p>
      您输入的手机号
      <a class="mobile-number">{{info.mobile}}</a>
      暂为注册
    </p>
    <span>请设置密码,现在为您注册</span>
    <div class="input-box">
      <div class="mui-input-row">
        <input type="password" v-model="info.pwd" placeholder="设置密码">
      </div>
      <div class="mui-input-row">
        <input type="password" v-model="info.repwd" placeholder="确认密码">
      </div>
    </div>
    <div class="btn-box">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-outlined" @click="cancelBtn()">取消</button>
      <button type="button" class="mui-btn mui-btn-royal" @click="getNext()">下一步</button>
    </div>
  </div>
  <div class="sure-bind normal-style" v-if="step == 'surebind'">
    <div class="sure-info">
      <p class="sure-title">
        您输入的手机号
        <a class="mobile-number">{{info.mobile}}</a>
        已经注册
      </p>
      <p class="sub-info">账号:yuguo6211</p>
      <p class="sub-info">身份:普通用户</p>
      <p class="sub-info">归属:嘉利信得大红门店</p>
    </div>
    <div class="bind-box">
      <h4>确认与当前微信账号绑定吗?</h4>
      <div class="mui-content-padded sure-btn">
        <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="bindMobile()">确认绑定</button>
      </div>
      <div class="mui-content-padded cancel-btn">
        <button type="button" class="mui-btn mui-btn-block" @click="noBind()">暂不绑定</button>
      </div> 
    </div>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let url = require('url')
let $ = require('jquery')
let _ = require('underscore')
let model
let startTime = 60
export default {
  data () {
    return {
      linkPath: '',
      step: 'inputmobile',
      verify: '获取动态密码',
      verifyState: false,
      info: {
        mobile: '',
        verify: '',
        pwd: '',
        repwd: ''
      }
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let token = Cookies.get('dpjia-hall-token-' + process.env.port)
      if (!token) {
        window.location.href = model.linkPath + '/login'
      }
    },

    // 获取动态密码
    getVerify: function () {
      if (_.isEmpty($.trim(model.info.mobile))) {
        window.mui.toast('手机号不能为空!')
        return false
      }
      if (!(/^1(3|4|5|7|8)\d{9}$/.test($.trim(model.info.mobile)))) {
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

    // 提交验证
    submitData: function () {
      model.step = 'setpwd'
      let param = {}
      axios.get('', {
        params: param
      }).then(function (data) {
        model.step = 'setpwd'
      }).catch(function () {
        window.mui.toast('验证失败!')
      })
    },

    // 下一步
    getNext: function () {
      model.step = 'surebind'
    },

    // 取消
    cancelBtn: function () {
      model.step = 'inputmobile'
    },

    // 绑定
    bindMobile: function () {
      console.log(model.info)
    },

    // 暂不绑定
    noBind: function () {
      console.log()
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
.bindphone-box {
  background-color: #fff;
}
.phone-icon{
  padding: 30px 0;
  height: 196px;
}
.phone-icon .phone-img{
  display: block;
  width: 136px;
  height: 136px;
  margin: 0 auto;
  background: url('/images/person.png') no-repeat;
  background-size: 499px;
  background-position: -23px -15px;
}
.normal-style{
  text-align: center;
}
.normal-style h4{
  color: #050505;
  margin-bottom: 10px;
}
.normal-style p{
  font-size: 15px;
  color: #7e7e7e;
  margin: 0;
}
.set-pwd p{
  color: #050505;
  margin-bottom: 6px;
}
.set-pwd p a{
  color: #5175ce;
  text-decoration: none;
}
.set-pwd span{
  color: #7e7e7e;
  font-size: 14px;
}
.sure-bind .sub-info{
  text-align: left;
  color: #7e7e7e;
  font-size: 14px;
  padding: 0 40px;
}
.sure-info{
  margin: 0 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ababab;
}
.sure-bind .sure-title{
  color: #050505;
}
.normal-style ul{
  margin: 0;
  padding: 0;
}
.normal-style ul li{
  color: #7e7e7e;
  font-size: 15px;
}
.input-box{
  margin: 25px 0 10px 0;
  padding: 0 20px;
}
.input-box input{
  height: 44px !important;
}
#getverify{
  position: absolute;
  top: 12px;
  right: 14px;
  font-size: 15px;
  color: #7e7e7e;
}
.submit-btn{
  margin: 0;
  padding: 0 20px;
}
.submit-btn button{
  height: 44px;
  line-height: 12px;
  background-color: #4e73cd;
  color: #fff;
  font-size: 15px;
}
.btn-box{
  padding: 0 20px;
  height: 84px;
}
.btn-box button{
  width: 150px;
  height: 44px;
}
.btn-box .mui-btn-outlined{
  border-color: #4e73cd;
  color: #4e73cd;
  background-color: #fff;
  float: left;
}
.btn-box .mui-btn-royal{
  color: #fff;
  background-color: #4e73cd;
  float: right;
}
.bind-box{
  padding: 0 20px;
}
.bind-box h4{
  margin-top: 30px;
  font-size: 15px;
  color: #050505;
  text-align: center;
  font-weight: 600;
}
.bind-box button{
  height: 44px;
  line-height: 12px;
  font-size: 15px;
  margin: 15px 0;
}
.sure-btn button{
  background-color: #4e73cd;
}
.cancel-btn button{
  border-color: #4e73cd;
  color: #4e73cd;
}
</style>
