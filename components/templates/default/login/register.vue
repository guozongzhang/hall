<template>
<div class="login-box">
  <div class="mui-content-padded">
    <h3>注册新账号</h3>
  </div>
  <div v-show="step == 'one'">
    <div class="mui-input-row number-box">
      <input type="text" v-model="info.phone" placeholder="手机号">
    </div>
    <div class="mui-input-row number-box">
      <input type="text" v-model="info.verify" placeholder="动态验证码">
      <a href="javascript:;" id="getverify" @click="getVerify()">{{verify}}</a>
    </div>
    <div class="mui-input-row number-box">
      <input class="newpwd" type="password" placeholder="设置密码" v-model="info.newpwd" @blur="verLength()">
    </div>
    <div class="mui-input-row number-box">
      <input type="password" placeholder="确认密码" v-model="info.conpwd">
    </div>
    <div class="mui-content-padded login-btn">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="getNext('two')">下一步</button>
    </div>
  </div>
  <div v-show="step == 'two'">
    <div class="mui-input-row label-input">
      <label>真实姓名：</label>
      <input type="text" placeholder="" v-model="info.relname">
    </div>
    <div class="mui-input-row label-input">
      <label>服务公司：</label>
      <span class="label-text">{{comname}}</span>
    </div>
    <div class="mui-input-row label-input">
      <label>服务门店：</label>
      <select class="mui-btn mui-btn-block" v-model="info.store">
        <option value="-1">请选择</option>
        <option v-bind:value="item.id" v-for="item in storesArr">{{item.st_name}}</option>
      </select>
    </div>
    <div class="mui-input-row label-input" style="height: 110px;">
      <label>上传名片：</label>
      <span class="upload-box" id="upload_com" @click="upload_com()">
        <span class="add-btn">
          <i class="fa fa-plus add-icon"></i>
        </span>
        <input class="hidden" type="file" accept="image/*" capture="camera" name="files[]" v-if="!isPhone" multiple>
        <input class="hidden" type="file" accept="image/*" name="files[]" v-if="isPhone" multiple>
      </span>
    </div>
    <div class="mui-content-padded login-btn register-btn">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="registerBtn()">提交</button>
    </div>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let url = require('url')
