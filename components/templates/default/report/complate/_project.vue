<template>
<div>
  <div class="subbox-show" style="position: relative" v-show="subactive == 'home'">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goSubBack()">
        <span style="position: relative;top: -1px;">返回</span>
      </a>
      <span class="fa close-icon" @click="goHome()">×</span>
      <h1 class="mui-title othertitle">编辑项目信息</h1>
      <a class="mui-icon mui-pull-right save-btn" @click="EditPro()">提交</a>
    </header>
    <div class="textarea-box" v-show="!isLoading">
      <div class="line-box"></div>
      <div style="background-color: #fff;">
        <div class="mui-input-row sub-input-box">
          <label>项目编号</label>
          <input type="text" placeholder="输入项目编号" maxlength="11" style="width: 73%;" v-model="editpro.number">
        </div>
        <div class="mui-input-row sub-input-box">
          <label>招标时间</label>
          <span class="area-text" @click="changeTime('invitation', editpro.invitation_time)">{{editpro.invitation_time}}</span>
        </div>
        <div class="mui-input-row sub-input-box">
          <label>交付时间</label>
          <span class="area-text" @click="changeTime('delivery', editpro.delivery_time)">{{editpro.delivery_time}}</span>
        </div>
        <div class="mui-input-row sub-input-box mui-navigate-right">
          <label>产品品类</label>
          <span class="area-text" style="padding-right: 18px;" @click="changeGoodsType()">{{FilterProjectType((editpro.project_rel_project_furniture_types || {}).items || [])}}</span>
        </div>
        <div class="mui-input-row sub-input-box mui-navigate-right">
          <label>项目类型</label>
          <span class="area-text" style="padding-right: 34px;" @click="changeProType()">{{filterProType(editpro.category)}}</span>
        </div>
        <div class="mui-input-row sub-input-box mui-navigate-right" @click="editText('intro','编辑项目介绍')">
          <label>项目介绍</label>
          <span class="area-text sub-input-text">{{String(editpro.intro).length > 16 ? String(editpro.intro).substring(0, 16) + '...': String(editpro.intro)}}</span>
        </div>
        <div class="mui-input-row sub-input-box mui-navigate-right" @click="editText('risk_analysis','编辑风险分析')">
          <label>风险分析</label>
          <span class="area-text sub-input-text">{{String(editpro.risk_analysis).length > 16 ? String(editpro.risk_analysis).substring(0, 16) + '...': String(editpro.risk_analysis)}}</span>
        </div>
        <div class="mui-input-row sub-input-box mui-navigate-right" @click="editText('remark','编辑项目备注')">
          <label>项目备注</label>
          <span class="area-text sub-input-text">{{String(editpro.remark).length > 16 ? String(editpro.remark).substring(0, 16) + '...': String(editpro.remark)}}</span>
        </div>
        <div class="mui-input-row sub-input-box attach-box">
          <label>附件信息</label>
          <span class="upload-box" id="upload_com"  @click="upload_com()">
            <input class="hidden" accept="image/*" capture="camera" type="file" name="files[]" style="width: 75%; display: none;" multiple>
            <span class="add-btn-upload" style="float: right">
              <i class="fa fa-picture-o"></i>
              <i class="fa fa-plus add-icon"></i>
            </span>
          </span>
          <div class="attach-img-box" v-if="editproImg.length > 0">
            <div class="img-box" v-for="img in editproImg">
              <span class="delete-img" @click="deleteImg(img)">×</span>
              <img :src="img.file_url" :data-preview-src="img.file_url"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <vue-area :areaobj="areaobj" :arr="areaarr" @getLayerThree="getArea"></vue-area>
  <vue-one :oneobj="oneobj" :onearr="protypearrs" @getLayerOne="getVueOneInfo"></vue-one>
  <div v-if="isshowtype">
    <vue-tabs :acticearr="acticearr" :flag="flag" @submitArr="getClassifyInfo"></vue-tabs>
  </div>
  <div v-if="subactive == 'textarea'">
    <vue-textarea :textareaobj="textareaobj" @textareaFun="getTextareaInfo"></vue-textarea>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
