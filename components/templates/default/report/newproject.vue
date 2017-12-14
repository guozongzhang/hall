<template>
  <div>
    <div class="more">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">我的项目</h1>
        <a class="mui-icon mui-pull-right complete"  @click="submit()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>项目名称<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入项目名称" v-model="thisdata.name">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>公司名称<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入公司名称" v-model="thisdata.first_party_name">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>预计金额<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="万元" v-model="thisdata.amount">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>简单描述<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="" v-model="thisdata.sketch">
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
          <a href="javascript:;" class="mui-navigate-right" @click="testone('time')">项目有效期<span>{{cloneValidity}}</span></a>
        </li>
        <li class="mui-table-view-cell" @click="getreport()">
          <a href="javascript:;" class="mui-navigate-right">报备人姓名<span class="mui-ellipsis">{{thisdata.project_reportman[0].name}}</span></a>
        </li>
        <li class="mui-table-view-cell" @click="enterremork('remark', '添加备注')">
          <a href="javascript:;" class="mui-navigate-right">添加备注<span class="mui-ellipsis">{{thisdata.remark}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a href="" class="mui-navigate-right">添加附件</a>
        </li>
        <li style="height: 15px; background: #EEEEEE"></li>
        <li class="mui-table-view-cell right0" @click="show($event)">
          <a href="javascript:;" class="mui-navigate-right ">更多项目信息</a>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>项目编号<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入项目编号" v-model="thisdata.number">
          </div>
        </li>
        <li class="mui-table-view-cell"  @click="enterremork('intro', '项目介绍')">
          <a href="javascript:;" class="mui-navigate-right">项目介绍<span>500字</span></a>
        </li>
        <li class="mui-table-view-cell" @click="enterremork('risk_analysis', '风险分析')">
          <a href="javascript:;" class="mui-navigate-right">风险分析<span>500字</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a href="" class="mui-navigate-right">招标时间</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="" class="mui-navigate-right">交付时间</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="" class="mui-navigate-right">产品分类</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="javascript:;" class="mui-navigate-right"  @click="testone('type')">项目类型<span>{{cloneCategory}}</span></a>
        </li>

        <li class="mui-table-view-cell right0">
          <a href="" class="mui-navigate-right">更多甲方信息</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="javascript:;" class="mui-navigate-right"  @click="testarea()">所属区域<span>{{thisdata.first_party_province_poi_province.text}}</span><span>{{thisdata.first_party_city_poi_city.text}}</span><span>{{thisdata.first_party_district_poi_district.text}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>联系人姓名<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入项目编号" v-model="thisdata.first_party_linkman">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>联系人职务<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入联系人职务" v-model="thisdata.first_party_job">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>联系人电话<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话" v-model="thisdata.first_party_tel">
          </div>
        </li>

        <li class="mui-table-view-cell right0">
          <a href="" class="mui-navigate-right ">更多报备信息</a>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>与项目关系<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入与项目关系" v-model="thisdata.project_reportman[0].project_relation">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>期望提成<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入期望提成" v-model="thisdata.project_reportman[0].royalties_expectation">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>项目优势<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入项目优势" v-model="thisdata.project_reportman[0].strengths">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>联系电话<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话" v-model="thisdata.project_reportman[0].tel">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>联系邮箱<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入联系邮箱" v-model="thisdata.project_reportman[0].email">
          </div>
        </li>

        <li class="mui-table-view-cell right0">
          <a href="" class="mui-navigate-right ">更多竞争优势</a>
        </li>
        <li class="mui-table-view-cell" @click="enterOtherCompete('second_party_competitor','己方竞争对手')">
          <a href="javascript:;" class="mui-navigate-right ">己方竞争对手</a>
        </li>

        <li class="mui-table-view-cell" @click="enterOtherCompete('competitor','报备人对手')">
          <a href="javascript:;" class="mui-navigate-right">报备人对手</a>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>项目亮点<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入项目亮点" v-model="thisdata.competitor_strengths">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>项目形式预测<i>*</i></label>
            <input type="text"  class="mui-input-clear" placeholder="请输入项目形式预测" v-model="thisdata.competitor_projections">
          </div>
        </li>
      </ul>
      <vue-one :oneobj="oneobj" :onearr="onearr" @getLayerOne="change"></vue-one>
      <vue-area :areaobj="area" :arr="arr" @getLayerThree="changearea"></vue-area>
    </div>
    <div class="other">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">我的项目</h1>
        <a class="mui-icon mui-pull-right complete" @click="postReporter()">完成</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <div class="reporter">
          <li class="mui-table-view-cell"> 
            <div class="mui-radio cssradiodiv">
              <input type="radio" name="style" value="self" v-model="thisdata.project_reportman[0].type"/> 
              <label>自己</label> {{thisdata.project_reportman[0].type}}
            </div>
            <div class="mui-radio cssradiodiv">
              <input type="radio" name="style" value="other" v-model="thisdata.project_reportman[0].type"/> 
              <label>其他人</label>
            </div>
          </li>
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label style="width:1%"><i></i></label>
              <input v-if="thisdata.project_reportman[0].type == 'self'" style="width:99%!important;text-align:left;" type="text"  class="mui-input-clear" placeholder="请输入报备人姓名" v-model="thisdata.project_reportman[0].name" disabled="thisdata.project_reportman[0].type == 'self' ? true : false" />
              <input v-if="thisdata.project_reportman[0].type == 'other'"  style="width:99%!important;text-align:left;" type="text"  class="mui-input-clear" placeholder="请输入报备人姓名" v-model="thisdata.project_reportman[0].clonename"/>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div class="otherRemark">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title othertitle"></h1>
        <a class="mui-icon mui-pull-right complete" @click="postRremork()">完成</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell textareaclass">
          <div class="mui-input-row mui-pull-left"  style="float: left;width: 100%;height: 80px;">
            <label style="width:1%"><i></i></label>
            <textarea style="width:99%!important" type="text"  class="mui-input-clear othertextarea" placeholder="请输入备注"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="otherCompete">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title otherCompetetitle"></h1>
        <a class="mui-icon mui-pull-right complete" @click="endOtherCompete()">完成</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell textareaclass jzzli" v-for="(item,index) in jzds">
          <div class="jzztitele">第{{index+1}}竞争者</div>
          <div class="mui-input-row" style="width:60%;float:left;">
            <label style="width:1%"><i></i></label>
            <input style="width:99%!important" type="text"  class="mui-input-clear othertextarea" v-model="item.value"/> 
          </div>
          <div class="fa fa-trash" style="float: left;width: 10%; margin-top: 14px" @click="deletejzz(item, index)"></div>
        </li>
      </ul>
      <span class="addjjz" @click="addjjz()" v-show="jzds.length < 3">添加竞争者</span>
    </div>
  </div>
</template>  
<script>
  import One from '../common/onelayer.vue'
  import Area from '../common/threelayer.vue'
  import Two from '../common/twolayer.vue'
  import axios from '~/plugins/axios'
  let Cookies = require('js-cookie')
  let $ = require('jquery')
  let _ = require('underscore')
  let model
  let typeStr
  let changeOneType
  export default {
    head: {
      title: '我的项目'
    },
    data () {
      return {
        thisdata: {
          name: '项目名称',
          first_party_name: '甲方名称',
          amount: '项目金额',
          intro: '项目介绍',
          feasibility: 4, // '可行性'
          validity: 'three_month',
          remark: '备注',
          project_attachment: [ // 附件信息
            {
              file_url: '',
              id: 0,
              delete: 'no'
            },
            {
              file_url: '',
              id: 0,
              delete: 'no'
            }
          ],
          sketch: '简单描述',
          risk_analysis: '风险',
          invitation_time: '招标时间',
          delivery_time: '交付时间',
          project_furniture_types: [
            {
              type_poi_furniture_types: 0,
              name: '',
              id: 0,
              delete: 'no'
            }
          ],
          category: 'tender',
          number: '项目编号',
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
            text: '海淀区'
          },
          first_party_linkman: '甲方联系人',
          first_party_tel: '甲方联系电话',
          first_party_job: '甲方联系人职务',
          project_reportman: [ // 报备人信息
            {
              type: 'self',
              user_poi_reportman: 0,
              clonename: '',
              name: '',
              tel: '',
              email: '',
              project_relation: '项目关系',
              royalties_expectation: '期望提成',
              strengths: '优势'
            }
          ],
          second_party_competitor: '己方竞争对手,明天',
          competitor: '竞争对手',
          competitor_strengths: '竞争对手-亮点',
          competitor_projections: '竞争对手-形势预测',
          state: 'wait'
        },

        onearr: [
        ],
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
        jzds: [] // 竞争对手长度
      }
    },
    methods: {
      init: function () {
        let token = Cookies.get('dpjia-hall-token')
        axios.get('users/cloud_personal?com_id=' + this.$store.state.comid, {
          headers: {
            'X-DP-Token': token
          }
        }).then(function (data) {
          model.thisdata.project_reportman[0].name = data.data.ui_name || '未设置'
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

      submit: function () {
        if (model.thisdata.project_reportman[0].type === 'other') {
          model.thisdata.project_reportman[0].name = model.thisdata.project_reportman[0].clonename
        }
        let ssdata = _.extend(model.thisdata, {
          first_party_province_poi_province: model.thisdata.first_party_province_poi_province.value,
          first_party_city_poi_city: model.thisdata.first_party_city_poi_city.value,
          first_party_district_poi_district: model.thisdata.first_party_district_poi_district.value,
          project_attachment: JSON.stringify(model.thisdata.project_attachment),
          project_reportman: JSON.stringify(model.thisdata.project_reportman),
          project_furniture_types: JSON.stringify(model.thisdata.project_furniture_types)
        })
        // console.log(ssdata)
        axios.post('functions/report/project', null, {
          data: ssdata
        }).then(function (data) {
        }).catch(function () {
          window.mui.toast('失败!')
        })
      },

      deletejzz: function (item, index) {
        model.jzds.splice(index, 1)
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
      },

      postReporter: function () {
        $('.more').show()
        $('.other').hide()
        $('.reporter').hide()
      },

      // 进入textarea
      enterremork: function (type, text) {
        $('.othertitle').text(text)
        typeStr = type
        $('.more').hide()
        $('.otherRemark').show()
        $('.othertextarea').val(model.thisdata[type])
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
        console.log(ms)
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
          ms.push(item.value)
        })
        model.thisdata[typeStr] = ms.join(',')
      },

      // 提交新建项目
      postReport: function () {
        console.log(model.thisdata)
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
      },

      // 省市区三级联动
      testarea: async function () {
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
      'vue-one': One
    },
    mounted () {
      model = this
      model.init()
    }
  }
</script>
<style lang="">
  .other, .otherRemark,.reporter,.otherCompete{
    display: none;
  }
  .jzztitele {
    margin: 0 -15px;
    font-size: 12px;
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
    color: #9D9D9D;
    margin-right: 5px;
  }
  
  .mui-input-row {
    height: 43px;
  }
  .mui-input-row label {
    height: 43px;
    padding: 0;
    line-height: 43px;
    font-size: 12px;
    /*padding-left: 10px;*/
    width: 25%;
  }
  .mui-input-row input{
    font-size: 12px;
    padding: 0;
    line-height: 43px;
    height: 43px;
    width: 75%!important;
    text-align: right;
  }
  .nav {
    margin-top: 50px;
  }

  .nav li {
    height: 43px;
    line-height: 43px;
    padding: 0;
  }
  .nav li a {
    font-size: 13px;
    color: #3A3A3A;
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
    font-size: 12px;
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
    font-size: 12px;
    margin-left: 27px;
    padding-right: 20px;
  }
  .mui-radio input[type=radio]:before {
    font-size: 20px;
  }
  .mui-radio input[type=radio] {
    /*margin-top: 10px;*/
    top: 13px;
    left: 0px;
  }
  .nav li.textareaclass{
    height: 80px;
  }
  .nav li.textareaclass textarea{
    height: 80px;
    font-size: 12px;
    padding:10px 0;
  }
  .complete{
    font-size: 12px!important;
    line-height: 44px;
    padding: 0 10px!important;
  }
  .mui-ellipsis{
    max-width: 70%;
  }
  .nav li.jzzli{
    height: 74px;
  }
  .jzzli input {
    text-align: left;
  }
  .addjjz {
    font-size: 12px;
    float: right;
    margin-top: 5px;
    margin-right: 15px;
  }
</style>