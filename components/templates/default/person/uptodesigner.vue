<template>
<div class="login-box">
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
      <option value="item.id" v-for="item in storesArr">{{item.st_name}}</option>
    </select>
  </div>
  <div class="mui-input-row label-input" style="height: 110px;">
    <label>上传名片：</label>
    <span class="upload-box" id="upload_com" @click="upload_com()">
      <span class="add-btn">
        <i class="fa fa-plus add-icon"></i>
      </span>
      <input class="hidden" type="file" name="files">
    </span>
  </div>
  <div class="mui-content-padded login-btn">
    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="upDesignBtn()">提交</button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let url = require('url')
let Cookies = require('js-cookie')
let ESVal = require('es-validate')
let $ = require('jquery')
let model
let token
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
      linkPath: '',
      storesArr: [],
      comname: '',
      info: {
        relname: '',
        store: -1,
        img: ''
      }
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      token = Cookies.get('dpjia-hall-token')
      if (!token) {
        window.location.href = model.linkPath + '/login'
      }
      model.comname = Cookies.get('com-name')
      token = Cookies.get('dpjia-hall-token')
      model.getStore()
    },

    // 获取当前公司下门店列表
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
            Cookies.set('dpjia-hall-token', '')
            window.location.reload()
          }, 2000)
        }
      })
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
            mutiple: '0'
          },
          crossDomain: true,
          headers: {
            'X-DP-Key': '7748955b16d6f1a02be76db2773dd316',
            'X-DP-ID': '7748955b16d6f1a0'
          },
          success: function (data) {
            $input.unwrap()
            var img = '<img src="' + data.url + '">'
            $('#upload_com').find('img').remove()
            $('#upload_com').append(img)
            model.info.img = data.url
          },
          error: function (error) {
            console.log(error)
          }
        })
      })
    },

    // 提交升级成设计师信息
    upDesignBtn: function () {
      let upgrade = Cookies.get('can-upgrade')
      if (upgrade === 'no') {
        window.mui.toast('您已经是销售设计师了，暂时不能同时成为两家销售设计师!')
        return false
      }
      if (!model.validateForm(model.info)) {
        return false
      }
      let param = {
        per_img: model.info.img,
        com_id: this.$store.state.comid,
        realname: model.info.relname
      }
      axios.put('users/users_to_designer', param, {
        headers: {
          'X-DP-Token': token
        }
      }).then(function () {
        window.mui.toast('升级成功!')
        setTimeout(function () {
          window.location.href = model.linkPath + '/person'
        }, 1000)
      }).catch(function () {
        window.mui.toast('升级失败!')
      })
    },

    // 信息验证
    validateForm (data) {
      let result = ESVal.validate(data, {
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
  margin-top: 44px;
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
  top: 14px;
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