let Cookies = require('js-cookie')
let ESVal = require('es-validate')
let $ = require('jquery')
let _ = require('underscore')
let model
let myURL
let startTime = 60
export default {
  head () {
    return {
      script: [
        { src: '/js/jquery.min.js' },
        { src: '/js/jquery.form.js' }
      ]
    }
  },
  data () {
    return {
      isPhone: false,
      linkPath: '',
      verify: '获取动态密码',
      verifyState: false,
      info: {
        phone: '',
        verify: '',
        newpwd: '',
        conpwd: '',
        relname: '',
        store: -1,
        img: ''
      },
      step: 'one',
      comname: '',
      storesArr: []
    }
  },
  methods: {
    init: function () {
      myURL = url.parse(window.location.href)
      Cookies.set('dpjia-exhibite-' + window.location.port, '')
      model.isPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      model.getCompany()
      model.getStore()
    },

    // 获取公司信息
    getCompany: function () {
      let param = {
        where: {
          com_id: this.$store.state.comid
        },
        keys: 'id,com_name'
      }
      axios.get('classes/companys', {
        params: param
      }).then(function (data) {
        model.comname = data.data.items[0].com_name
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token-' + window.location.port, '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
      })
    },

    // 获取门店列表
    getStore: function () {
      let param = {
        where: {
          com_id_poi_companys: this.$store.state.comid,
          st_stores_states_new: 'sales'
        },
        keys: 'id,st_name'
      }
      axios.get('classes/company_stores', {
        params: param
      }).then(function (data) {
        model.storesArr = data.data.items
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token-' + window.location.port, '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
      })
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
      axios.get('classes/users', {
        params: {
          where: {
            u_mobile: model.info.phone
          }
        }
      }).then(function (data) {
        if (data.data.items.length > 0) {
          window.mui.toast('该手机号已经注册过,可以直接登录!')
        } else {
          model.getSms()
        }
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token-' + window.location.port, '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
      })
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

    // 检验密码长度
    verLength: function () {
      if (($.trim(model.info.newpwd)).length < 6) {
        window.mui.toast('密码长度必须大于6个字符!')
        $('.newpwd').focus()
        return false
      }
    },

    // 下一步
    getNext: function (str) {
      // 下一步验证
      if (!model.nextValidateForm(model.info)) {
        return false
      }
      if (String($.trim(model.info.newpwd)) !== String($.trim(model.info.conpwd))) {
        window.mui.toast('确认密码错误!')
        $('.newpwd').focus()
        return
      }
      model.step = str
    },

    // 下一步信息验证
    nextValidateForm (data) {
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
    },

    // 上传图片
    upload_com: function () {
      var url = process.env.baseUrl + 'upload' || 'http://192.168.1.120/openapi/api/1.0/upload'
      var $input = $('#upload_com').find('input')
      $input.unbind().click()
      $input.unbind().change(function () {
        if ($input.val() === '') {
          return false
        }
        var form = $("<form class='uploadform' method='post' enctype='multipart/form-data' action='" + url + "'></form>")
        $input.wrap(form)
        window.$('#upload_com').find('form').ajaxSubmit({
          type: 'post',
          url: url,
          data: {
            mode: 'image',
            mutiple: '1'
          },
          crossDomain: true,
          headers: {
            'X-DP-Key': '7748955b16d6f1a02be76db2773dd316',
            'X-DP-ID': '7748955b16d6f1a0'
          },
          success: function (data) {
            $input.unwrap()
            var img = '<img src="' + data[0].url + '">'
            $('#upload_com').find('img').remove()
            $('#upload_com').append(img)
            model.info.img = data[0].url
          },
          error: function (error) {
            window.mui.toast('上传失败!')
            $input.unwrap()
            console.log(error)
          }
        })
      })
    },

    // 提交注册
    registerBtn: function () {
      if (!model.validateForm(model.info)) {
        return false
      }
      let param = {
        mobile: model.info.phone,
        password: model.info.newpwd,
        code: model.info.verify,
        designer_type: 'seller',
        ui_name: model.info.relname,
        com_id_poi_companys: this.$store.state.comid,
        designer_url: model.info.img || '',
        st_id: model.info.store
      }
      axios.post('users/signUpBySmsCode', param).then(function (data) {
        Cookies.set('dpjia-hall-token-' + window.location.port, data.data.token, {domain: '.dpjia.com'})
        window.mui.toast('注册成功!')
        let isExibite = Cookies.get('dpjia-exhibite-flag-' + window.location.port)
        setTimeout(function () {
          if (isExibite === 'yes') {
            let preurl = Cookies.get('dpjia-preurl-' + window.location.port)
            window.location.href = preurl
          } else {
            window.location.href = model.linkPath + '/'
          }
        }, 1000)
      }).catch(function (error) {
        window.mui.toast(error.response.data.message)
      })
    },

    // 提交信息验证
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
        },
        relname: {
          required: true,
          msg: '真实姓名不能为空!'
        },
        store: {
          notEqualTo: -1,
          msg: '请选择服务门店!'
        },
        img: {
          required: true,
          msg: '请上传个人名片!'
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
.login-btn button,
.register-btn button{
  background-color: #4e73cd;
  color: #fff;
}
.label-input{
  margin-bottom: 10px;
}
.label-input label{
  position: relative;
  top: 5px;
  font-size: 16px;
  width: 24% !important;
  padding: 10px 0 !important;
}
.label-text{
  position: relative;
  top: 13px;
}
.label-input input{
  border: 1px solid #e3e4e8 !important;
  width: 76% !important;
  padding: 0 15px !important;
  border-radius: 3px !important;
  height: 44px !important;
}
.label-input .mui-btn-block{
  border: 1px solid #e3e4e8 !important;
  width: 76% !important;
  height: 44px !important;
}
.label-input img{
  position: relative;
  top: -30px;
  width: 160px;
  height: 100px;
}
.register-btn button{
  margin-top: 44px;
}
.upload-box{
  position: relative;
  top: 10px;
  display: inline-block;
  width: 160px;
  height: 100px;
  text-align: center;
  background-color: #f3f3f3;
  cursor: pointer;
}
.upload-box .add-icon{
  position: relative;
  top: 38px;
  font-size: 30px;
  color: #bebebe;
}
.hidden{
  display: none;
}
</style>
