
<template>
  <div>
    <div v-show="activeTab == 'home'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left sub-go-back">
          <span style="position: relative;top: -1px;">返回</span>
        </a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title">项目详情</h1>
        <a href="javascript:;" class="mui-pull-right" style="position: absolute;right: 8px;top: 10px;width: 26px;height: 26px;" @click="optFunc(basicinfo.state)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded'">
          <span class="list-icon del-icon"></span>
        </a>
        <a href="javascript:;" class="mui-pull-right" style="position: absolute;right: 8px;top: 10px;width: 26px;height: 26px;" @click="optFunc(basicinfo.state)" v-show="basicinfo.state == 'wait_handle'">
          <span class="list-icon reset-icon"></span>
        </a>
        <a href="javascript:;" class="mui-pull-right" style="position: absolute;right: 8px;top: 10px;width: 60px;height: 26px;" @click="perfectFunc()" v-show="basicinfo.state == 'had_handle' || basicinfo.state == 'adopt'">
          <span style="font-size: 14px;color: #666;">完善项目</span>
        </a>
      </header>
      <div class="detail-box" v-show="initok">
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
            <span style="display: inline-block;float: left;margin-left: 10px;color: #999">有效期{{valtimeFilter(basicinfo.validity)}}</span>
            <span style="display: inline-block;margin-left: 10px;float: right;margin-right: 10px;color: #999">创建时间:{{forMatTime(basicinfo.create_time)}}</span>
          </div>
          <div class="go-report" v-if="basicinfo.state == 'wait' || basicinfo.state == 'had_reset' || basicinfo.state == 'rescinded'">
            <span class="left-circle icon-circle"></span>
            <span class="right-circle icon-circle"></span>
            <a href="javascript:;" @click="gotoReport()">去报备</a>
          </div>
        </div>
        <div class="sub-detail">
          <div class="mui-segmented-control detail-tab" id="msg_num">
            <a class="mui-control-item mui-active" href="#projectdetail">
              <span>项目介绍</span>
              <span class="active-icon"></span>
            </a>
            <a class="mui-control-item msg-num" href="#reportrecord">
              <span>报备记录</span>
              <span class="msg-style" v-if="hadRead"></span>
              <span class="active-icon"></span>
            </a>
            <a class="mui-control-item" href="#reportlog">
              <span>进度跟踪</span>
              <span class="active-icon"></span>
            </a>
          </div>
          <div class="mui-content">
            <div class="detail-body">
              <div id="projectdetail" class="mui-control-content mui-active">
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>甲方信息</label>
                    <span class="edit-icon" @click="editBuyer(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'">
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
                      <li class="mui-table-view-cell f16" v-for="(sub, index) in alinkman" >
                        <span class="c666 f16">第{{index+1}}联系人：</span>
                        <span class="alist-text">{{sub.name}}{{sub.job ? '/' + sub.job : ''}}{{sub.tel ? '/' + sub.tel : ''}}</span>
                      </li>
                      <li class="mui-table-view-cell f16" v-show="alinkman.length == 0">
                        <span class="c666 f16">联系人：</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="line-box"></div>
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>项目信息</label>
                    <span class="edit-icon" @click="editProject(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'">
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
                    <span class="edit-icon" @click="editReport(reportman.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'">
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
                    <span class="edit-icon" @click="editCompetitors(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'">
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
              <div id="reportrecord" class="mui-control-content">
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
              <div id="reportlog" class="mui-control-content">
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
    <div v-show="activeTab == 'editbasic'" class="subbox-show record-show">
      <div class="subbox-show">
        <header class="mui-bar mui-bar-nav">
          <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">
            <span style="position: relative;top: -1px;">返回</span>
          </a>
          <span class="fa close-icon" @click="goHome()">×</span>
          <h1 class="mui-title othertitle">编辑必要信息</h1>
          <a class="mui-icon mui-pull-right save-btn" @click="confEditBasic()">提交</a>
        </header>
        <div class="textarea-box">
          <div class="line-box"></div>
          <div class="must">
            <div class="mui-input-row sub-input-box" style="background-color: #fff;">
              <label>项目名称<span>*</span></label>
              <input type="text" placeholder="输入项目名称" maxlength="20" v-model="editbaisc.name">
            </div>
            <div class="mui-input-row sub-input-box" style="background-color: #fff;">
              <label>甲方名称<span>*</span></label>
              <input type="text" placeholder="输入甲方名称" maxlength="20" v-model="editbaisc.first_party_name">
            </div>
            <div class="mui-input-row sub-input-box" style="background-color: #fff;">
              <label style="width: 32% !important">项目所在区域<span>*</span></label>
              <span class="area-text" style="width: 60% !important;float: right" @click="changeAre()"><span>{{(editbaisc.province || {}).text}}-{{(editbaisc.city || {}).text}}-{{(editbaisc.district || {}).text}}</span></span>
            </div>
            <div class="mui-input-row sub-input-box" style="background-color: #fff;">
              <label>详细地址<span>*</span></label>
              <input type="text" placeholder="项目详细地址" maxlength="20" v-model="editbaisc.address">
            </div>
            <div class="mui-input-row sub-input-box" style="background-color: #fff;">
              <label>项目金额<span>*</span></label>
              <span style="float: right;font-size: 14px;color: #999;display: inline-block;margin-left: 3px;position: relative;top: 9px;margin-right: 15px;">万元</span>
              <input type="text" placeholder="万元" maxlength="20" style="width: 50% !important;padding-right: 3px" v-model="editbaisc.amount">
            </div>
            <div class="mui-input-row sub-input-box edit-basic-box" style="background-color: #fff;">
              <label style="width: 29%">项目可行性<span>*</span></label>
              <div class="stars-style">
                <span class="star-box">
                  <i class="fa mui-icon mui-icon-left-nav mui-pull-right" @click="getStar(sub)"  v-for="sub in stars" aria-hidden="true" v-bind:class="sub <= editbaisc.feasibility ? 'fa-star' : 'fa-star-o'"></i>
                </span>
              </div>
            </div>
            <div class="mui-input-row sub-input-box" style="background-color: #fff;">
              <label>有效期<span>*</span></label>
              <span class="area-text mui-navigate-right" @click="changeProValtime()">
                <span style="position: relative;top: 3px;">{{editbaisc.validity_text}}</span>
              </span>
            </div>
            <div class="mui-input-row sub-input-box" style="background-color: #fff;">
              <label>简单描述<span>*</span></label>
              <input type="text" placeholder="输入简单描述" maxlength="20" v-model="editbaisc.sketch">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'record'" class="subbox-show record-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">
          <span style="position: relative;top: -1px;">返回</span>
        </a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">进度跟踪</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confAddRecord()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div class="text-input">
          <textarea type="text" v-model="recordtext"  class="mui-input-clear" placeholder="请输入最新的跟踪记录"></textarea>
          <div class="attach-box" style="padding: 0 10px;margin-top: 10px;min-height: 55px;">
            <span v-for="img in recordImgs" v-show="recordImgs.length > 0" style="display: inline-block;width: 40px;height: 40px;position: relative;margin-right: 10px;margin-bottom: 10px;">
              <img :src="img.file_url" :data-preview-src="img.file_url">
              <span class="deleteimg" @click="deleteattchimg(img)">×</span>
            </span>
            <span class="upload-files" id="upload_attch" @click="upload_attch()" v-show="recordImgs.length > 0" style="position: relative;top: -15px;">
              <svg class="svg-style" style="position: relative;top: 8px;left: 8px;">
                <use xlink:href="/svg/icon.svg#add"></use>
              </svg>
              <input class="hidden" type="file" accept="image/*" capture="camera" name="files[]" style="width: 75%; display: none;" v-if="!isPhone" multiple>
              <input class="hidden" type="file" accept="image/*" name="files[]" style="width: 75%; display: none;" v-if="isPhone" multiple>
            </span>
            <span class="upload-files" id="upload_attch" @click="upload_attch()" style="position: relative;top: 0px;" v-show="recordImgs.length == 0">
              <svg class="svg-style" style="position: relative;top: 8px;left: 8px;">
                <use xlink:href="/svg/icon.svg#add"></use>
              </svg>
              <input class="hidden" type="file" accept="image/*" name="files[]" style="width: 75%; display: none;" v-if="isPhone" multiple>
              <input class="hidden" accept="image/*" capture="camera" type="file" name="files[]" style="width: 75%; display: none;" multiple>
            </span>
          </div>
        </div>
      </div>
    </div>
    

    
    
    <div v-if="activeTab == 'editproject'" class="subbox-show">
      <vue-project :projectinfo="perfectproobj" @getProject="getProjectInfo"></vue-project>
    </div>

    <div v-if="activeTab == 'editcompetitors'" class="subbox-show">
      <vue-compete :compete="competitors" @getCompete="getCompeteInfo"></vue-compete>
    </div>

    <div v-if="activeTab == 'editreport'" class="subbox-show">
      <vue-reportman :report="reportman" @getReportMan="getReportManInfo"></vue-reportman>
    </div>

    <div v-if="activeTab == 'editbuyer'" class="subbox-show" style="position: relative">
      <vue-linkman :linkmanobj="buyer" @getLinkman="getLinkmanInfo"></vue-linkman>
    </div>

    <div v-show="activeTab == 'perfectpro'" class="subbox-show">
      <vue-perfectpro :perfect="perfectproobj" @subEditProject="getProject"></vue-perfectpro>
    </div>




    <div>
      <vue-area :areaobj="areaobj" :arr="areaarr" @getLayerThree="getArea"></vue-area>
      <vue-one :oneobj="oneobj" :onearr="protypearrs" @getLayerOne="getVueOneInfo"></vue-one>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import Area from '../common/threelayer.vue'
