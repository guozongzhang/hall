<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">
      <span style="position: relative;top: -1px;">返回</span>
    </a>
    <span class="fa close-icon" @click="goHome()">×</span>
    <h1 class="mui-title othertitle">编辑报备人信息</h1>
    <a class="mui-icon mui-pull-right save-btn" @click="confEditReport()">提交</a>
  </header>
  <div class="textarea-box">
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
    <div>
      <div class="mui-input-row sub-input-box">
        <label>姓名</label>
        <input type="text" placeholder="输入姓名" v-model="reporter.name">
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
      <div class="mui-input-row sub-input-box">
        <label>联系电话</label>
        <input type="text" placeholder="输入联系电话" v-model="reporter.tel">
      </div>
      <div class="mui-input-row sub-input-box">
        <label>联系邮箱</label>
        <input type="text" placeholder="输入联系邮箱" v-model="reporter.email">
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
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
      reporter: {},
      newdata: {
        id: 0,
        isself: '',
        name: '',
        relationship: '',
        commission: '',
        ascendancy: '',
        tel: '',
        email: '',
        goback: false
      }
    }
  },
  watch: {
    'report': function () {
      model.reporter = this.report
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

    // 確定提交保存人信息
    confEditReport: function () {
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
