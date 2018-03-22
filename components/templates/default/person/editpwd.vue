<template>
<div class="login-box">
  <p>
    您正在为账号
    <a>{{mobile}}</a>
    修改密码
  </p>
  <div class="mui-input-row number-box">
    <input type="password" placeholder="原密码" v-model="info.oldpwd">
  </div>
  <div class="mui-input-row number-box">
    <input type="password" class="newpwd" placeholder="新密码" v-model="info.newpwd" @blur="verLength()">
  </div>
  <div class="mui-input-row number-box">
    <input type="password" placeholder="确认新密码" v-model="info.conpwd">
  </div>
  <div class="mui-content-padded login-btn">
    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="editPwd()">确认修改</button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let url = require('url')
let Cookies = require('js-cookie')
let $ = require('jquery')
let _ = require('underscore')
let ESVal = require('es-validate')
let model
let token
export default {
  data () {
    return {
      linkPath: '',
      mobile: '',
      info: {
        oldpwd: '',
        newpwd: '',
        conpwd: ''
      }
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      token = Cookies.get('dpjia-hall-token')
      if (!_.isEmpty($.trim(token))) {
        model.loginstate = true
        model.getPersonInfo(token)
      } else {
        window.location.href = model.linkPath + '/login'
      }
    },

    // 获取个人信息
    getPersonInfo: function (token) {
      axios.get('users/cloud_personal?com_id=' + this.$store.state.comid, {
        headers: {
          'X-DP-Token': token
        }
      }).then(function (data) {
        model.mobile = data.data.mobile
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
      })
    },

    // 检验密码长度
    verLength: function () {
      if (($.trim(model.info.newpwd)).length < 6) {
        window.mui.toast('密码长度必须大于6个字符!')
        $('.newpwd').focus()
        return false
      }
    },

    // 确认修改密码
    editPwd: function () {
      if (!model.validateForm(model.info)) {
        return false
      }
      if (String($.trim(model.info.newpwd)) !== String($.trim(model.info.conpwd))) {
        window.mui.toast('确认密码错误!')
        $('.newpwd').focus()
        return
      }
      let param = {
        old_password: model.info.oldpwd,
        new_password: model.info.newpwd
      }
      axios.put('users/resetPassword', param, {
        headers: {
          'X-DP-Token': token
        }
      }).then(function () {
        window.mui.toast('修改密码成功!')
        setTimeout(function () {
          window.location.href = model.linkPath + '/person'
        }, 1000)
      }).catch(function () {
        window.mui.toast('原密码输入错误!')
      })
    },

    // 信息验证
    validateForm (data) {
      let result = ESVal.validate(data, {
        oldpwd: {
          required: true,
          msg: '原密码不能为空!'
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
  padding: 0 20px;
}
.login-box p{
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #7e7e7e;
  margin: 0;
  font-size: 12px;
}
.number-box{
  margin-bottom: 20px;
}
.login-box input{
  height: 44px;
  line-height: 44px;
  border-color: #e3e4e8;
  border-radius: 3px;
  font-size: 14px;
  color: #a3a3a3;
  margin: 0;
}
.mui-content-padded{
  margin: 20px 0;
}
.mui-content-padded button{
  height: 44px;
  line-height: 12px;
  font-size: 14px;
}
.login-btn button{
  background-color: #4e73cd;
  color: #fff;
}
</style>
