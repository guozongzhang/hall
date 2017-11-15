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
      <a href="javascript:;" id="getverify" @click="getVerify()">{{verify}}</a>
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
    <div class="mui-input-row label-input" style="height: 110px;">
      <label>上传名片：</label>
      <span class="upload-box" id="upload_com">
        <span class="add-btn" @click="upload_com()">
          <i class="fa fa-plus add-icon"></i>
        </span>
        <input class="hidden" type="file" name="files">
      </span>
    </div>
    <div class="mui-content-padded login-btn register-btn">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block">提交</button>
    </div>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let $ = require('jquery')
let model
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
      verify: '获取动态密码',
      verifyState: false,
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

    // 获取动态密码
    getVerify: function () {
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

    // 下一步
    getNext: function (str) {
      model.step = str
    },

    // 上传图片
    upload_com: function () {
      var url = 'http://192.168.1.120/openapi/api/1.0/upload'
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
            mutiple: '0'
          },
          crossDomain: true,
          headers: {
            'X-DP-Key': '222',
            'X-DP-ID': '111',
            'X-DP-Token': 'd9cf5249ed675b1ee387397ec853e86f'
          },
          success: function (data) {
            $input.unwrap()
            var img = '<img src="' + data.url + '">'
            $('#upload_com').find('img').remove()
            $('#upload_com').append(img)
          },
          error: function (error) {
            console.log(error)
          }
        })
      })
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
  top: 10px;
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
