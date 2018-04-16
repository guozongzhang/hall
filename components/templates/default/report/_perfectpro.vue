<template>
<div>
  <div v-if="subTab == 'home'">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="goBackPerPect()">
        <span style="position: relative;top: -1px;">返回</span>
      </a>
      <span class="fa close-icon" @click="goHome()">×</span>
      <h1 class="mui-title">项目详情</h1>
      <a href="javascript:;" class="mui-pull-right" style="position: absolute;right: 8px;top: 10px;width: 36px;height: 26px;">
        <span style="font-size: 14px;color: #666;">提交</span>
      </a>
    </header>  
    <div class="detail-box">
      <div class="basic-info">
        <label class="mui-ellipsis">
          <span class="money">{{parseFloat(basicinfo.amount || 0)}}万元</span>·<span>{{String(basicinfo.name).length > 13 ? String(basicinfo.name).substring(0, 13) + '...': String(basicinfo.name)}}</span>
        </label>
        <span class="report-state-icon" v-bind:class="basicinfo.state" v-show="basicinfo.state == 'reject' || basicinfo.state == 'shutdown' || basicinfo.state == 'overdue'"></span>
        <div class="stars-style">
          <span class="star-box" style="display: inline-block;">
            <i class="fa mui-action-back mui-icon mui-icon-left-nav mui-pull-right fa-star" v-for="sub in stars" aria-hidden="true" v-if="sub <= basicinfo.feasibility"></i>
          </span>
        </div>
        <div class="fz16 mui-ellipsis">{{basicinfo.first_party_name}}</div>
        <div class="fz16 intro-style mui-ellipsis">{{(basicinfo.province_poi_province || {}).ProvinceName}}{{(basicinfo.city_poi_city || {}).CityName}}{{(basicinfo.district_poi_district || {}).DistrictName}}{{basicinfo.address}}</div>
        <div class="fz16 intro-style mui-ellipsis">{{basicinfo.sketch}}</div>
        <span class="fa fa-angle-right edit-basic" @click="editBasic(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'"></span>
        <div class="fz12" style="height: 24px;">
          <span style="display: inline-block;float: left;margin-left: 15px;color: #999">有效期{{valtimeFilter(basicinfo.validity)}}</span>
          <span style="display: inline-block;margin-left: 10px;float: right;margin-right: 15px;color: #999">创建时间:{{forMatTime(basicinfo.create_time)}}</span>
        </div>
      </div>
      <div class="sub-detail">
        <div class="mui-segmented-control detail-tab" id="msg_num">
          <a class="mui-control-item mui-active" href="#projectdetail1">
            <span>项目介绍</span>
            <span class="active-icon"></span>
          </a>
          <a class="mui-control-item msg-num" href="#reportrecord1" @change="test()">
            <span>报备记录</span>
            <span class="msg-style"></span>
            <span class="active-icon"></span>
          </a>
          <a class="mui-control-item" href="#reportlog1">
            <span>进度跟踪</span>
            <span class="active-icon"></span>
          </a>
        </div>
        <div class="mui-content">
          <div class="detail-body">
            <div id="projectdetail1" class="mui-control-content mui-active">
              <div class="basic-box">
                <div class="sub-detail-box">
                  <label>甲方信息</label>
                  <span class="edit-icon" @click="editLinkman(basicinfo.id)">
                    <span class="fa fa-edit"></span>
                    <span>编辑</span>
                  </span>
                </div>
                <div class="project-sublist">
                  <ul class="ul-list">
                    <li class="mui-table-view-cell f16" style="display: none">
                      <span class="c666 f16">所属区域：</span>
                      <span class="alist-text">{{(basicinfo.first_party_province_poi_province || {}).ProvinceName}}-{{(basicinfo.first_party_city_poi_city || {}).CityName}}-{{(basicinfo.first_party_district_poi_district || {}).DistrictName}}</span>
                    </li>
                    <li class="mui-table-view-cell f16" v-for="(sub, index) in linkmanarr" >
                      <span class="c666 f16">第{{index+1}}联系人：</span>
                      <span class="alist-text">{{sub.name}}{{sub.job ? '/' + sub.job : ''}}{{sub.tel ? '/' + sub.tel : ''}}</span>
                    </li>
                    <li class="mui-table-view-cell f16" v-show="linkmanarr.length == 0">
                      <span class="c666 f16">联系人：</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="line-box"></div>
              <div class="basic-box">
                <div class="sub-detail-box">
                  <label>项目信息</label>
                  <span class="edit-icon" @click="editProject(basicinfo.id)">
                    <span class="fa fa-edit"></span>
                    <span>编辑</span>
                  </span>
                </div>
                <div class="project-sublist">
                  <ul class="ul-list">
                    <li class="mui-table-view-cell f16">
                      <span class="c666">项目编号：</span>
                      <span class="list-text">{{basicinfo.number}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">招标时间：</span>
                      <span class="list-text">{{forMatTime(basicinfo.invitation_time, 'YYYY.MM.DD')}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">交付时间：</span>
                      <span class="list-text">{{forMatTime(basicinfo.delivery_time, 'YYYY.MM.DD')}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">项目类型：</span>
                      <span class="list-text">{{filterProType(basicinfo.category)}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">产品品类：</span>
                      <span class="list-text">{{progoodstyepstr}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">项目介绍：</span>
                      <span class="list-text">{{basicinfo.intro}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">风险分析：</span>
                      <span class="list-text">{{basicinfo.risk_analysis}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">项目备注：</span>
                      <span class="list-text">{{basicinfo.remark}}</span>
                    </li>
                    <li class="mui-table-view-cell">
                      <span class="c666 f16">上传附件：</span>
                      <p class="attach-list">
                        <img :src="sub.file_url" :data-preview-src="sub.file_url" v-for="sub in (basicinfo.project_rel_project_attachment || {}).items">
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="line-box"></div>
              
              <div class="basic-box">
                <div class="sub-detail-box">
                  <label>报备人信息</label>
                  <span class="edit-icon" @click="editReport(reportman.id)">
                    <span class="fa fa-edit"></span>
                    <span>编辑</span>
                  </span>
                </div>
                <div class="project-sublist">
                  <ul class="ul-list">
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">姓名：</span>
                      <span class="alist-text">{{reportman.name}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">项目关系：</span>
                      <span class="alist-text">{{reportman.project_relation}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">期望提成：</span>
                      <span class="alist-text">{{reportman.royalties_expectation ? reportman.royalties_expectation + '%' : ''}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">项目优势：</span>
                      <span class="alist-text">{{reportman.strengths}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">联系电话：</span>
                      <span class="alist-text">{{reportman.tel}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">联系邮箱：</span>
                      <span class="alist-text">{{reportman.email}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="line-box"></div>
              <div class="basic-box">
                <div class="sub-detail-box">
                  <label>竞争信息</label>
                  <span class="edit-icon" @click="editCompetitors(basicinfo.id)">
                    <span class="fa fa-edit"></span>
                    <span>编辑</span>
                  </span>
                </div>
                <div class="project-sublist">
                  <ul class="ul-list">
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">乙方对手：</span>
                      <span class="alist-text">{{((basicinfo.second_party_competitor || '').split(',') || []).join('/')}}</span>
                    </li>
                    <li class="mui-table-view-cell f16" style="display: none">
                      <span class="c666 f16">竞争对手：</span>
                      <span class="alist-text">{{((basicinfo.competitor || '').split(',') || []).join('/')}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">项目亮点：</span>
                      <span class="alist-text">{{basicinfo.competitor_strengths}}</span>
                    </li>
                    <li class="mui-table-view-cell f16">
                      <span class="c666 f16">形式预测：</span>
                      <span class="alist-text">{{basicinfo.competitor_projections}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="reportrecord1" class="mui-control-content">
              <div class="record-box">
                <ul>
                  <li v-for="(sub, num) in reportLoglist">
                    <div class="li-box" v-bind:class="num == 0 ? 'first' : ''">
                      <p>
                        <span class="last-white-line" v-show="num == (reportLoglist.length - 1)"></span>
                        <span class="pointer"></span>
                        <span>{{sub.operator || '未设置'}}</span>
                        <span>{{sub.text}}</span>
                        <span>了项目</span>
                        <span v-show="sub.flow_remark">[备注]{{sub.flow_remark}}</span>
                      </p>
                      <p style="font-size: 14px;color: #999;">{{forMatTime(sub.create_time, 'YYYY.MM.DD HH:mm:ss')}}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <p class="no-data" v-show="isloading">加载中...</p>
              <p class="no-data" v-show="reportLoglist.length == 0 && !isloading">您还没有报备项目,暂无报备日志哦~</p>
            </div>
            <div id="reportlog1" class="mui-control-content">
              <div class="record-box">
                <ul>
                  <li v-show="basicinfo.state == 'wait_handle' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset' || basicinfo.state == 'had_handle'">
                    <div class="li-box add-item">
                      <p>
                        <span class="white-line"></span>
                        <span class="pointer"></span>
                        <span class="dashed-line"></span>
                        <span class="add-btn" @click="addRecord(basicinfo.id)">
                          <span class="icon">+</span>
                          <span>进度跟踪</span>
                        </span>
                      </p>
                    </div>
                  </li>
                  <li v-for="(sub, num) in recordLoglist">
                    <div class="li-box" v-bind:class="num == 0 ? 'first' : ''">
                      <p>
                        <span class="pointer"></span>
                        <span style="color: #666">{{sub.remark}}</span>
                      </p>
                      <div>
                        <img :src="img.file_url" :data-preview-src="img.file_url" v-for="img in sub.imgaes_rel_project_track_files.items" style="width: 40px;height: 40px;margin-right: 10px;margin-top: 10px;">
                      </div>
                      <p style="font-size: 14px;color: #666">{{forMatTime(sub.create_time, 'YYYY.MM.DD HH:mm:ss')}}</p>
                    </div>
                  </li>
                  <li v-show="recordLoglist.length == 0 && basicinfo.state != 'wait'">
                    <div class="li-box">
                      <p>
                        <span class="last-white-line"></span>
                        <span class="pointer"></span>
                        <span>您还没有添加任务项目跟踪记录~</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <p class="no-data" v-if="recordLoglist.length == 0 && basicinfo.state == 'wait'">您还没有报备该项目，所以暂无报备记录</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="subTab == 'linkman'">
    <vue-linkman :linkmanobj="linkmanarr" @getLinkman="getLinkmanInfo"></vue-linkman>
  </div>
  <div v-if="subTab == 'project'">
    <vue-project :projectinfo="basicinfo" @getProject="getProjectInfo"></vue-project>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
import linkmanVue from './complate/_linkman.vue'
import projectVue from './complate/_project.vue'
let url = require('url')
let moment = require('moment')
let _ = require('underscore')
let model
let myURL
let proTypeArr = [] // 项目类型
let proValTime = [] // 项目有效期
export default {
  props: ['perfect'],
  data () {
    return {
      subTab: 'home',
      basicinfo: {},
      stars: [5, 4, 3, 2, 1],
      linkmanarr: [], // 甲方信息
      reportman: {}, // 报备人信息
      progoodstyepstr: '', // 项目分类
      reportLoglist: [],
      recordLoglist: [],
      isloading: false
    }
  },
  components: {
    'vue-linkman': linkmanVue,
    'vue-project': projectVue
  },
  watch: {
    'perfect': function () {
      model.basicinfo = this.perfect
      model.linkmanarr = this.perfect.project_rel_project_first_party_linkman.items
      model.reportman = this.perfect.project_rel_project_reportman.items[0]
      let arr = []
      this.perfect.project_rel_project_furniture_types.items.forEach((item) => {
        arr.push(item.name)
      })
      model.progoodstyepstr = arr.join('/')
    }
  },
  methods: {
    init: function () {
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      model.getPorState()
    },

    // 退出编辑
    goBackPerPect: function () {
      var btnArray = ['直接退出', '提交并退出']
      window.mui.confirm('是否对完善的内容进行提交？', '友情提示', btnArray, function (e) {
        if (e.index === 1) {
          console.log('提交')
        } else {
          console.log('退出')
          let obj = {
            flag: false,
            data: ''
          }
          model.$emit('subEditProject', obj)
        }
      })
    },

    // 编辑甲方信息
    editLinkman: function (id) {
      model.subTab = 'linkman'
    },

    // 获取甲方信息
    getLinkmanInfo: function (obj) {
      if (obj.flag) {
        model.linkmanarr = obj.data
      }
      model.subTab = 'home'
    },

    // 编辑项目信息
    editProject: function (id) {
      model.subTab = 'project'
    },

    // 获取项目信息
    getProjectInfo: function (obj) {
      if (obj.flag) {
        let arr = []
        obj.data.project_rel_project_furniture_types.items.forEach((sub) => {
          arr.push(sub.name)
        })
        model.progoodstyepstr = arr.join('/')
        model.basicinfo = obj.data
        model.basicinfo.invitation_time = String(Date.parse(new Date(obj.data.invitation_time)))
        model.basicinfo.delivery_time = String(Date.parse(new Date(obj.data.delivery_time)))
      }
      model.subTab = 'home'
    },

    // 返回云展廳首頁
    goHome: function () {
      window.location.href = model.linkPath + '/'
    },

    // 有效期过滤
    valtimeFilter: function (str) {
      let res = ''
      proValTime.forEach((item) => {
        if (item.value === str) {
          res = item.text
        }
      })
      return res
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

    // 时间格式化
    forMatTime: function (value, type) {
      if (_.isEmpty(value) || parseInt(value) === 0) { return '' }
      moment.locale('Chinese (Simplified)')
      let timetype = type || 'YYYY-MM-DD HH:mm:ss'
      return moment(parseInt(value)).format(timetype)
    },

    // 返回详情
    goBack: function () {
      model.reporter.goback = true
      // model.$emit('getEditReport', model.reporter)
    },

    // 获取项目常量信息
    getPorState: async function () {
      let param = {
        where: JSON.stringify({
          state_types: {
            $in: ['report_projecttype', 'report_valtime', 'report_state']
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
        // 项目有效期
        if (item.state_types === 'report_valtime') {
          let tmp = {
            'text': item.alias,
            'value': item.name
          }
          proValTime.push(tmp)
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
<style scoped>
html .mui-popup .mui-popup-buttons .mui-popup-button{
  font-size: 14px !important;
}
.mui-icon-back:before, .mui-icon-left-nav:before{
  font-size: 20px !important;
}
.bbrname{
  display: inline-block;
  width: 60%;
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
