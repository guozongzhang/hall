<template>
<div>
  <div class="subbox-show" style="position: relative">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">
        <span style="position: relative;top: -1px;">返回</span>
      </a>
      <span class="fa close-icon" @click="goHome()">×</span>
      <h1 class="mui-title othertitle">编辑项目信息</h1>
      <a class="mui-icon mui-pull-right save-btn" @click="confEditPro()">提交</a>
    </header>
    <div class="textarea-box">
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
          <span class="area-text" style="padding-right: 20px;" @click="changeGoodsType()">{{editpro.type}}</span>
        </div>
        <div class="mui-input-row sub-input-box mui-navigate-right">
          <label>项目类型</label>
          <span class="area-text" style="padding-right: 34px;" @click="changeProType()">{{editpro.category}}</span>
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
          <div class="attach-img-box" v-show="editproImg.length > 0">
            <div class="img-box" v-for="img in editproImg" v-show="img.show">
              <span class="delete-img" @click="deleteImg(img)">×</span>
              <img :src="img.file_url" :data-preview-src="img.file_url"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <vue-area :areaobj="areaobj" :arr="areaarr" @getLayerThree="getArea"></vue-area>
</div>
</template>
<script>
import Area from '../../common/threelayer.vue'
let _ = require('underscore')
let moment = require('moment')
let url = require('url')
let dateJson = require('~/static/js/date.json')
let modalflag = true
let model
let myURL
export default {
  props: ['projectinfo'],
  data () {
    return {
      editpro: {},
      editproImg: [],
      areaarr: [],
      areaobj: {
        state: 0,
        one: '',
        two: '',
        three: ''
      }
    }
  },
  components: {
    'vue-area': Area
  },
  methods: {
    init: function () {
      model.editpro = this.projectinfo
      model.editpro.invitation_time = model.forMatTime(model.projectinfo.invitation_time, 'YYYY-MM-DD')
      model.editpro.delivery_time = model.forMatTime(model.projectinfo.delivery_time, 'YYYY-MM-DD')
      console.log(model.editpro)
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    },

    // 时间格式化
    forMatTime: function (value, type) {
      if (_.isEmpty(value) || parseInt(value) === 0) { return '' }
      moment.locale('Chinese (Simplified)')
      let timetype = type || 'YYYY-MM-DD HH:mm:ss'
      return moment(parseInt(value)).format(timetype)
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