import proType from '../common/onelayer.vue'
import editReportvue from './complate/_reportman.vue'
import comPetevue from './complate/_compete.vue'
import linkMan from './complate/_linkman.vue'
import perfectProvue from './_perfectpro.vue'
import perfectvue from './complate/_project.vue'
import Tab from './_tab.vue'
let ESVal = require('es-validate')
// let dateJson = require('~/static/js/date.json')
let url = require('url')
let querystring = require('querystring')
let $ = require('jquery')
let _ = require('underscore')
let Cookies = require('js-cookie')
let moment = require('moment')
let model
let proId
let modalflag = true
let flag = true
let urlObj
let myURL
let proTypeArr = [] // 项目类型
let proValTime = [] // 项目有效期
// let updateTypeArr = [] // 提交的项目类型数组
let reportState = [
  {
    key: 'had_reset',
    value: '驳回'
  },
  {
    key: 'adopt',
    value: '采纳'
  },
  {
    key: 'reject',
    value: '拒绝'
  },
  {
    key: 'had_handle',
    value: '受理'
  },
  {
    key: 'wait_handle',
    value: '报备'
  },
  {
    key: 'wait',
    value: '新建'
  },
  {
    key: 'rescinded',
    value: '撤回'
  },
  {
    key: 'shutdown',
    value: '关闭'
  },
  {
    key: 'overdue',
    value: '过期'
  }
]
export default {
  data () {
    return {
      isshowtype: false,
      perfectproobj: {}, // 完善项目
      isloading: true,
      hadRead: false,
      objid: 0, // 项目id
      isPhone: false,
      initok: false,
      flag: 0,
      recordImgs: [], // 报备记录附件
      getmoreopt: false,
      alinkman: [], // 联系人
      layer: 'area',
      editbaisc: {},
      areaarr: [],
      areaobj: {
        state: 0,
        one: '',
        two: '',
        three: ''
      },
      oneobj: {
        state: 0
      },
      protypearrs: [],
      activeTab: 'home',
      basicinfo: {},
      reportman: {},
      linkPath: '',
      stars: [5, 4, 3, 2, 1],
      recordtext: '',
      reportLoglist: [],
      recordLoglist: [],
      editpro: {},
      editproImg: [],
      reporter: {},
      buyer: [],
      competitors: {},
      classifyArr: [],
      progoodstyepstr: '',
      isedittextarr: []
    }
  },
  components: {
    'vue-area': Area,
    'vue-one': proType,
    'vue-reportman': editReportvue,
    'vue-compete': comPetevue,
    'vue-project': perfectvue,
    'vue-perfectpro': perfectProvue,
    'vue-linkman': linkMan,
    'vue-tab': Tab
  },
  methods: {
    init: async function () {
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let token = Cookies.get('dpjia-hall-token-' + process.env.port)
      if (_.isEmpty($.trim(token))) {
        var btnArray = ['否', '是']
        window.mui.confirm('还未登录,是否登录？', '友情提示', btnArray, function (e) {
          if (e.index === 1) {
            let preurl = myURL.path.split('/')[2]
            Cookies.set('dpjia-preurl', preurl, {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/login'
          } else {
            window.location.href = model.linkPath + '/'
          }
        })
        return false
      } else {
        model.isPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent)
        window.mui.previewImage()
        urlObj = querystring.parse(myURL.query)
        model.objid = urlObj.id
        let rel = {
          relation: [
            {
              table: 'project_reportman',
              key: 'project_poi_projects',
              include: [
                {
                  table: 'user_poi_reportman'
                }
              ]
            },
            {
              table: 'project_attachment',
              key: 'project_poi_projects'
            },
            {
              table: 'project_furniture_types',
              key: 'project_poi_projects'
            },
            {
              table: 'project_first_party_linkman',
              key: 'project_poi_projects'
            }
          ],
          include: [
            {
              table: 'first_party_province_poi_province'
            },
            {
              table: 'first_party_city_poi_city'
            },
            {
              table: 'first_party_district_poi_district'
            },
            {
              table: 'province_poi_province',
              keys: 'id,ProvinceName'
            },
            {
              table: 'city_poi_city',
              keys: 'id,CityName'
            },
            {
              table: 'district_poi_district',
              keys: 'id,DistrictName'
            }
          ]
        }
        let param = {
          id: urlObj.id,
          with: rel
        }
        axios.get('functions/report/project', {
          params: param
        }).then(async function (msg) {
          model.initok = true
          let arr = []
          msg.data.project_rel_project_furniture_types.items.forEach((item) => {
            arr.push(item.name)
          })
          model.progoodstyepstr = arr.join('/')
          model.basicinfo = msg.data
          model.hadRead = Number(msg.data.readed) === 0
          model.alinkman = model.formatLinkman((msg.data.project_rel_project_first_party_linkman || {}).items || [])
          model.reportman = ((msg.data.project_rel_project_reportman || {}).items || [])[0] || {}
          await model.getRecordLog(urlObj.id)
        }).catch(function (error) {
          if (error.response.data.message === 'token is invalid') {
            window.mui.toast('登录信息过期!')
            setTimeout(function () {
              Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
              window.location.href = model.linkPath + '/'
            }, 2000)
          } else {
            window.mui.toast(error.response.data.message)
            setTimeout(function () {
              window.location.href = model.linkPath + '/'
            }, 2000)
          }
        })
      }

      // 消息已经读取
      window.mui('#msg_num').on('tap', '.msg-num', function () {
        model.isloading = true
        model.hadRead = false
        model.reportLoglist = []
        model.getReportLog(urlObj.id)
      })
    },

    // 20180416-yuguo-获取完善项目信息
    getProject: function (obj) {
      if (obj === 'report') {
        window.location.href = model.linkPath + '/report'
      } else {
        window.location.href = location
      }
    },

    // 获取项目信息
    getProjectInfo: function (obj) {
      if (!obj.flag) {
        model.activeTab = 'home'
        model.basicinfo = obj.data
        return
      }

      console.log('sss', obj.data)

      let ms = {
        id: proId,
        number: obj.data.number,
        invitation_time: obj.data.invitation_time === '' ? 0 : obj.data.invitation_time,
        delivery_time: obj.data.delivery_time === '' ? 0 : obj.data.delivery_time,
        category: obj.data.category,
        intro: obj.data.intro,
        risk_analysis: obj.data.risk_analysis,
        remark: obj.data.remark,
        project_attachment: JSON.stringify(model.basicinfo.project_rel_project_attachment.items)
      }
      // 判断产品分类是否存在以及被更新
      if (obj.data.project_rel_project_furniture_types.items.length > 0) {
        if (obj.data.project_rel_project_furniture_types.items[0].id === 0) {
          ms = _.extend(ms, {project_furniture_types: JSON.stringify(obj.data.project_rel_project_furniture_types.items)})
        }
      }
      console.log('xxx', ms)
      let arr = []
      obj.data.project_rel_project_furniture_types.items.forEach((sub) => {
        arr.push(sub.name)
      })
      model.progoodstyepstr = arr.join('/')
      axios.put('functions/report/project', null, {
        data: ms
      }).then(function (data) {
        model.basicinfo = _.extend(model.basicinfo, ms)
        model.activeTab = 'home'
        window.mui.toast('编辑项目信息成功')
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/login'
          }, 2000)
        }
      })
    },

    // 20180413-yuguo-完善项目信息
    perfectFunc: function () {
      model.perfectproobj = model.basicinfo
      model.activeTab = 'perfectpro'
    },

    // 格式化联系人
    formatLinkman: function (arr) {
      arr.forEach((sub) => {
        sub.delete = sub.delete ? sub.delete : 'no'
      })
      return arr
    },

    // 报备人 ---------------------------------------
    // 编辑报备人信息
    editReport: function (id) {
      model.reporter = {
        id: id,
        isself: Number(model.reportman.user_poi_users) > 0 ? 'self' : 'other',
        name: model.reportman.name,
        relationship: model.reportman.project_relation,
        commission: model.reportman.royalties_expectation,
        ascendancy: model.reportman.strengths,
        tel: model.reportman.tel,
        email: model.reportman.email,
        goback: false
      }
      model.activeTab = 'editreport'
      proId = id
    },

    // 获取报备人信息
    getReportManInfo: function (obj) {
      if (!obj.flag) {
        model.activeTab = 'home'
        model.reportman = obj.data
        return
      }
      let ms = obj.data
      ms = _.extend(ms, {is_self: ms.isself})
      axios.put('functions/report/project_reportman', null, {
        data: ms
      }).then(function (data) {
        window.mui.toast('修改报备人成功')
        model.reportman = obj.data
        model.activeTab = 'home'
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token-' + process.env.port, '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
      })
    },

    // 编辑必填信息
    editBasic: function (id) {
      proId = id
      model.editbaisc = {
        name: model.basicinfo.name,
        first_party_name: model.basicinfo.first_party_name,
        amount: parseFloat(model.basicinfo.amount || 0),
        feasibility: model.basicinfo.feasibility,
        validity: model.basicinfo.validity,
        validity_text: model.valtimeFilter(model.basicinfo.validity),
        sketch: model.basicinfo.sketch,
        address: model.basicinfo.address,
        province: {
          value: model.basicinfo.province_poi_province.id || 1,
          text: model.basicinfo.province_poi_province.ProvinceName || '北京市'
        },
        city: {
          value: model.basicinfo.city_poi_city.id || 1,
          text: model.basicinfo.city_poi_city.CityName || '北京市'
        },
        district: {
          value: model.basicinfo.district_poi_district.id || 1,
          text: model.basicinfo.district_poi_district.DistrictName || '东城区'
        }
      }
      model.protypearrs = proValTime
      model.activeTab = 'editbasic'
    },

    ValidateForm: function (data) {
      let result = ESVal.validate(data, {
        name: {
          required: true,
          msg: '项目名称不能为空!'
        },
        first_party_name: {
          required: true,
          msg: '甲方名称不能为空!'
        },
        address: {
          required: true,
          msg: '详细地址不能为空!'
        },
        amount: {
          required: true,
          msg: '预计金额不能为空!'
        },
        sketch: {
          required: true,
          msg: '简单描述不能为空!'
        }
      })
      if (!result.status) {
        window.mui.toast(result.msg)
      }
      return result.status
    },

    // 保存必填信息
    confEditBasic: function () {
      let param = {
        id: proId,
        name: model.editbaisc.name,
        first_party_name: model.editbaisc.first_party_name,
        amount: model.editbaisc.amount,
        feasibility: model.editbaisc.feasibility || '',
        validity: model.editbaisc.validity || '',
        sketch: model.editbaisc.sketch || '',
        address: model.editbaisc.address || '',
        province_poi_province: model.editbaisc.province.value,
        city_poi_city: model.editbaisc.city.value,
        district_poi_district: model.editbaisc.district.value
      }
      if (!model.ValidateForm(param)) {
        return false
      }
      axios.put('functions/report/project', null, {
        data: param
      }).then(function (data) {
        model.basicinfo.name = model.editbaisc.name
        model.basicinfo.first_party_name = model.editbaisc.first_party_name
        model.basicinfo.amount = model.editbaisc.amount
        model.basicinfo.feasibility = model.editbaisc.feasibility
        model.basicinfo.validity = model.editbaisc.validity
        model.basicinfo.sketch = model.editbaisc.sketch
        model.basicinfo.province_poi_province = {
          id: model.editbaisc.province.value,
          ProvinceName: model.editbaisc.province.text
        }
        model.basicinfo.city_poi_city = {
          id: model.editbaisc.city.value,
          CityName: model.editbaisc.city.text
        }
        model.basicinfo.district_poi_district = {
          id: model.editbaisc.district.value,
          DistrictName: model.editbaisc.district.text
        }
        model.basicinfo.address = model.editbaisc.address
        window.mui.toast('编辑必填信息成功')
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
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

    // 选择可行性
    getStar: function (num) {
      model.editbaisc.feasibility = num
    },

    // 有效期
    changeProValtime: function () {
      model.protypearrs = proValTime
      model.oneobj.state = Math.random()
    },

    // 去报备
    gotoReport: function () {
      axios.post('functions/report/record', null, {
        data: {id: model.basicinfo.id}
      }).then(function (data) {
        window.mui.toast('报备成功')
        model.basicinfo.state = 'wait_handle'
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

    // 右上角操作函数（撤销、删除）
    optFunc: function (state) {
      let text = (state === 'wait' || state === 'rescinded') ? '删除项目' : '撤回项目'
      var btnArray = ['否', '是']
      window.mui.confirm('确定' + text + '?', '友情提示', btnArray, function (e) {
        if (e.index === 1) {
          if (state === 'wait' || state === 'rescinded') {
            let param = {
              _method: 'DELETE',
              id: model.basicinfo.id
            }
            axios.post('functions/report/project', null, {
              data: param
            }).then(function (data) {
              window.mui.toast(text + '成功!')
              setTimeout(function () {
                window.location.href = model.linkPath + '/report'
              }, 1000)
            }).catch(function (error) {
              if (error.response.data.message === 'token is invalid') {
                window.mui.toast('登录信息过期!')
                setTimeout(function () {
                  Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
                  window.location.href = model.linkPath + '/login'
                }, 2000)
              }
            })
          } else {
            let param = {
              id: model.basicinfo.id
            }
            axios.post('functions/report/revoke', null, {
              data: param
            }).then(function (data) {
              window.mui.toast(text + '成功!')
              setTimeout(function () {
                model.init()
              }, 1000)
            }).catch(function (error) {
              if (error.response.data.message === 'token is invalid') {
                window.mui.toast('登录信息过期!')
                setTimeout(function () {
                  Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
                  window.location.href = model.linkPath + '/login'
                }, 2000)
              }
            })
          }
        }
        model.getmoreopt = false
        return false
      })
    },

    // 获取报备记录
    getReportLog: async function (id) {
      let param = {
        flow_id: 36,
        id: id,
        order: '-id',
        report_name: model.basicinfo.name
      }
      let result = await axios.get('functions/report/record', {
        params: param
      })
      result.data.items.forEach((item) => {
        reportState.forEach((sub) => {
          if (item.flow_state === sub.key) {
            item.text = sub.value
          }
        })
      })
      model.isloading = false
      model.reportLoglist = result.data.items
    },

    // 获取项目跟踪记录
    getRecordLog: async function (id) {
      let param = {
        where: {
          project_poi_projects: id
        },
        with: {
          relation: [
            {
              table: 'project_track_files',
              key: 'imgaes_poi_project_track'
            }
          ]
        },
        order: '-id'
      }
      let result = await axios.get('classes/project_track', {
        params: param
      })
      model.recordLoglist = result.data.items
    },

    // 添加跟踪记录页面的返回
    goBack: function () {
      model.recordtext = ''
      model.activeTab = 'home'
    },

    // 返回首页(云展厅)
    goHome: function () {
      window.location.href = model.linkPath + '/'
    },

    // 添加跟踪记录
    addRecord: async function (id) {
      model.recordtext = ''
      model.recordImgs = []
      model.activeTab = 'record'
      proId = id
    },

    // 确定添加跟踪记录
    confAddRecord: function () {
      if (!model.recordtext && model.recordImgs.length === 0) {
        window.mui.toast('请填写跟踪记录或者上传附件！')
        return
      }
      if (flag) {
        flag = false
        let param = {
          project_poi_projects: proId,
          remark: model.recordtext,
          track_files: JSON.stringify(model.recordImgs)
        }
        axios.post('functions/report/project_track', null, {
          data: param
        }).then(function (data) {
          data.data.imgaes_rel_project_track_files = {
            items: model.recordImgs
          }
          model.recordLoglist.unshift(data.data)
          window.mui.toast('添加跟踪记录成功！')
          flag = true
          setTimeout(function () {
            model.activeTab = 'home'
          }, 1000)
        }).catch(function (error) {
          if (error.response.data.message === 'token is invalid') {
            window.mui.toast('登录信息过期!')
            setTimeout(function () {
              Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
              window.location.href = model.linkPath + '/login'
            }, 2000)
          }
        })
      }
    },

    // 时间格式化
    forMatTime: function (value, type) {
      if (_.isEmpty(value) || parseInt(value) === 0) { return '' }
      moment.locale('Chinese (Simplified)')
      let timetype = type || 'YYYY-MM-DD HH:mm:ss'
      return moment(parseInt(value)).format(timetype)
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

    // 编辑项目信息
    editProject: function (id) {
      model.perfectproobj = model.basicinfo
      model.activeTab = 'editproject'
      proId = id
    },

    // get项目类型
    getVueOneInfo: function (str) {
      // 编辑必填信息
      if (model.activeTab === 'editbasic') {
        model.editbaisc.validity = str[0].value
        model.editbaisc.validity_text = str[0].text
      }
      // 编辑基本信息
      if (model.activeTab === 'editproject') {
        model.editpro.category_str = str[0].value
        model.editpro.category = str[0].text
      }
    },

    // 删除项目附件图片
    deleteImg: function (obj) {
      if (obj.id > 0) {
        obj.delete = 'yes'
        obj.show = false
      } else {
        model.editproImg = _.without(model.editproImg, obj)
      }
    },

    // 产品品类
    changeGoodsType: async function () {
      model.isshowtype = true
      model.flag = Math.random()
      $('#classifylist').show()
      $('.content-box').addClass('animated bounceInRight')
      setTimeout(function () {
        // $('.content-box').removeClass('bounceInRight')
      }, 1000)
    },

    // 编辑甲方信息 -----------------------
    editBuyer: function (id) {
      model.buyer = model.basicinfo.project_rel_project_first_party_linkman.items
      model.activeTab = 'editbuyer'
      proId = id
    },

    // 获取甲方信息
    getLinkmanInfo: function (obj) {
      let ms = {
        project_first_party_linkman: JSON.stringify(obj.data),
        project_rel_project_first_party_linkman: JSON.stringify(obj.data),
        id: proId
      }
      if (obj.flag === false) {
        model.activeTab = 'home'
        model.basicinfo.project_rel_project_first_party_linkman.items = obj.data
        model.alinkman = obj.data
        return
      }
      axios.put('functions/report/project', null, {
        data: ms
      }).then(function (data) {
        window.mui.toast('编辑甲方信息成功')
        model.activeTab = 'home'
        model.basicinfo.project_rel_project_first_party_linkman.items = obj.data
        model.alinkman = obj.data
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/login'
          }, 2000)
        }
      })
    }, // 编辑甲方信息 -----------------------

    // 选择地区
    changeAre: function () {
      if (modalflag) {
        model.layer = 'area'
        model.areaarr = []
        model.areaobj = {
          one: model.editbaisc.province.value || 1,
          two: model.editbaisc.city.value || 1,
          three: model.editbaisc.district.value || 8,
          state: Math.random()
        }
      }
      setTimeout(function () {
        modalflag = true
      }, 500)
    },

    // 获取选择地区信息
    getArea: function (str) {
      // 省市区
      if (model.layer === 'area') {
        model.editbaisc.province = {
          value: str[0].value,
          text: str[0].text
        }
        model.editbaisc.city = {
          value: str[1].value,
          text: str[1].text
        }
        model.editbaisc.district = {
          value: str[2].value,
          text: str[2].text
        }
      }
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

    // 编辑竞争信息 --------------------------
    editCompetitors: function (id) {
      model.competitors = {
        second_party_competitor: model.basicinfo.second_party_competitor,
        competitor: model.basicinfo.competitor,
        competitor_strengths: model.basicinfo.competitor_strengths,
        competitor_projections: model.basicinfo.competitor_projections
      }
      model.activeTab = 'editcompetitors'
      proId = id
    },

    // 获取竞争者信息
    getCompeteInfo: function (obj) {
      let ms = obj.data
      ms = _.extend(ms, {id: proId})
      if (obj.flag === false) {
        model.activeTab = 'home'
        model.basicinfo = _.extend(model.basicinfo, ms)
        return
      }
      axios.put('functions/report/project', null, {
        data: ms
      }).then(function (data) {
        window.mui.toast('编辑竞争信息成功')
        model.basicinfo = _.extend(model.basicinfo, ms)
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/login'
          }, 2000)
        }
      })
    }, // 编辑竞争信息 --------------------------

    // 删除报备记录附件（图片）
    deleteattchimg: function (obj) {
      model.recordImgs = _.without(model.recordImgs, obj)
    },

    // 上传报备记录附件
    upload_attch: function () {
      var url = process.env.baseUrl + 'upload' || 'http://192.168.1.120/openapi/api/1.0/upload'
      var $input = $('#upload_attch').find('input')
      $input.unbind().click()
      $input.unbind().change(function () {
        if ($input.val() === '') {
          return false
        }
        var form = $("<form class='uploadform' method='post' enctype='multipart/form-data' action='" + url + "'></form>")
        $input.wrap(form)
        window.$('#upload_attch').find('form').ajaxSubmit({
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
              model.recordImgs.push(imgtmp)
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
                delete: 'no',
                file_url: sub.url,
                show: true
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
    }
  },
  async mounted () {
    model = this
    await model.getPorState()
    await model.init()
  }
}
</script>
<style>
.f16 {
  font-size: 16px !important;
}
[v-cloak] { display: none!important; }
body,html{
  background-color: #eee !important;
}
.mui-icon-back:before, .mui-icon-left-nav:before{
  font-size: 20px !important;
}
.linkman-title {
  color: #666;
}
.list-icon {
  display: inline-block;
  position: absolute;
  top: 0;
  width: 26px;
  height: 26px;
  background: url('/images/list_icon.png') no-repeat;
  background-size: 250px;
}
.del-icon{
  left: 0;
  background-position: -9px -5px;
}
.reset-icon{
  left: 0;
  background-position: -43px -5px;
}
.upload-files {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 1px solid #eee;
}
.deleteimg {
  position: absolute;
  left: -5px;
  top: -5px;
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  background-color: #c63e40;
  border-radius: 100%;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  z-index: 20;
}
.nav {
  margin-top: 48px;
}
.nav li {
  min-height: 43px;
  line-height: 43px;
  padding: 0;
}
.nav li a {
  font-size: 13px;
  color: #3A3A3A;
}
.mui-table-view:before {
  background-color: #fff !important;
}
.nav li i {
  color: red;
  font-style: normal;
  margin-left: 4px;
}
.nav li.linkmantext {
  min-height: 80px;
}
.linkman-item{
  height: 160px;
  background-color: #fff;
}
.comp-input-box {
  height: 74px;
  background-color: #fff;
  padding: 0 !important;  
}
.comp-input-box input {
  font-size: 14px;
  color:#666;
  width:100%!important;
  border: none;
  margin: 0;
}
.sublinkman-style {
  font-size: 14px;
  color: #ccc;
  text-align: right;
  padding: 0 20px;
  height: 24px;
  line-height: 24px;
}
.report-state-icon {
  position: absolute;
  z-index: 6;
  top:0;
  right: 50px;
  width: 68px;
  height: 44px;
  background: url('/images/report_state.png') no-repeat;
  background-size: 615px;
}
.reject{
  background-position: -27px -55px;
}
.overdue{
  background-position: -206px -55px;
}
.shutdown{
  background-position: -117px -55px;
}
.edit-box {
  background-color: #eee;
}
.edittext textarea {
  min-height: 80px;
  border: none;
   border-bottom: 1px solid #ccc;
   font-size: 14px;
}
.add-item{
  position: relative;
  height: 30px;
}
.addlinkman {
  position: absolute;
  bottom: -25px;
  right: 10px;
  font-size: 14px;
  color: #999;
}
.addjjz {
  position: absolute;
  bottom: -32px;
  right: 10px;
  font-size: 14px;
  color: #999;
}
.mui-table-view-chevron {
  background-color: #eee;
}
.mui-table-view:before,
.mui-table-view:after {
  background-color: #fff !important;
}
.mui-table-view-cell:after {
  background-color: #fff !important;
}
.jzztitele {
  height: 30px;
  line-height: 30px;
  width: 100%;
  background-color: #eee;
  color: #969696;
  font-size: 14px;
  padding-left: 15px;
}
.linkman-box .mui-input-row {
  height: 43px;
}
.linkman-box .mui-input-row label {
  height: 43px;
  padding: 0;
  line-height: 43px;
  font-size: 14px;
  width: 25%;
}
.linkman-box .mui-input-row input{
  font-size: 14px;
  padding: 0;
  line-height: 43px;
  height: 43px;
  width: 75%!important;
  text-align: right;
  color: #999;
}
.mui-title{
  font-weight: 400;
}
.mui-bar-nav{
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: none;
}
.sub-go-back{
  height: 48px;
  line-height: 26px;
  color: #666;
  font-size: 14px!important;
}
.edit-basic-box .stars-style{
  display: inline-block;
  width: 70%;
}
.edit-basic-box .star-box {
  width: 100%;
  float: right;
  padding-right: 10px;
}
.svg-style {
  width: 24px;
  height: 24px;
  fill: #666;
}
.attach-img-box {
  padding-bottom: 10px;
  display: inline-block;
  width: 100%;
  padding-left: 20px;
}
.upload-box{
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  display: inline-block;
  width: 40px;
  text-align: center;
  cursor: pointer;
}
.upload-box .add-icon{
  position: relative;
  top: 10px;
  font-size: 22px;
  color: #bebebe;
}
.hidden{
  display: none;
}
.attach-box img {
  width: 40px;
  height: 40px;
}
.attach-box .img-box{
  position: relative;
  display: inline-block;
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-top: 10px;
}
.delete-img{
  position: absolute;
  left: -6px;
  top: -6px;
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 100%;
  text-align: center;
  background-color: #c63e40;
  color: #fff;
  z-index: 20;
  font-size: 14px;
  cursor: pointer;
}
.sub-input-box {
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  color: #999;
}
.sub-input-box label{
  line-height: 18px;
  width: 27%;
  color: #666;
}
.sub-input-box .area-text{
  display: inline-block;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  padding-right: 17px;
  width: 70% !important;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}
.mui-input-row label~input {
  width: 73%;
}
.sub-input-text {
  position: relative;
  top: 3px;
  right: 26px;
}
.sub-input-box input{
  font-size: 14px;
  width: 70%;
  text-align: right;
  color: #999;
}
.close-icon{
  position: absolute;
  top: 11px;
  left: 66px;
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 21px;
  color: #666;
  z-index: 9999;
}
.record-show {
  position: relative;
}
.subbox-show .go-back,
.subbox-show .sub-go-back{
  height: 48px;
  line-height: 26px;
  color: #666;
  font-size: 14px!important;
}
.subbox-show .save-btn{
  position: relative;
  top: 8px;
  color: #5278e5;
  font-size: 14px;
}
.textarea-box{
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  height: calc(100% - 48px);
  background-color: #fff;
}
.text-input{
  background-color: #fff;
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.text-input textarea{
  display: block;
  width: 100%;
  border: none;
  min-height: 80px;
  margin: 0;
  padding: 10px;
  font-size: 14px;
}
.record-box{
  padding: 10px 20px;
}
.record-box ul,
.record-box ul li{
  list-style: none;
  margin: 0;
  padding: 0;
}
.record-box .add-item{
  border-bottom: none;
}
.record-box .dashed-line{
  position: absolute;
  left: -20px;
  top: 10px;
  display: inline-block;
  width: 20px;
  height: 3px;
  border-top: 1px dashed #ccc;
}
.record-box .white-line {
  position: absolute;
  left: -21px;
  top: -7px;
  display: inline-block;
  width: 3px;
  height: 14px;
  border-left: 1px solid #fff;
}
.last-white-line{
  position: absolute;
  left: -21px;
  top: 9px;
  display: inline-block;
  width: 3px;
  height: 44px;
  border-left: 1px solid #fff;
}
.record-box .add-item .pointer{
  background-color: #5278e5;
  z-index: 20;
}
.add-btn-upload {
  position: relative;
  color: #999;
}
.add-btn-upload .fa{
  font-size: 16px;
  color: #999 !important;
}
.add-btn-upload .add-icon{
  position: absolute;
  font-size: 10px;
  bottom: 10px;
  right: -6px;
}
.add-item .add-btn {
  display: inline-block;
  color: #5278e5;
}
.add-btn .icon{
  display: inline-block;
  width: 14px;
  height: 14px;
  text-align: center;
  line-height: 12px;
  border-radius: 100%;
  background-color: #5278e5;
  margin-right: 5px;
  color: #fff;
}
.record-box ul li{
  border-left: 1px solid #ccc;
  padding-left: 20px;
}
.record-box ul li:last-child .li-box {
  border-bottom: none;
}
.record-box ul li p{
  position: relative;
  margin: 0;
  padding: 0;
}
.li-box {
  padding: 10px 0;
  border-bottom: 1px dashed #ccc;
}
.li-box .pointer{
  position: absolute;
  top: 8px;
  left: -23px;
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: #ccc;
}
.first p{
  color: #666;
  font-size: 16px;
}
.li-box.first .pointer{
  width: 7px;
  height: 7px;
  top: 7px;
  left: -24px;
  background-color: #5278e5;
  box-shadow: 0 0 6px #5278e5;
}
.record-box ul li:nth-child(1) .li-box{
  padding-top: 0;
}
.line-box{
  width: 100%;
  height: 10px;
  background-color: #ebebeb;
}
.no-data{
  margin: 20px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.basic-box {
  padding: 0 10px;
}
.detail-tab{
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #eee;
}
.detail-tab .mui-control-item{
  position: relative;
  border: none;
  border-left: 1px solid #eee;
  color: #999999;
}
.detail-tab .mui-control-item:nth-child(1){
  border-left: none;
}
.detail-tab .mui-active{
  color: #5278e5 !important;
  background-color: #fff !important;
}
.detail-tab .mui-active .active-icon{
  position: absolute;
  left: 50%;
  bottom: 2px;
  display: inline-block;
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background-color: #5278e5;
  -webkit-transform: translate(-50%, 0);
  -moz-transform: translate(-50%, 0);
  -o-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.mui-control-item .msg-style{
  position: absolute;
  right: 24px;
  top: 6px;
  font-size: 14px;
  display: inline-block;
  width: 8px;
  height: 8px;
  line-height: 18px;
  text-align: center;
  background-color: #f14f4f;
  color: #fff;
  border-radius: 100%;
}
.detail-body{
  min-height: 180px;
  background-color: #fff;
}
.detail-body .mui-control-content{
  margin-bottom: 40px;
}
.sub-detail-box{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #999;
  border-bottom: 1px dashed #ccc;
}
.sub-detail-box .edit-icon{
  display: inline-block;
  float: right;
  position: relative;
  top: 4px;
  right: 0;
  color: #5278e5;
  cursor: pointer;
}
.project-sublist .ul-list{
  margin: 0;
  padding: 0;
  background-color: #fff;
  padding-bottom: 20px;
}
.project-sublist .ul-list li{
  display: flex;
  font-size: 14px;
  color: #999;
  padding: 5px 0 0 0;
}
.project-sublist .ul-list li:after{
  background-color: #fff;
}
.c666 {
  color: #666;
}
.list-text{
  display: inline-block;
  width: calc(100% - 82px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}
.alist-text{
  flex-grow: 1;
  display: inline-block;
  width: calc(100% - 90px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}
.attach-list{
}
.attach-list img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.detail-box{
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
.basic-info{
  position: relative;
  background-color: #fff;
  margin: 15px;
  border-radius: 5px;
  padding: 16px 10px 10px 10px;
}
.basic-info label {
  position: relative;
  z-index: 8;
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
}
.basic-info .edit-basic {
  position: absolute;
  right: 0;
  top: 40%;
  display: inline-block;
  width: 20px;
  height: 20px;
  color: #eee;
}
.money{
  color: red;
}
.stars-style{
  height: 24px;
  line-height: 24px;
  text-align: center;
  margin-top: 8px;
}
.stars-style .fa{
  display: inline-block;
  width: 22px;
  height: 22px;
}
.star-box{
  height: 24px;
  margin: 0 auto;
}
.fa-star {
  color: #ffb400;
  font-size: 20px;
}
.fa-star-o {
  color: #aaa;
  font-size: 20px;
}
.fz12{
  font-size: 12px;
  text-align: center;
  color: #99999;
}
.fz16 {
  font-size: 16px;
  text-align: center;
  height: 26px;
  line-height: 24px;
  color: #666;
}
.intro-style{
  padding: 0 10px;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.go-report{
  position: relative;
  height: 48px;
  padding-top: 10px;
  border-top: 1px dashed #ccc;
  margin-top: 10px;
}
.go-report a{
  position: relative;
  top: 2px;
  display: block;
  width: 80%;
  height: 33px;
  text-align: center;
  line-height: 33px;
  margin: 0 auto;
  background-color: #5278e5;
  color: #fff;
  border-radius: 50px;
}
.go-report .icon-circle {
  position: absolute;
  top: -8px;
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background-color: #eee;
}
.go-report .left-circle {
  left: -18px;
}
.go-report .right-circle {
  right: -18px;
}
.must label span{
  color: red;
}
</style>
