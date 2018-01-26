<template>
  <div>
    <div class="more subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left sub-go-back">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title">新建项目</h1>
        <a class="mui-icon mui-pull-right complete"  @click="submit()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>项目名称<i>*</i></label>
            <input type="text" maxlength="20" placeholder="请输入项目名称" v-model="thisdata.name">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>公司名称<i>*</i></label>
            <input type="text" maxlength="20" placeholder="请输入公司名称" v-model="thisdata.first_party_name">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>预计金额<i>*</i></label>
            <span style="float: right;font-size: 14px;color: #999;display: inline-block;margin-left: 3px;">万元</span>
            <input type="number" maxlength="20" style="width: 60% !important" v-model="thisdata.amount" v-on:keyup="money()">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>简单描述<i>*</i></label>
            <input type="text" maxlength="20" placeholder="一句话简单的描述一下项目" v-model="thisdata.sketch">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>项目可行性<i>*</i></label>
            <ul class="start">
              <li v-for="(index,item) in 5" @click="changeStart(index)">
                <i v-bind:class="thisdata.feasibility - index >= 0 ? 'fa-star' : 'fa-star-o'" class="fa mui-icon mui-icon-left-nav mui-pull-right"></i>
              </li>
            </ul>
          </div>
        </li>
        <li class="mui-table-view-cell">
          <a href="javascript:;" class="mui-navigate-right" @click="testone('time')">项目有效期<i>*</i><span>{{cloneValidity}}</span></a>
        </li>
        <li class="mui-table-view-cell" @click="getreport()">
          <a href="javascript:;" class="mui-navigate-right">报备人姓名<i>*</i><span class="mui-ellipsis"> {{thisdata.project_reportman[0].type == 'self' ? thisdata.project_reportman[0].name : cloneInfo.name}}</span></a>
        </li>
        <li class="mui-table-view-cell" @click="enterremork('remark', '添加备注', '500')">
          <a href="javascript:;" class="mui-navigate-right">添加备注<span class="mui-ellipsis">{{thisdata.remark}}</span></a>
        </li>
        <li class="mui-table-view-cell" style="min-height: 43px">
          <span class="upload-box" id="upload_com"  @click="upload_com()">
            <a href="javascript:;">添加附件</a>
            <input class="hidden" type="file" name="files[]" style="width: 75%; display: none;" multiple>
            <span class="add-btn" style="float: right">
              <i class="fa fa-picture-o"></i>
              <i class="fa fa-plus add-icon"></i>
            </span>
          </span>
        </li>
        <li class="mui-table-view-cell" v-if="thisdata.projectAttachment.length > 0">
          <span v-for="(imgitem,imgIndex) in thisdata.projectAttachment" class="posir">
            <img :src="imgitem.file_url" alt=""  class="fjimg">
            <i class="deleteimg" @click="deleteimg(imgIndex)">×</i>
          </span>
        </li>
        <li style="height: 15px; background: #EEEEEE"></li>
        <li class="mui-table-view-cell right0" @click="showmore('.projectInfo')">
          <a href="javascript:;" class="mui-navigate-right ">更多项目信息</a>
        </li>

        <div class="projectInfo">
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>项目编号</label>
              <input type="text" maxlength="20" placeholder="请输入项目编号" v-model="thisdata.number">
            </div>
          </li>
          <li class="mui-table-view-cell "  @click="enterremork('intro', '项目介绍', '500')">
            <a href="javascript:;" class="mui-navigate-right">项目介绍<span class="mui-ellipsis">{{thisdata.intro}}</span></a>
          </li>
          <li class="mui-table-view-cell" @click="enterremork('risk_analysis', '风险分析', '500')">
            <a href="javascript:;" class="mui-navigate-right">风险分析<span class="mui-ellipsis">{{thisdata.risk_analysis}}</span></a>
          </li>
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right"  @click="changeTime('invitation')">招标时间<span>{{thisdata.invitation_time}}</span></a>
          </li>
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right" @click="changeTime('delivery')">交付时间<span>{{thisdata.delivery_time}}</span></a>
          </li>
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right" @click="showClassify()">产品分类<span class="mui-ellipsis">{{furtypeStr}}</span></a>
          </li>
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right"  @click="testone('type')">项目类型<span>{{cloneCategory}}</span></a>
          </li>
        </div>

        <li class="mui-table-view-cell right0"  @click="showmore('.comInfo')">
          <a href="javascript:;" class="mui-navigate-right">更多甲方信息</a>
        </li>

        <div class="comInfo">
          <li class="mui-table-view-cell">
            <a href="javascript:;" class="mui-navigate-right"  @click="testarea()">所属区域<span>{{thisdata.first_party_district_poi_district.text}}</span><span>{{thisdata.first_party_city_poi_city.text}}</span><span>{{thisdata.first_party_province_poi_province.text}}</span></a>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>甲方联系人</label>
              <a href="javascript:;" class="mui-navigate-right" @click="addlinkman()"></a>
            </div>
          </li>
          <div style="padding: 10px 0;border-bottom: 1px solid #eee;" v-show="alinkman.length > 0">
            <div class="sublinkman-style" v-for="sublink in alinkman">{{sublink.name}} / {{sublink.job}} / {{sublink.tel}}</div>
          </div>
        </div>

        <li class="mui-table-view-cell right0" @click="showmore('.reportInfo')">
          <a href="javascript:;" class="mui-navigate-right ">更多报备人信息</a>
        </li>

        <div class="reportInfo">
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>与项目关系</label>
              <input type="text" maxlength="20" placeholder="请输入与项目关系" v-model="thisdata.project_reportman[0].project_relation">
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>期望提成</label>
              <input type="number" placeholder="请输入期望提成" min="0" max="100" v-model="thisdata.project_reportman[0].royalties_expectation">
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>项目优势</label>
              <input type="text" maxlength="20" placeholder="请输入项目优势" v-model="thisdata.project_reportman[0].strengths">
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>联系电话</label>
              <input type="text"  placeholder="请输入联系人电话" v-model="thisdata.project_reportman[0].type == 'self' ? thisdata.project_reportman[0].tel : cloneInfo.tel"  disabled = "thisdata.project_reportman[0].type == 'self' ? true : false"> 
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>联系邮箱</label>
              <input type="text" v-model="thisdata.project_reportman[0].type == 'self' ? thisdata.project_reportman[0].email : cloneInfo.email"  placeholder="请输入联系邮箱"  disabled = "thisdata.project_reportman[0].type == 'self' ? true : false">
            </div>
          </li>
        </div>
        
        <li class="mui-table-view-cell right0" @click="showmore('.jzInfo')">
          <a href="javascript:;" class="mui-navigate-right ">更多竞争优势</a>
        </li>

        <div class="jzInfo">
          <li class="mui-table-view-cell" @click="enterOtherCompete('second_party_competitor','乙方竞争对手')">
            <a href="javascript:;" class="mui-navigate-right ">乙方竞争对手<span class="mui-ellipsis">{{thisdata.second_party_competitor}}</span></a>
          </li>

          <li class="mui-table-view-cell" @click="enterOtherCompete('competitor','报备人对手')">
            <a href="javascript:;" class="mui-navigate-right">报备人对手<span class="mui-ellipsis">{{thisdata.competitor}}</span></a>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>项目亮点</label>
              <input type="text" maxlength="20" placeholder="请输入项目亮点" v-model="thisdata.competitor_strengths">
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>项目形式预测</label>
              <input type="text" maxlength="20" placeholder="请输入项目形式预测" v-model="thisdata.competitor_projections">
            </div>
          </li>
        </div>
      </ul>
      <vue-one :oneobj="oneobj" :onearr="onearr" @getLayerOne="change"></vue-one>
      <vue-area :areaobj="area" :arr="arr" @getLayerThree="changearea"></vue-area>
    </div>
    <div class="other">
      <header class="mui-bar mui-bar-nav subbox-show">
        <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="postReporter('back')">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title">我的项目</h1>
        <a class="mui-icon mui-pull-right complete" @click="postReporter()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <div class="reporter">
          <li class="mui-table-view-cell"> 
            <div class="mui-radio cssradiodiv">
              <input type="radio" name="style" value="self" v-model="thisdata.project_reportman[0].type" @change="changeradio('self')"/> 
              <label>自己</label>
            </div>
            <div class="mui-radio cssradiodiv">
              <input type="radio" name="style" value="other" v-model="thisdata.project_reportman[0].type" @change="changeradio('other')"/> 
              <label>其他人</label>
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label style="width:1%"><i></i></label>
              <input v-if="thisdata.project_reportman[0].type == 'self'" style="width:99%!important;text-align:left;" type="text" maxlength="20" placeholder="请输入报备人姓名" v-model="thisdata.project_reportman[0].name" disabled="thisdata.project_reportman[0].type == 'self' ? true : false" />
              <input v-if="thisdata.project_reportman[0].type == 'other'"  style="width:99%!important;text-align:left;" type="text" maxlength="20" placeholder="请输入报备人姓名" v-model="cloneInfo.name"/>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div class="alinkman">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title">甲方联系人</h1>
        <a class="mui-icon mui-pull-right complete" @click="addlinmanBtn()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell linkmantext" style="padding: 0 !important" v-for="(item, num) in alinkman">
          <div class="jzztitele" style="padding-left: 25px;">
            第{{num+1}}联系人
            <div v-show="num != 0" class="fa fa-times-circle" style="color:red; float: right;width: 10%; margin-top: 8px" @click="deletelinkman(item)"></div>
          </div>
          <div class="mui-input-row" style="border-bottom: 1px solid #eee;padding: 0 10px;">
            <label>联系人姓名</label>
            <input style="width:60%!important" maxlength="20" type="text"  class="mui-input-clear" v-model="item.name"/> 
          </div>
          <div class="mui-input-row" style="border-bottom: 1px solid #eee;padding: 0 10px;">
            <label>联系人职务</label>
            <input style="width:60%!important" maxlength="20" type="text"  class="mui-input-clear" v-model="item.job"/> 
          </div>
          <div class="mui-input-row" style="padding: 0 10px;">
            <label>联系人电话</label>
            <input style="width:60%!important" maxlength="20" type="text"  class="mui-input-clear" v-model="item.tel"/> 
          </div>
        </li>
      </ul>
      <span class="addjjz" @click="addsublinkman()">添加联系人</span>
    </div>
    <div class="otherRemark">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle"></h1>
        <a class="mui-icon mui-pull-right complete" @click="postRremork()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell textareaclass">
          <div class="mui-input-row mui-pull-left"  style="float: left;width: 100%;min-height: 80px;">
            <label style="width:1%"><i></i></label>
            <textarea style="width:99%!important"  type="text" class="mui-input-clear othertextarea"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="otherCompete">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title otherCompetetitle"></h1>
        <a class="mui-icon mui-pull-right complete" @click="endOtherCompete()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell textareaclass jzzli" v-for="(item, num) in jzds">
          <div class="jzztitele">第{{num+1}}竞争者</div>
          <div class="mui-input-row" style="width:60%;float:left;">
            <label style="width:1%"><i></i></label>
            <input style="width:99%!important" maxlength="20" type="text"  class="mui-input-clear othertextarea" v-model="item.value"/> 
          </div>
          <div v-show="num != 0" class="fa fa-times-circle" style="color:red; float: right;width: 10%; margin-top: 14px" @click="deletejzz(item)"></div>
        </li>
      </ul>
      <span class="addjjz" @click="addjjz()">添加竞争者</span>
    </div>
    <vue-tab :acticearr="acticearr" :flag="flag" @submitArr="getclassifyArr"></vue-tab>
  </div>