import Area from '../../common/threelayer.vue'
import proType from '../../common/onelayer.vue'
import textareaVue from './_textarea.vue'
import Tabs from '../_tab.vue'
let $ = require('jquery')
let _ = require('underscore')
let moment = require('moment')
let url = require('url')
let dateJson = require('~/static/js/date.json')
let modalflag = true // 模态框日期等选择标志
let proTypeArr = [] // 项目分类数组
let model
let myURL
export default {
  props: ['projectinfo'],
  data () {
    return {
      isshowtype: false, // 是否显示产品分类
      subactive: 'home', // 当前显示区域
      isLoading: true, // 是否加载数据
      editpro: {}, // 项目数据
      editproImg: [], // 项目附件图片
      areaarr: [], // 日期数据
      areaobj: {
        state: 0,
        one: '', // 一级
        two: '', // 二级
        three: '' // 三级
      },
      oneobj: {
        state: 0
      },
      protypearrs: [],
      textareaobj: {
        type: '',
        title: '',
        content: ''
      },
      flag: 0,
      acticearr: []
    }
  },
  components: {
    'vue-area': Area,
    'vue-one': proType,
    'vue-textarea': textareaVue,
    'vue-tabs': Tabs
  },
  methods: {
    // 初始化数据
    init: async function () {
      model.editpro = this.projectinfo
      await model.getPorState()
      model.isLoading = false
      model.editpro.invitation_time = model.forMatTime(model.projectinfo.invitation_time, 'YYYY-MM-DD')
      model.editpro.delivery_time = model.forMatTime(model.projectinfo.delivery_time, 'YYYY-MM-DD')
      model.editproImg = model.projectinfo.project_rel_project_attachment.items
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    },

    // 返回首页
    goHome: function () {
      window.location.href = model.linkPath + '/'
    },

    // 返回完善项目页
    goSubBack: function () {
      model.editpro.project_rel_project_attachment.items = model.editproImg
      model.$emit('getProject', model.editpro)
    },

    // 时间格式化
    forMatTime: function (value, type) {
      if (_.isEmpty(value) || parseInt(value) === 0) { return '' }
      moment.locale('Chinese (Simplified)')
      let timetype = type || 'YYYY-MM-DD HH:mm:ss'
      return moment(parseInt(value)).format(timetype)
    },

    // 项目品类
    FilterProjectType: function (arr) {
      let str = []
      arr.forEach((sub) => {
        str.push(sub.name)
      })
      return str.join('/')
    },

    // 项目类型过滤
    filterProType: function (str) {
      let res = ''
      proTypeArr.forEach((item) => {
        if (str === item.value) {
          res = item.text
        }
      })
      return res
    },

    // 项目类型
    changeProType: function () {
      model.protypearrs = proTypeArr
      model.oneobj.state = Math.random()
    },

    // get项目类型
    getVueOneInfo: function (str) {
      model.editpro.category = str[0].value
    },

    // 编辑多文本信息
    editText: function (type, title) {
      model.textareaobj = {
        type: type,
        title: title,
        content: model.editpro[type]
      }
      model.subactive = 'textarea'
    },

    // 产品品类
    changeGoodsType: function () {
      model.isshowtype = true
      model.flag = Math.random()
      $('#classifylist').show()
      $('.content-box').addClass('animated bounceInRight')
      setTimeout(function () {
        // $('.content-box').removeClass('bounceInRight')
      }, 1000)
    },

    // 获取产品品类信息
    getClassifyInfo: function (obj, info) {
      model.editpro.project_rel_project_furniture_types.items = obj
    },

    // 获取多行文本信息
    getTextareaInfo: function (obj) {
      if (obj.flag) {
        model.editpro[obj.data.type] = obj.data.content
      }
      model.subactive = 'home'
    },

    // 获取选择地区信息
    getArea: function (str) {
      // 招标时间
      if (model.layer === 'invitation') {
        model.editpro.invitation_time = str[0].text + '-' + str[1].text + '-' + str[2].text
      }
      // 交付时间
      if (model.layer === 'delivery') {
        model.editpro.delivery_time = str[0].text + '-' + str[1].text + '-' + str[2].text
      }
      modalflag = true
    },

    // 获取项目常量信息
    getPorState: async function () {
      proTypeArr = []
      let param = {
        where: JSON.stringify({
          state_types: {
            $in: ['report_projecttype', 'report_state']
          }
        })
      }
      let res = await axios.get('classes/selectable_states', {params: param})
      res.data.items.forEach((item) => {
        // 项目类型
        if (item.state_types === 'report_projecttype') {
          let tmp = {
            'text': item.alias,
            'value': item.name
          }
          proTypeArr.push(tmp)
        }
      })
    },

    // 招标时间
    changeTime: function (str, val) {
      let myDate = new Date()
      let year = String(myDate.getFullYear())
      let month = String(Number(myDate.getMonth()) + 1).length === 1 ? '0' + String(Number(myDate.getMonth()) + 1) : String(Number(myDate.getMonth()) + 1)
      let day = String(myDate.getDate()).length === 1 ? '0' + String(myDate.getDate()) : String(myDate.getDate())
      if (modalflag) {
        model.layer = str
        model.areaarr = dateJson
        model.areaobj = {
          state: Math.random(),
          one: _.isEmpty(val) ? year : String(val).split('-')[0],
          two: _.isEmpty(val) ? month : String(val).split('-')[1],
          three: _.isEmpty(val) ? day : String(val).split('-')[2]
        }
        modalflag = false
      }
      setTimeout(function () {
        modalflag = true
      }, 500)
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
            data.forEach((sub) => {
              let imgtmp = {
                id: 0,
                file_url: sub.url
              }
              model.editproImg.push(imgtmp)
            })
            $input.unwrap()
          },
          error: function (error) {
            window.mui.toast('上传失败!')
            $input.unwrap()
            console.log(error)
          }
        })
      })
    },

    // 删除项目附件图片
    deleteImg: function (obj) {
      model.editproImg = _.without(model.editproImg, obj)
    },

    // 提交项目信息
    EditPro: function () {
      model.editpro.project_rel_project_attachment.items = model.editproImg
      model.$emit('getProject', model.editpro)
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>
<style scoped>
</style>
