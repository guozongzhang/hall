<template>
  <div>
    <div class="more allshow subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left sub-go-back">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title">快速报备</h1>
        <a class="mui-icon mui-pull-right complete"  @click="submit()" v-if="!submiting">提交</a>
        <a class="mui-icon mui-pull-right complete" v-if="submiting">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell bbnameli">
          报备人：{{thisdata.project_reportman[0].name}}
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label style="width:22%">项目名称<i>*</i></label>
            <input type="text" maxlength="20" style="width: 78%" placeholder="请输入项目名称" v-model="thisdata.name">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label style="width:22%">甲方名称<i>*</i></label>
            <input type="text" maxlength="20" style="width: 78%" placeholder="请输入甲方名称" v-model="thisdata.first_party_name">
          </div>
        </li>
        <div class="comInfo">
          <li class="mui-table-view-cell">
            <div class="mui-input-row">
              <label>甲方联系人</label>
              <a href="javascript:;" style="display: inline-block;width: 70%;height: 34px;" class="mui-navigate-right" @click="addlinkman()"></a>
            </div>
          </li>
          <div style="padding: 10px 0;border-bottom: 1px solid #eee;" v-show="alinkman.length > 0">
            <div class="sublinkman-style" v-for="sublink in alinkman">{{sublink.name}}{{sublink.job ? '/' + sublink.job : ''}}{{sublink.tel ? '/' + sublink.tel : ''}}</div>
          </div>
        </div>
        <li class="mui-table-view-cell">
          <a href="javascript:;" class="mui-navigate-right"  @click="testarea()">项目所在地区<i>*</i><span>{{thisdata.province.text}}-{{thisdata.city.text}}-{{thisdata.district.text}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>详细地址<i>*</i></label>
            <input type="text" maxlength="20" placeholder="项目详细地址" v-model="thisdata.address">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>预计金额<i>*</i></label>
            <span style="float: right;font-size: 14px;color: #999;display: inline-block;margin-left: 3px;">万元</span>
            <input type="number" maxlength="20" style="width: 55% !important" v-model="thisdata.amount" v-on:keyup="money()">
          </div>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label style="width:22%">简单描述<i>*</i></label>
            <input type="text" maxlength="20" style="width: 78%"  placeholder="一句话简单的描述一下项目" v-model="thisdata.sketch">
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
          <a href="javascript:;" class="mui-navigate-right" @click="testone()">项目有效期<i>*</i><span>{{cloneValidity}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label style="width:22%">与项目关系</label>
            <input type="text" maxlength="20" style="width: 78%"  placeholder="" v-model="thisdata.project_reportman[0].project_relation">
          </div>
        </li>
        <li class="mui-table-view-cell" @click="starshow($event)">
          <a href="javascript:;" class="mui-navigate-right">添加备注<span class="mui-ellipsis">{{thisdata.remark}}</span></a>
        </li>
        <li class="mui-table-view-cell" style="min-height: 43px">
          <span class="upload-box" id="upload_com"  @click="upload_com()">
            <a href="javascript:;">添加附件</a>
            <input class="hidden" type="file" accept="image/*" capture="camera" name="files[]" style="width: 75%; display: none;" v-if="!isPhone" multiple>
            <input class="hidden" type="file" accept="image/*" name="files[]" style="width: 75%; display: none;" v-if="isPhone" multiple>
            <span class="add-btn" style="float: right">
              <i class="fa fa-picture-o"></i>
              <i class="fa fa-plus add-icon"></i>
            </span>
          </span>
        </li>
        <li class="mui-table-view-cell" v-if="thisdata.projectAttachment.length > 0">
          <span v-for="(imgitem,imgIndex) in thisdata.projectAttachment" class="posir">
            <img :src="imgitem.file_url" :data-preview-src="imgitem.file_url" alt=""  class="fjimg">
            <i class="deleteimg" @click="deleteimg(imgIndex)">×</i>
          </span>
        </li>
        <li style="height: 15px; background: #EEEEEE;display: none"></li>
      </ul>

      <vue-area :areaobj="area" :arr="arr" @getLayerThree="changearea"></vue-area>
      <vue-one :oneobj="oneobj" :onearr="onearr" @getLayerOne="change"></vue-one>
    </div>
    <div class="allhide">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="endall('cencle')">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title">{{clonetitel}}</h1>
        <a class="mui-icon mui-pull-right complete" @click="endall('end')" >提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell textareaclass nextshow">
          <div class="mui-input-row" style="float: left;width: 100%;height: 80px;">
            <label style="width:1%"><i></i></label>
            <textarea style="width:99%!important; font-size: 15px;" maxlength="50" type="text" placeholder="请输入备注" v-model="thisdata.cloneRemark"></textarea>
          </div>
        </li>
      </ul>
    </div>
    <div class="alinkman">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="goLinkBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title">添加甲方联系人</h1>
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
  </div>
</template>  
<script>
  import One from '../common/onelayer.vue'
  import Area from '../common/threelayer.vue'
  import axios from '~/plugins/axios'
  let url = require('url')
  let Cookies = require('js-cookie')
  let ESVal = require('es-validate')
  let $ = require('jquery')
  let _ = require('underscore')
  let model
  let myURL
  let modalflag = true
  export default {
    head: {
      title: '快速报备'
    },
    data () {
      return {
        isPhone: false,
        clonealinkman: [],
        alinkman: [], // 联系人
        thisdata: {
          name: '',
          first_party_name: '',
          amount: '',
          intro: '',
          feasibility: 3, // '可行性'
          validity: 'three_month',
          remark: '',
          province: {
            value: '1',
            text: '北京市'
          },
          city: {
            value: '1',
            text: '北京市'
          },
          district: {
            value: '1',
            text: '东城区'
          },
          address: '',
          cloneRemark: '', // 临时变量
          project_reportman: [ // 报备人信息
            {
              user_poi_reportman: 0,
              name: '',
              is_self: 'yes',
              tel: '',
              email: '',
              project_relation: '',
              royalties_expectation: '',
              strengths: ''
            }
          ],
          projectAttachment: [],
          sketch: ''
        },
        cloneValidity: '3个月', // 临时的时间
        linkPath: '',
        onearr: [],
        oneobj: {
          state: '0'
        },
        arr: [],
        area: {
          state: 0,
          one: 1,
          two: 1,
          three: 8
        },
        clonetitel: '报备备注',
        submiting: false
      }
    },
    methods: {
      init: function () {
        myURL = url.parse(window.location.href)
        model.isPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent)
        window.mui.previewImage()
        model.linkPath = '/' + myURL.pathname.split('/')[1]
        let token = Cookies.get('dpjia-hall-token-' + process.env.port)
        axios.get('users/cloud_personal?com_id=' + this.$store.state.comid, {
          headers: {
            'X-DP-Token': token
          }
        }).then(function (data) {
          model.thisdata.project_reportman[0].name = data.data.ui_name || '未设置'
          model.thisdata.project_reportman[0].tel = data.data.mobile || ''
          model.thisdata.project_reportman[0].email = data.data.u_email || ''
        }).catch(function (error) {
          if (error.response.data.message === 'token is invalid') {
            window.mui.toast('登录信息过期!')
            setTimeout(function () {
              Cookies.set('dpjia-hall-token-' + process.env.port, '', {domain: '.dpjia.com'})
              window.location.href = model.linkPath + '/login'
            }, 2000)
          }
        })

        // 获取月份
        let param = {
          where: {
            state_types: 'report_valtime'
          }
        }
        axios.get('classes/selectable_states', {
          params: param
        }).then(function (data) {
          data.data.items.forEach((item) => {
            model.onearr.push({'value': item.name, 'text': item.alias})
          })
        })
      },

      // 选择省市区
      changearea: function (val) {
        // 省市区
        if (model.layer === 'area') {
          model.thisdata.province = {
            value: val[0].value,
            text: val[0].text
          }
          model.thisdata.city = {
            value: val[1].value,
            text: val[1].text
          }
          model.thisdata.district = {
            value: val[2].value,
            text: val[2].text
          }
        }
        modalflag = true
      },

      // 省市区三级联动
      testarea: async function () {
        if (modalflag) {
          modalflag = false
          model.layer = 'area'
          model.arr = []
          model.area = {
            one: model.thisdata.province.value || 1,
            two: model.thisdata.city.value || 1,
            three: model.thisdata.district.value || 1,
            state: Math.random()
          }
        }
        setTimeout(function () {
          modalflag = true
        }, 500)
      },

      // 删除附件图片
      deleteimg: function (index) {
        model.thisdata.projectAttachment.splice(index, 1)
      },

      // 添加联系人
      addlinkman: function () {
        model.clonealinkman = []
        if (model.alinkman.length === 0) {
          model.addsublinkman()
        } else {
          model.alinkman.forEach(item => {
            model.clonealinkman.push(_.clone(item))
          })
        }
        $('.more').hide()
        $('.alinkman').show()
      },

      // 联系人返回
      goLinkBack: function () {
        model.alinkman = []
        model.clonealinkman.forEach(item => {
          model.alinkman.push(_.clone(item))
        })
        $('.more').show()
        $('.alinkman').hide()
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

      // 控制样式开合
      starshow: function (e) {
        $('.allshow').hide()
        $('.allhide').show()
        model.thisdata.cloneRemark = model.thisdata.remark ? _.clone(model.thisdata.remark) : ''
      },

      // 结束textarea
      endall: function (type) {
        $('.allshow').show()
        $('.allhide').hide()
        if (type === 'end') {
          model.thisdata.remark = _.clone(model.thisdata.cloneRemark)
        }
      },

      money: function () {
        if (model.thisdata.amount.indexOf('.') > -1) {
          let length = model.thisdata.amount.indexOf('.')
          model.thisdata.amount = model.thisdata.amount.slice(0, length + 3)
        }
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
              $input.unwrap()
              data.forEach((sub) => {
                model.thisdata.projectAttachment.push({
                  file_url: sub.url,
                  id: 0,
                  delete: 'no'
                })
              })
            },
            error: function (error) {
              window.mui.toast('上传失败!')
              $input.unwrap()
              console.log(error)
            }
          })
        })
      },

      // 提价数据
      submit: function () {
        if (!model.ValidateForm(model.thisdata)) {
          return false
        }
        model.submiting = true
        let submitData = _.extend(model.thisdata, {
          project_attachment: JSON.stringify(model.thisdata.projectAttachment),
          project_reportman: JSON.stringify(model.thisdata.project_reportman),
          province_poi_province: model.thisdata.province.value,
          city_poi_city: model.thisdata.city.value,
          district_poi_district: model.thisdata.district.value
        })
        axios.post('functions/report/fast_record', null, {
          data: submitData
        }).then(function (data) {
          window.mui.toast('快速报备项目成功')
          window.location.href = model.linkPath + '/report'
        }).catch(function () {
          model.submiting = false
          window.mui.toast('失败!')
        })
      },

      // 验证
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

      // 返回首页(云展厅)
      goHome: function () {
        window.location.href = model.linkPath + '/'
      },

      // 改变可行性
      changeStart: function (index) {
        this.thisdata.feasibility = index
      },

      // 月份选择
      testone: function () {
        model.oneobj.state = Math.random()
      },

      // 改变月份
      change: function (val) {
        model.cloneValidity = val[0].text
        model.thisdata.validity = val[0].value
      }
    },
    components: {
      'vue-one': One,
      'vue-area': Area
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
    color: #999;
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
  .addjjz {
    font-size: 14px;
    float: right;
    margin-top: 5px;
    color: #666;
    text-align: right;
    margin-right: 15px;
    margin-bottom: 40px;
  }
  .jzztitele {
    margin: 0 -15px;
    font-size: 14px;
    background: #eee;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    color: #999;
  }
  .allhide{
    display: none;
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
    width: 28%;
    height: 43px;
    padding: 0;
    line-height: 43px;
    font-size: 14px;
  }
  .mui-input-row input{
    font-size: 14px;
    padding: 0;
    line-height: 43px;
    height: 43px;
    color: #999;
  }
  .nav {
    margin-top: 48px;
  }
  .mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn){
    margin-right: 0;
    padding: 0;
  }
  .mui-navigate-right:after, .mui-push-right:after{
    right: 0;
  }
  .mui-input-row label~input{
    width: 70%;
    text-align: right;
  }
  .mui-table-view:before {
    background-color: #fff;
  }
  .nav li {
    min-height: 43px;
    line-height: 43px;
    padding: 0;
  }
  .nav li.bbnameli {
    min-height: 30px;
    height: 30px !important;
    background: #eee;
    font-size: 14px;
    line-height: 30px;
    color: #999;
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
    color: #aaa;
  }
  .mui-table-view-cell{
    padding: 0 15px!important;
  }
  .mui-table-view-cell>a:not(.mui-btn){
    margin: 0;
    padding-left: 20px;
  }
  .mui-table-view-cell:after {
    left: 0
  }
  .liul{
    padding: 0;

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
  .baobdiv{
    float: left;
  }
  .cssradiodiv {
    float: left;
  }
  .cssradiodiv label{
    font-size: 14px;
  }
  .mui-radio input[type=radio]:before {
    font-size: 20px;
  }
  .mui-radio input[type=radio] {
    top: 10px;
  }
  .nav li.textareaclass{
    min-height: 80px;
  }
  .nav li.textareaclass textarea{
    min-height: 80px;
    font-size: 14px;
    padding: 10px 0;
  }
  .complete{
    font-size: 14px!important;
    line-height: 48px;
    padding: 0 10px!important;
    color: #5278e5;
  }
  .subbox-show .sub-go-back{
    height: 48px;
    line-height: 26px;
    color: #666;
    font-size: 14px!important;
  }
  .alinkman {
    display: none;
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
  .mui-ellipsis{
    max-width: 70%;
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
    z-index: 20;
    font-size: 14px;
    cursor: pointer;
  }
  .posir{
    position: relative;
    display: inline-block;
    height:44px;
  }
</style>