</template>  
<script>
  import One from '../common/onelayer.vue'
  import Area from '../common/threelayer.vue'
  import Two from '../common/twolayer.vue'
  import Tab from './_tab.vue'
  import axios from '~/plugins/axios'
  let dateJson = require('~/static/js/date.json')
  let url = require('url')
  let ESVal = require('es-validate')
  let Cookies = require('js-cookie')
  let $ = require('jquery')
  let _ = require('underscore')
  let model
  let typeStr
  let changeOneType
  let msInfo = {}
  export default {
    head: {
      title: '新建项目'
    },
    data () {
      return {
        thisdata: {
          name: '',
          first_party_name: '',
          amount: '',
          intro: '',
          feasibility: 3, // '可行性'
          validity: 'three_month',
          remark: '',
          projectAttachment: [], // 附件信息
          sketch: '',
          risk_analysis: '',
          invitation_time: '',
          delivery_time: '',
          project_furniture_types: [], // 商品分类
          category: 'tender',
          number: '',
          first_party_province_poi_province: {
            value: '1',
            text: '北京市'
          },
          first_party_city_poi_city: {
            value: '1',
            text: '北京市'
          },
          first_party_district_poi_district: {
            value: '1',
            text: '东城区'
          },
          first_party_linkman: '',
          first_party_tel: '',
          first_party_job: '',
          project_reportman: [ // 报备人信息
            {
              type: 'self',
              user_poi_reportman: 0,
              name: '',
              tel: '',
              email: '',
              project_relation: '',
              royalties_expectation: '',
              strengths: ''
            }
          ],
          second_party_competitor: '',
          competitor: '',
          competitor_strengths: '',
          competitor_projections: ''
        },
        flag: 0,
        acticearr: [],
        alinkman: [], // 甲方联系人
        onearr: [],
        oneobj: {
          state: 'three_month'
        },
        arr: [],
        area: {
          state: 0,
          province: -1,
          city: -1,
          districts: -1
        },
        cloneValidity: '3个月', // 临时的时间
        cloneCategory: '招标采办', // 临时的项目类型
        classifyArr: [], // 产品分类
        classifyActiveArr: [],
        furtypeStr: '',
        jzds: [], // 竞争对手长度
        info: {},
        linkPath: '',
        layer: '',
        cloneInfo: {
          name: '',
          email: '',
          tel: '',
          type: ''
        } // 临时其他报备人信息
      }
    },
    methods: {
      init: function () {
        let myURL = url.parse(window.location.href)
        model.linkPath = '/' + myURL.pathname.split('/')[1]
        let token = Cookies.get('dpjia-hall-token')
        axios.get('users/cloud_personal?com_id=' + this.$store.state.comid, {
          headers: {
            'X-DP-Token': token
          }
        }).then(function (data) {
          model.info = data.data
          model.thisdata.project_reportman[0].name = data.data.ui_name || '未设置'
          model.thisdata.project_reportman[0].tel = data.data.mobile || ''
          model.thisdata.project_reportman[0].email = data.data.u_email || ''
        }).catch(function (error) {
          if (error.response.data.message === 'token is invalid') {
            window.mui.toast('登录信息过期!')
            setTimeout(function () {
              Cookies.set('dpjia-hall-token', '')
              window.location.href = model.linkPath + '/login'
            }, 2000)
          }
        })
      },

      // 获取产品分类
      getclassifyArr (obj, info) {
        model.furtypeStr = info
        model.acticearr = obj
        model.thisdata.project_furniture_types = obj
      },

      // 添加甲方联系人
      addlinkman: function () {
        if (model.alinkman.length === 0) {
          model.addsublinkman()
        }
        $('.more').hide()
        $('.alinkman').show()
      },

      // 添加多个联系人
      addsublinkman: function () {
        let obj = {
          id: 0,
          name: '',
          job: '',
          tel: '',
          delete: 'no'
        }
        model.alinkman.push(obj)
      },

      // 删除联系人
      deletelinkman: function (item) {
        model.alinkman = _.without(model.alinkman, item)
      },

      // 提交联系人
      addlinmanBtn: function () {
        model.alinkman.forEach((sub) => {
          if (_.isEmpty(sub.name) && _.isEmpty(sub.job) && _.isEmpty(sub.tel)) {
            model.alinkman = _.without(model.alinkman, sub)
          }
        })
        $('.alinkman').hide()
        $('.more').show()
      },

      money: function () {
        if (model.thisdata.amount.indexOf('.') > -1) {
          let length = model.thisdata.amount.indexOf('.')
          model.thisdata.amount = model.thisdata.amount.slice(0, length + 3)
        }
      },

      // 返回首页(云展厅)
      goHome: function () {
        window.location.href = model.linkPath + '/'
      },

      // 添加跟踪记录页面的返回
      goBack: function () {
        $('.more').show()
        $('.other').hide()
        $('.otherRemark').hide()
        $('.otherCompete').hide()
      },

      changeradio: function (value) {
        if (value === 'self') {
          model.thisdata.project_reportman[0].name = model.info.ui_name || '未设置'
          model.thisdata.project_reportman[0].tel = model.info.mobile || ''
          model.thisdata.project_reportman[0].email = model.info.u_email || ''
        } else {
          model.thisdata.project_reportman[0].name = model.cloneInfo.name
          model.thisdata.project_reportman[0].tel = model.cloneInfo.tel
          model.thisdata.project_reportman[0].email = model.cloneInfo.email
        }
      },

      // 提交代码
      submit: function () {
        // 下一步验证
        if (model.thisdata.project_reportman[0].type === 'other') {
          model.thisdata.project_reportman[0].name = model.cloneInfo.name
          model.thisdata.project_reportman[0].tel = model.cloneInfo.tel
          model.thisdata.project_reportman[0].is_self = 'no'
          model.thisdata.project_reportman[0].email = model.cloneInfo.email
        } else {
          model.thisdata.project_reportman[0].is_self = 'yes'
        }
        if (!model.ValidateForm(model.thisdata)) {
          return false
        }
        if (model.thisdata.project_reportman[0].name === '') {
          window.mui.toast('报备人姓名不能为空!')
          return false
        }
        let submitData = _.extend(model.thisdata, {
          first_party_province_poi_province: model.thisdata.first_party_province_poi_province.value,
          first_party_city_poi_city: model.thisdata.first_party_city_poi_city.value,
          first_party_district_poi_district: model.thisdata.first_party_district_poi_district.value,
          project_attachment: JSON.stringify(model.thisdata.projectAttachment),
          project_reportman: JSON.stringify(model.thisdata.project_reportman),
          project_furniture_types: JSON.stringify(model.thisdata.project_furniture_types),
          invitation_time: model.thisdata.invitation_time || '0',
          delivery_time: model.thisdata.delivery_time || '0',
          project_first_party_linkman: JSON.stringify(model.alinkman)
        })
        axios.post('functions/report/project', null, {
          data: submitData
        }).then(function (data) {
          window.mui.toast('创建项目成功')
          window.location.href = model.linkPath + '/report'
        }).catch(function () {
          window.mui.toast('失败!')
        })
      },

      ValidateForm: function (data) {
        let result = ESVal.validate(data, {
          name: {
            required: true,
            msg: '项目名称不能为空!'
          },
          first_party_name: {
            required: true,
            msg: '公司名称不能为空!'
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

      deletejzz: function (item) {
        model.jzds = _.without(model.jzds, item)
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
                model.thisdata.projectAttachment.push({
                  file_url: sub.url,
                  id: 0,
                  delete: 'no'
                })
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

      // 弹出分类模态框
      showClassify: function () {
        model.flag = Math.random()
        $('#classifylist').show()
        $('#classifylist').addClass('animated bounceInRight')
        setTimeout(function () {
          $('#classifylist').removeClass('bounceInRight')
        }, 1000)
      },

      // 添加竞争人
      addjjz: function () {
        model.jzds.push({})
      },

      // 获取报备人
      getreport: function () {
        $('.more').hide()
        $('.other').show()
        $('.reporter').show()
        if (model.thisdata.project_reportman[0].type === 'other') {
          msInfo = {
            name: model.cloneInfo.name,
            tel: model.cloneInfo.tel,
            email: model.cloneInfo.email,
            type: model.thisdata.project_reportman[0].type
          }
        } else {
          msInfo = {
            name: model.thisdata.project_reportman[0].name,
            tel: model.thisdata.project_reportman[0].tel,
            email: model.thisdata.project_reportman[0].email,
            type: model.thisdata.project_reportman[0].type
          }
        }
      },

      postReporter: function (type) {
        $('.more').show()
        $('.other').hide()
        $('.reporter').hide()
        if (type === 'back' && msInfo.type === 'other') {
          model.cloneInfo = {
            name: msInfo.name,
            tel: msInfo.tel,
            email: msInfo.email
          }
          model.thisdata.project_reportman[0].type = msInfo.type // changeraios 的时候发生改变了 要赋值回去
        }
        if (type === 'back' && msInfo.type === 'self') {
          model.thisdata.project_reportman[0].name = msInfo.name
          model.thisdata.project_reportman[0].tel = msInfo.tel
          model.thisdata.project_reportman[0].email = msInfo.email
          model.thisdata.project_reportman[0].type = msInfo.type // changeraios 的时候发生改变了 要赋值回去
        }
      },

      showmore: function (value) {
        if ($(value).hasClass('active')) {
          $(value).removeClass('active')
        } else {
          $(value).addClass('active')
        }
      },

      // 删除附件图片
      deleteimg: function (index) {
        model.thisdata.projectAttachment.splice(index, 1)
      },

      // 进入textarea
      enterremork: function (type, text, num) {
        $('.othertitle').text(text)
        typeStr = type
        $('.more').hide()
        $('.otherRemark').show()
        $('.othertextarea').val(model.thisdata[type])
        $('.othertextarea').attr('maxlength', num)
        $('.othertextarea').attr('placeholder', '请输入' + text + '' + num + '字')
      },

      // 结束textarea
      postRremork: function () {
        $('.more').show()
        $('.otherRemark').hide()
        model.thisdata[typeStr] = $('.othertextarea').val()
      },

      // 开始竞争对手
      enterOtherCompete: function (type, text) {
        let ms = model.thisdata[type].split(',')
        model.jzds = []
        ms.forEach(item => {
          model.jzds.push({value: item})
        })
        $('.otherCompetetitle').text(text)
        typeStr = type
        $('.more').hide()
        $('.otherCompete').show()
        $('.othertextarea').val(model.thisdata[type])
      },
      // 结束竞争对手
      endOtherCompete: function () {
        $('.more').show()
        $('.otherCompete').hide()
        let ms = []
        model.jzds.forEach(item => {
          if (!_.isEmpty(item.value)) {
            ms.push(item.value)
          }
        })
        model.thisdata[typeStr] = ms.join(',')
      },

      // 改变可行性
      changeStart: function (index) {
        this.thisdata.feasibility = index
      },

      // 获取项目类型/月份
      testone: function (type) {
        changeOneType = type
        let param = {}
        model.onearr = []
        if (type === 'time') {
          param = {
            where: {
              state_types: 'report_valtime'
            }
          }
        } else {
          param = {
            where: {
              state_types: 'report_projecttype'
            }
          }
        }
        axios.get('classes/selectable_states', {
          params: param
        }).then(function (data) {
          data.data.items.forEach((item) => {
            model.onearr.push({'value': item.name, 'text': item.alias})
          })
          model.oneobj.state = Math.random()
        })
      },

      // 改变月份
      change: function (val) {
        if (changeOneType === 'time') {
          model.cloneValidity = val[0].text
          model.thisdata.validity = val[0].value
        } else {
          model.cloneCategory = val[0].text
          model.thisdata.category = val[0].value
        }
      },

      // 选择省市区
      changearea: function (val) {
        // 省市区
        if (model.layer === 'area') {
          model.thisdata.first_party_province_poi_province = {
            value: val[0].value,
            text: val[0].text
          }
          model.thisdata.first_party_city_poi_city = {
            value: val[1].value,
            text: val[1].text
          }
          model.thisdata.first_party_district_poi_district = {
            value: val[2].value,
            text: val[2].text
          }
        }
        // 招标时间
        if (model.layer === 'invitation') {
          model.thisdata.invitation_time = val[0].text + '-' + val[1].text + '-' + val[2].text
        }
        // 交付时间
        if (model.layer === 'delivery') {
          model.thisdata.delivery_time = val[0].text + '-' + val[1].text + '-' + val[2].text
        }
      },

      // 招标时间
      changeTime: function (str) {
        model.layer = str
        model.arr = dateJson
        model.area.state = Math.random()
      },

      // 省市区三级联动
      testarea: async function () {
        model.layer = 'area'
        model.arr = []

        // 省
        let paramp = {
          limit: 100
        }
        let prodata = await axios.get('classes/province', {
          params: paramp
        })
        // 市
        let paramc = {
          limit: 500
        }
        let citydata = await axios.get('classes/city', {
          params: paramc
        })
        // 区
        let paramd = {
          limit: 3000
        }
        let disdata = await axios.get('classes/district', {
          params: paramd
        })
        prodata.data.items.forEach((p) => {
          let tp = {
            'value': p.id,
            'text': p.ProvinceName,
            'children': []
          }
          citydata.data.items.forEach((c) => {
            if (c.ProvinceID === p.id) {
              let cp = {
                'value': c.id,
                'text': c.CityName,
                'children': []
              }
              disdata.data.items.forEach((d) => {
                if (d.CityID === c.id) {
                  let dp = {
                    'value': d.id,
                    'text': d.DistrictName
                  }
                  cp.children.push(dp)
                }
              })
              tp.children.push(cp)
            }
          })
          model.arr.push(tp)
        })
        model.area.state = Math.random()
      }
    },
    components: {
      'vue-area': Area,
      'vue-two': Two,
      'vue-one': One,
      'vue-tab': Tab
    },
    mounted () {
      model = this
      model.init()
    }
  }
</script>
<style lang="">
  .sublinkman-style {
    font-size: 14px;
    color: #ccc;
    text-align: right;
    padding: 0 20px;
    height: 24px;
    line-height: 24px;
  }
  .add-btn {
    position: relative;
    color: #999;
  }
  .add-btn .fa{
    font-size: 16px;
    color: #999 !important;
  }
  .add-btn .add-icon{
    position: absolute;
    font-size: 10px;
    bottom: 10px;
    right: -6px;
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
  .other, .otherRemark,.reporter,.otherCompete, .jzInfo, .reportInfo, .comInfo, .projectInfo, .alinkman{
    display: none;
  }
  .jzInfo, .reportInfo, .projectInfo{
    border-bottom: 1px solid #DBDBDD;
  }
  .jzInfo.active,.reportInfo.active,.comInfo.active,.projectInfo.active{
    display: block
  }
  .jzztitele {
    margin: 0 -15px;
    font-size: 14px;
    background: #eee;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    color: #969696;
  }
  .nav li.show{
    height: auto;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .right0 .mui-navigate-right:after{
    right: auto;
    top: 37%;
    transform:rotate(90deg);
    margin-left: 5px;
  }
  .right0 .mui-navigate-right {
    text-align: center;
    color: #999 !important;
    margin-right: 5px;
  }
  .right0 a {
    color: #999 !important;
  }
  .mui-input-row {
    height: 43px;
  }
  .mui-input-row label {
    height: 43px;
    padding: 0;
    line-height: 43px;
    font-size: 14px;
    width: 25%;
  }
  .mui-input-row input{
    font-size: 14px;
    padding: 0;
    line-height: 43px;
    height: 43px;
    width: 75%!important;
    text-align: right;
    color: #999;
  }
  .nav {
    margin-top: 48px;
  }
  .close-icon{
    position: absolute;
    top: 11px;
    left: 66px;
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #666;
    z-index: 9999;
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
  .nav li i.fa-star{
    color: #FFBE00;
  }
  .nav li i.fa-star-o{
    color: #FFBE00;
  }
  .mui-table-view-cell{
    padding: 0 15px!important;
  }
  .mui-table-view-cell>a:not(.mui-btn){
    margin: 0;
    padding: 0px;
  }
  .mui-table-view-cell:after {
    left: 0
  }
  .liul{
    padding: 0;
  }
  .mui-navigate-right:after, .mui-push-right:after {
    right: 0px;
  }
  .start{
    padding:0;
    float: right;
    margin-top: 12px;
  }
  .start li{
    float: left;
    width: 20px; 
    height: 20px;
    list-style-type: none
  }
  .mui-table-view-cell a span{
    float: right;
    color: #969696;
    font-size: 14px;
    margin-right: 20px;
  }
  .mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn) {
    margin: 0;
  }
  .baobdiv{
    float: left;
  }
  .cssradiodiv {
    float: left;
  }
  .cssradiodiv label{
    font-size: 14px;
    margin-left: 27px;
    padding-right: 20px;
  }
  .mui-radio input[type=radio]:before {
    font-size: 20px;
  }
  .mui-radio input[type=radio] {
    top: 13px;
    left: 0px;
  }
  .nav li.linkmantext {
    min-height: 80px;
  }
  .nav li.textareaclass textarea{
    font-size: 14px;
    padding:10px 0;
  }
  .complete{
    font-size: 14px!important;
    line-height: 48px;
    padding: 0 10px!important;
    color: #5278e5;
  }
  .mui-ellipsis{
    max-width: 70%;
  }
  .nav li.jzzli{
    height: 74px !important;
  }
  .jzzli input {
    text-align: left;
  }
  .addjjz {
    font-size: 14px;
    float: right;
    margin-top: 5px;
    color: #666;
    text-align: right;
    margin-right: 15px;
    margin-bottom: 40px;
  }
  .fjimg{
    width: 40px;
    height: 40px;
    display: inline-block;
    margin-top: 8px;
    margin-right: 8px;
  }
  .deleteimg{
    position: absolute;
    left: -8px;
    top: 2px;
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border-radius: 100%;
    text-align: center;
    background-color: #c63e40;
    color: #fff !important;
    z-index: 999;
    font-size: 14px;
    cursor: pointer;
  }
  .posir{
    position: relative;
    display: inline-block;
    height: 48px;
  }
  
</style>