<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a v-show="!isselect" class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">
      <span style="position: relative;top: -1px;">返回</span>
    </a>
    <a v-show="isselect" class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="gotoisselect()">
      <span style="position: relative;top: -1px;">返回</span>
    </a>
    <span class="fa close-icon" @click="goHome()">×</span>
    <h1 class="mui-title othertitle">编辑报备人信息</h1>
    <a class="mui-icon mui-pull-right save-btn" @click="confEditReport()">提交</a>
  </header>
  <div class="textarea-box" style="top:58px" v-show="isselect">
    <ul class="mui-table-view mui-table-view-chevron">
      <div class="reporter">
        <li class="mui-table-view-cell type-style"> 
          <div class="mui-radio cssradiodiv">
            <input type="radio" name="style" value="self" v-model="reporter.isself"/> 
            <label>自己</label>
          </div>
          <div class="mui-radio cssradiodiv">
            <input type="radio" name="style" value="other" v-model="reporter.isself"/> 
            <label>其他人</label>
          </div>
        </li>
      </div>
    </ul>
    <div class="mui-input-row sub-input-box">
      <input class="selectname" type="text" placeholder="输入姓名" v-bind:disabled="reporter.isself == 'self' ? true : false" v-model="reporter.name">
    </div>
  </div>  
  <div class="textarea-box" style="top:58px" v-show="!isselect">
    <div>
      <div class="mui-input-row sub-input-box" @click="selectstyle()">
        <label>报备人姓名</label>
        <span class="mui-navigate-right bbrname">{{reporter.name}}</span>
      </div>
      <div class="mui-input-row sub-input-box" v-bind:class="reporter.isself === 'self' ? 'selfbg' : ''">
        <label>联系电话</label>
        <input v-bind:disabled="reporter.isself === 'self' ? true : false" type="text" placeholder="输入联系电话" v-model="reporter.tel">
      </div>
      <div class="mui-input-row sub-input-box" v-bind:class="reporter.isself === 'self' ? 'selfbg' : ''">
        <label>联系邮箱</label>
        <input v-bind:disabled="reporter.isself === 'self' ? true : false" type="text" placeholder="输入联系邮箱" v-model="reporter.email">
      </div>
      <div class="mui-input-row sub-input-box">
        <label>项目关系</label>
        <input type="text" placeholder="输入项目关系务" v-model="reporter.relationship">
      </div>
      <div class="mui-input-row sub-input-box">
        <label>期望提成</label>
        <input type="number" placeholder="输入期望提成" v-model="reporter.commission">
      </div>
      <div class="mui-input-row sub-input-box">
        <label>项目优势</label>
        <input type="text" placeholder="输入项目优势" v-model="reporter.ascendancy">
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
import storage from '~/plugins/storage'
let url = require('url')
let Cookies = require('js-cookie')
let _ = require('underscore')
let model
let myURL
export default {
  props: ['report'],
  data () {
    return {
      linkPath: '',
      isselect: false,
      reporter: {
        id: 0,
        isself: '',
        name: '',
        user_poi_users: '',
        relationship: '',
        commission: '',
        ascendancy: '',
        tel: '',
        email: '',
        goback: false
      },
      clonereporter: {
        name: '',
        tel: '',
        email: ''
      }
    }
  },
  watch: {
    'report': function () {
      model.isselect = false
      model.reporter = _.extend(model.reporter, this.report)
      if (this.report.isself === 'other') {
        model.clonereporter = {
          name: _.clone(this.report.name),
          tel: _.clone(this.report.tel),
          email: _.clone(this.report.email)
        }
      } else {
        model.clonereporter = {
          name: '',
          tel: '',
          email: ''
        }
      }
    },
    'reporter.isself': function (data) {
      if (model.reporter.isself === 'self') {
        model.reporter.name = storage.get('userinfo').username
        model.reporter.tel = storage.get('userinfo').usertel
        model.reporter.email = storage.get('userinfo').useremail
      }
      if (model.reporter.isself === 'other') {
        model.reporter.name = model.clonereporter.name || ''
        model.reporter.tel = model.clonereporter.tel || ''
        model.reporter.email = model.clonereporter.email || ''
      }
    }
  },
  methods: {
    init: function () {
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    },

    // 返回云展廳首頁
    goHome: function () {
      window.location.href = model.linkPath + '/'
    },

    // 返回详情
    goBack: function () {
      model.reporter.goback = true
      model.$emit('getEditReport', model.reporter)
    },

    // 选择报备人类型
    selectstyle: function () {
      model.isselect = !model.isselect
    },

    // 查看是否返回
    gotoisselect: function () {
      model.isselect = false
      model.reporter = _.extend(model.reporter, this.report)
    },

    // 確定提交保存人信息
    confEditReport: function () {
      if (model.isselect) {
        if (model.reporter.isself === 'other' && model.reporter.name === '') {
          window.mui.toast('选择其他人，名字不能为空!')
          return
        }
        model.isselect = !model.isselect
        return
      }
      if (_.isEmpty(model.reporter.name)) {
        window.mui.toast('名字不能为空!')
        return
      }
      let telval = /^1[3|4|5|7|8][0-9]{9}$/
      if (!_.isEmpty(model.reporter.tel)) {
        if (!telval.test(model.reporter.tel)) {
          window.mui.toast('手机号格式错误!')
          return false
        }
      }
      let emailval = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (!_.isEmpty(model.reporter.email)) {
        if (!emailval.test(model.reporter.email)) {
          window.mui.toast('邮箱格式错误!')
          return false
        }
      }
      let param = {
        id: model.reporter.id,
        name: model.reporter.name || '',
        project_relation: model.reporter.relationship || '',
        royalties_expectation: model.reporter.commission || '',
        strengths: model.reporter.ascendancy || '',
        tel: model.reporter.tel,
        email: model.reporter.email,
        is_self: model.reporter.isself === 'self' ? 'yes' : 'no'
      }
      axios.put('functions/report/project_reportman', null, {
        data: param
      }).then(function (data) {
        model.reporter.goback = false
        model.$emit('getEditReport', model.reporter)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token-' + process.env.port, '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
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
.mui-icon-back:before, .mui-icon-left-nav:before{
  font-size: 20px !important;
}
.bbrname{
  display: inline-block;
  width: 66%;
  padding: 9px 5px 10px;
  text-align: right
}  
.selfbg{
  background: #f4f4f4
} 
.sub-input-box .selectname{
  border: 0;
  margin: 0;
  width: 100%;
  text-align: left;
  display: inline-block;
  padding: 9px 15px 10px 15px;
}
.mui-table-view-chevron {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.cssradiodiv {
  position: relative;
  float: left;
  width: 80px;
  line-height: 34px;
  height: 100%;
}
.cssradiodiv label{
  font-size: 14px;
  margin-left: 27px;
  padding-right: 20px;
}
.cssradiodiv input[type="radio"] {
  top: 9px;
  left: 0;
  width: 28px;
  height: 28px;
}
.cssradiodiv input[type="radio"]::before{
  font-size: 20px !important;
}
.type-style {
  padding: 0 10px;
  height: 40px;
}
</style>
