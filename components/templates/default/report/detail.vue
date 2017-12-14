
<template>
  <div>
    <div v-show="activeTab == 'home'">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">项目详情</h1>
        <a href="javascript:;" class="mui-pull-right register-link">...</a>
      </header>
      <div class="detail-box">
        <div class="basic-info">
          <label>
            <span class="money">{{basicinfo.amount}}万元</span>·<span>{{basicinfo.name}}</span>
          </label>
          <div class="stars-style">
            <span class="star-box">
              <i class="fa mui-action-back mui-icon mui-icon-left-nav mui-pull-right" v-for="sub in stars" aria-hidden="true" v-bind:class="sub <= basicinfo.feasibility ? 'fa-star' : 'fa-star-o'"></i>
            </span>
          </div>
          <div class="fz14">{{basicinfo.first_party_name}}</div>
          <div class="fz14 intro-style">{{basicinfo.intro}}</div>
          <div class="fz12">
            <span>有效期{{valtimeFilter(basicinfo.validity)}}</span>
            <span>创建时间:{{forMatTime(basicinfo.create_time)}}</span>
          </div>
          <div class="go-report">
            <a href="javascript:;">去报备</a>
          </div>
        </div>
        <div class="sub-detail">
          <div class="mui-segmented-control detail-tab">
            <a class="mui-control-item mui-active" href="#projectdetail">
              <span>项目介绍</span>
              <span class="active-icon"></span>
            </a>
            <a class="mui-control-item" href="#reportrecord">
              <span>报备记录</span>
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
                    <label>项目信息</label>
                    <span class="edit-icon" @click="editProject(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'wait_handle' || basicinfo.state == 'had_reset'">
                      <span class="fa fa-edit"></span>
                      <span>编辑</span>
                    </span>
                  </div>
                  <div class="project-sublist">
                    <ul class="ul-list">
                      <li class="mui-table-view-cell">
                        <span>项目编号：</span>
                        <span class="list-text">{{basicinfo.number}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>招标时间：</span>
                        <span class="list-text">{{forMatTime(basicinfo.invitation_time, 'YYYY-MM-DD')}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>交付时间：</span>
                        <span class="list-text">{{forMatTime(basicinfo.delivery_time, 'YYYY-MM-DD')}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目类型：</span>
                        <span class="list-text">{{basicinfo.category}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>产品品类：</span>
                        <span class="list-text">{{basicinfo.invitation_time}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目介绍：</span>
                        <span class="list-text">{{basicinfo.intro}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>风险分析：</span>
                        <span class="list-text">{{basicinfo.risk_analysis}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>上传附件：</span>
                        <p class="attach-list">
                          <img :src="sub.file_url" v-for="sub in (basicinfo.project_rel_project_attachment || {}).items">
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="line-box"></div>
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>甲方信息</label>
                    <span class="edit-icon" @click="editBuyer(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'wait_handle' || basicinfo.state == 'had_reset'">
                      <span class="fa fa-edit"></span>
                      <span>编辑</span>
                    </span>
                  </div>
                  <div class="project-sublist">
                    <ul class="ul-list">
                      <li class="mui-table-view-cell">
                        <span>所属区域：</span>
                        <span class="alist-text">{{(basicinfo.first_party_province_poi_province || {}).ProvinceName}}-{{(basicinfo.first_party_city_poi_city || {}).CityName}}-{{(basicinfo.first_party_district_poi_district || {}).DistrictName}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系人姓名：</span>
                        <span class="alist-text">{{basicinfo.first_party_linkman}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系人职务：</span>
                        <span class="alist-text">{{basicinfo.first_party_job}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系人电话：</span>
                        <span class="alist-text">{{basicinfo.first_party_tel}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="line-box"></div>
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>报备人信息</label>
                    <span class="edit-icon" v-show="basicinfo.state == 'wait' || basicinfo.state == 'wait_handle' || basicinfo.state == 'had_reset'">
                      <span class="fa fa-edit"></span>
                      <span>编辑</span>
                    </span>
                  </div>
                  <div class="project-sublist">
                    <ul class="ul-list">
                      <li class="mui-table-view-cell">
                        <span>姓名：</span>
                        <span class="alist-text">{{(reportman.user_poi_reportman || {}).name}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目关系：</span>
                        <span class="alist-text">{{reportman.project_relation}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>期望提成：</span>
                        <span class="alist-text">{{reportman.royalties_expectation ? reportman.royalties_expectation + '%' : ''}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目优势：</span>
                        <span class="alist-text">{{reportman.strengths}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系电话：</span>
                        <span class="alist-text">{{(reportman.user_poi_reportman || {}).tel}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系邮箱：</span>
                        <span class="alist-text">{{(reportman.user_poi_reportman || {}).email}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="line-box"></div>
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>竞争信息</label>
                    <span class="edit-icon" @click="editCompetitors(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'wait_handle' || basicinfo.state == 'had_reset'">
                      <span class="fa fa-edit"></span>
                      <span>编辑</span>
                    </span>
                  </div>
                  <div class="project-sublist">
                    <ul class="ul-list">
                      <li class="mui-table-view-cell">
                        <span>乙方对手：</span>
                        <span class="alist-text">{{basicinfo.second_party_competitor}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>竞争对手：</span>
                        <span class="alist-text">{{basicinfo.competitor}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目亮点：</span>
                        <span class="alist-text">{{basicinfo.competitor_strengths}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>形式预测：</span>
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
                          <span>{{sub.name}}</span>
                          <span>{{sub.state}}</span>
                          <span>了项目</span>
                          <span>[备注]{{sub.remark}}</span>
                        </p>
                        <p>{{forMatTime(sub.time)}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <p class="no-data" v-show="reportLoglist.length == 0">您还没有报备项目,暂无报备日志哦~</p>
              </div>
              <div id="reportlog" class="mui-control-content">
                <div class="record-box">
                  <ul>
                    <li>
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
                          <span class="last-white-line" v-show="num == (recordLoglist.length - 1)"></span>
                          <span class="pointer"></span>
                          <span>{{sub.remark}}</span>
                        </p>
                        <p>{{forMatTime(sub.create_time)}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <p class="no-data" v-show="recordLoglist.length == 0">您还没有添加任务项目跟踪记录~</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'record'" class="subbox-show record-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">进度跟踪</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confAddRecord()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div class="text-input">
          <textarea type="text" v-model="recordtext"  class="mui-input-clear" placeholder="输入项目的跟着记录"></textarea>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'editproject'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">编辑项目信息</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confEditPro()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div>
          <div class="mui-input-row sub-input-box">
						<label>项目编号</label>
						<input type="text" placeholder="输入项目编号" v-model="editpro.name">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>招标时间</label>
						<input type="text" placeholder="输入招标时间" v-model="editpro.name">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>交付时间</label>
						<input type="text" placeholder="输入交付时间" v-model="editpro.name">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>产品品类</label>
						<input type="text" placeholder="输入产品品类" v-model="editpro.name">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>项目类型</label>
						<input type="text" placeholder="输入项目类型" v-model="editpro.name">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>项目介绍</label>
						<input type="text" placeholder="输入项目介绍" v-model="editpro.name">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>风险分析</label>
						<input type="text" placeholder="输入风险分析" v-model="editpro.name">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>附件信息</label>
						<input type="text" placeholder="普通输入框" v-model="editpro.name">
					</div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'editbuyer'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">编辑甲方信息</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confEditBuyer()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div>
          <div class="mui-input-row sub-input-box">
						<label>所属区域</label>
            <span class="area-text" @click="changeAre()">{{buyer.area}}</span>
					</div>
          <div class="mui-input-row sub-input-box">
						<label>联系人姓名</label>
						<input type="text" placeholder="输入联系人姓名" v-model="buyer.first_party_linkman">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>联系人职务</label>
						<input type="text" placeholder="输入联系人职务" v-model="buyer.first_party_job">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>联系人电话</label>
						<input type="text" placeholder="输入联系人电话" v-model="buyer.first_party_tel">
					</div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'editreport'">
    </div>
    <div v-show="activeTab == 'editcompetitors'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">编辑竞争信息</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confEditComp()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div>
          <div class="mui-input-row sub-input-box">
						<label>乙方对手</label>
						<input type="text" placeholder="输入乙方对手" v-model="competitors.second_party_competitor">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>竞争对手</label>
						<input type="text" placeholder="输入竞争对手" v-model="competitors.competitor">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>项目亮点</label>
						<input type="text" placeholder="输入项目亮点" v-model="competitors.competitor_strengths">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>形式预测</label>
						<input type="text" placeholder="输入形式预测" v-model="competitors.competitor_projections">
					</div>
        </div>
      </div>
    </div>
    <div>
      <vue-area :areaobj="areaobj" :arr="areaarr" @getLayerThree="getArea"></vue-area>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import Area from '../common/threelayer.vue'
let url = require('url')
let querystring = require('querystring')
let _ = require('underscore')
let Cookies = require('js-cookie')
let moment = require('moment')
let model
let proId
export default {
  data () {
    return {
      areaarr: [],
      areaobj: {
        state: 0
      },
      activeTab: 'home',
      basicinfo: {},
      reportman: {},
      linkPath: '',
      stars: [5, 4, 3, 2, 1],
      recordtext: '',
      reportLoglist: [
        {
          id: '1',
          name: '张三',
          pro: '京乐科技办公楼改造',
          state: '已驳回',
          remark: '这个项目还不错',
          time: '1484816933435'
        },
        {
          id: '1',
          name: '张三',
          pro: '京乐科技办公楼改造',
          state: '已驳回',
          remark: '这个项目还不错',
          time: '1484816933435'
        },
        {
          id: '1',
          name: '张三',
          pro: '京乐科技办公楼改造',
          state: '已驳回',
          remark: '这个项目还不错',
          time: '1484816933435'
        },
        {
          id: '1',
          name: '张三',
          pro: '京乐科技办公楼改造',
          state: '已驳回',
          remark: '这个项目还不错',
          time: '1484816933435'
        }
      ],
      recordLoglist: [],
      editpro: {},
      buyer: {},
      competitors: {}
    }
  },
  components: {
    'vue-area': Area
  },
  methods: {
    init: async function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let urlObj = querystring.parse(myURL.query)
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
            key: 'project_poi_projects',
            include: [
              {
                table: 'type_poi_furniture_types',
                keys: 'id,type_name'
              }
            ]
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
          }
        ]
      }
      let getresult = await axios.get('classes/projects?id=' + urlObj.id, {
        params: {
          with: rel
        }
      })
      model.basicinfo = getresult.data
      model.reportman = ((getresult.data.project_rel_project_reportman || {}).items || [])[0] || {}
      await model.getReportLog(urlObj.id)
      await model.getRecordLog(urlObj.id)
    },

    // 获取报备记录
    getReportLog: function (id) {
    },

    // 获取项目跟踪记录
    getRecordLog: async function (id) {
      let param = {
        where: {
          project_poi_projects: id
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
      model.activeTab = 'record'
      proId = id
    },

    // 确定添加跟踪记录
    confAddRecord: function () {
      if (!model.recordtext) {
        window.mui.toast('跟踪记录为空！')
        return
      }
      let param = {
        project_poi_projects: proId,
        remark: model.recordtext
      }
      axios.post('functions/report/project_track', null, {
        data: param
      }).then(function (data) {
        model.recordLoglist.unshift(data.data)
        window.mui.toast('添加跟踪记录成功！')
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
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

    // 时间格式化
    forMatTime: function (value, type) {
      if (_.isEmpty(value) || parseInt(value) === 0) { return '' }
      moment.locale('Chinese (Simplified)')
      let timetype = type || 'YYYY-MM-DD HH:mm:ss'
      return moment(parseInt(value)).format(timetype)
    },

    // 有效期过滤
    valtimeFilter: async function (str) {
      let res = ''
      let stateData = Cookies.get('report-valtime') || '[]'
      let stateObj
      if (stateData) {
        stateObj = JSON.parse(stateData)
      }
      if (stateObj.length > 0) {
        stateObj.forEach((item) => {
          if (item.name === str) {
            res = item.alias
          }
        })
      } else {
        let param = {
          where: {
            state_types: 'report_valtime'
          }
        }
        let res = await axios.get('classes/selectable_states', {params: param})
        res.data.items.forEach((item) => {
          if (item.name === str) {
            res = item.alias
          }
        })
      }
      return res
    },

    // 编辑项目信息
    editProject: function (id) {
      model.activeTab = 'editproject'
      proId = id
    },

    // 编辑甲方信息
    editBuyer: function (id) {
      model.buyer = {
        area: (model.basicinfo.first_party_province_poi_province || {}).ProvinceName + '-' + (model.basicinfo.first_party_city_poi_city || {}).CityName + '-' + (model.basicinfo.first_party_district_poi_district || {}).DistrictName,
        pro_id: (model.basicinfo.first_party_province_poi_province || {}).id,
        city_id: (model.basicinfo.first_party_city_poi_city || {}).id,
        dis_id: (model.basicinfo.first_party_district_poi_district || {}).id,
        first_party_linkman: model.basicinfo.first_party_linkman,
        first_party_job: model.basicinfo.first_party_job,
        first_party_tel: model.basicinfo.first_party_tel
      }
      model.activeTab = 'editbuyer'
      proId = id
    },

    // 选择地区
    changeAre: function () {
      model.areaobj.state = Math.random()
    },

    // 获取选择地区信息
    getArea: function (str) {
      model.buyer.area = str[0].text + '-' + str[1].text + '-' + str[2].text
      model.buyer.pro_id = str[0].value || 1
      model.buyer.city_id = str[1].value || 1
      model.buyer.dis_id = str[2].value || 1
    },

    // 确认保存甲方信息
    confEditBuyer: function () {
      let param = {
        id: proId,
        first_party_province_poi_province: model.buyer.pro_id,
        first_party_city_poi_city: model.buyer.city_id,
        first_party_district_poi_district: model.buyer.dis_id,
        first_party_linkman: model.buyer.first_party_linkman || '',
        first_party_job: model.buyer.first_party_job || '',
        first_party_tel: model.buyer.first_party_tel || ''
      }
      axios.put('functions/report/project', null, {
        data: param
      }).then(function (data) {
        model.basicinfo.first_party_province_poi_province = {
          id: model.buyer.pro_id,
          ProvinceName: model.buyer.area.split('-')[0]
        }
        model.basicinfo.first_party_city_poi_city = {
          id: model.buyer.city_id,
          CityName: model.buyer.area.split('-')[1]
        }
        model.basicinfo.first_party_district_poi_district = {
          id: model.buyer.dis_id,
          DistrictName: model.buyer.area.split('-')[2]
        }
        model.basicinfo.first_party_linkman = model.buyer.first_party_linkman
        model.basicinfo.first_party_job = model.buyer.first_party_job
        model.basicinfo.first_party_tel = model.buyer.first_party_tel
        window.mui.toast('编辑甲方信息成功')
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
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

    // 编辑竞争信息
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

    // 确定提交竞争信息
    confEditComp: function () {
      let param = {
        id: proId,
        second_party_competitor: model.competitors.second_party_competitor || '',
        competitor: model.competitors.competitor || '',
        competitor_strengths: model.competitors.competitor_strengths || '',
        competitor_projections: model.competitors.competitor_projections || ''
      }
      axios.put('functions/report/project', null, {
        data: param
      }).then(function (data) {
        model.basicinfo.second_party_competitor = model.competitors.second_party_competitor
        model.basicinfo.competitor = model.competitors.competitor
        model.basicinfo.competitor_strengths = model.competitors.competitor_strengths
        model.basicinfo.competitor_projections = model.competitors.competitor_projections
        window.mui.toast('编辑竞争信息成功')
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.reload()
          }, 2000)
        }
      })
      console.log(model.competitors)
    }
  },
  mounted () {
    model = this
    model.init()
  }
}
</script>
<style>
.sub-input-box {
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  color: #999;
}
.sub-input-box label{
  line-height: 18px;
  width: 30%;
}
.sub-input-box .area-text{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding-right: 10px;
  width: 70%;
  text-align: right;
}
.sub-input-box input{
  font-size: 14px;
  width: 70%;
  text-align: right;
}
.close-icon{
  position: absolute;
  top: 10px;
  left: 66px;
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #666;
  z-index: 9999;
}
.record-show {
  position: relative;
}
.subbox-show .go-back{
  position: relative;
  top: 5px;
  color: #666;
  font-size: 14px;
}
.subbox-show .save-btn{
  position: relative;
  top: 6px;
  color: #666;
  font-size: 14px;
}
.textarea-box{
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
}
.text-input{
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.text-input textarea{
  display: block;
  width: 100%;
  border: none;
  min-height: 60px;
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
  z-index: 100;
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
  border-left: 1px dashed #ccc;
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
  border-left: 1px solid #ccc;
  color: #999999;
}
.detail-tab .mui-control-item:nth-child(1){
  border-left: none;
}
.detail-tab .mui-active{
  color: #5278e5;
  background-color: #fff;
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
  font-size: 14px;
  color: #999;
  padding: 5px 0 0 0;
}
.project-sublist .ul-list li:after{
  background-color: #fff;
}
.list-text{
  position: relative;
  top: 6px;
  display: inline-block;
  width: calc(100% - 74px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.alist-text{
  position: relative;
  top: 6px;
  display: inline-block;
  width: calc(100% - 90px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.attach-list{
  padding-left: 70px;
  position: relative;
  top: -14px;
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
  background-color: #fff;
  margin: 15px;
  border-radius: 5px;
  padding: 20px 10px 10px 10px;
}
.basic-info label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center;
}
.money{
  color: red;
}
.stars-style{
  height: 24px;
  line-height: 24px;
  text-align: center;
  margin-top: 14px;
  margin-bottom: 5px;
}
.stars-style .fa{
  display: inline-block;
  width: 22px;
  height: 22px;
}
.star-box{
  display: block;
  width: 112px;
  height: 24px;
  margin: 0 auto;
}
.fa-star {
  color: #ffb400;
  font-size: 20px;
}
.fa-star-o {
  color: #ccc;
  font-size: 20px;
}
.fz12{
  font-size: 12px;
  text-align: center;
  color: #696969;
}
.fz14 {
  font-size: 14px;
  text-align: center;
  height: 26px;
  line-height: 24px;
  color: #696969;
}
.intro-style{
  padding: 0 10px;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.go-report{
  height: 40px;
  padding-top: 10px;
  border-top: 1px dashed #ccc;
}
.go-report a{
  display: block;
  width: 80%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  background-color: #5278e5;
  color: #fff;
  border-radius: 50px;
}
</style>
