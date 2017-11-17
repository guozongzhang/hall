<template>
<div class="login-box">
  <p>
    您正在为账号
    <a>{{mobile}}</a>
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
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let $ = require('jquery')
let _ = require('underscore')
let ESVal = require('es-validate')
let model
export default {
  data () {
    return {
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
      let token = Cookies.get('dpjia-hall-token')
      if (!_.isEmpty($.trim(token))) {
        model.loginstate = true
        model.getPersonInfo(token)
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
      }).catch(function () {
        window.mui.toast('获取数据失败!')
      })
    },

    // 确认修改密码
    editPwd: function () {
      if (!model.validateForm(model.info)) {
        return false
      }
      let param = model.info
      axios.get('', {
        params: param
      }).then(function () {
        window.mui.toast('修改密码成功!')
      }).catch(function () {
        window.mui.toast('修改密码失败!')
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
