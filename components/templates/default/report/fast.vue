<template>
  <div>
    <div class="allshow">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">快速报备</h1>
        <a class="mui-icon mui-pull-right complete"  @click="submit()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell bbnameli">
          报备人姓名：{{}}
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label >项目名称<i>*</i></label>
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
          <a href="javascript:;" class="mui-navigate-right" @click="testone()">项目有效期<span>{{strToCn(thisdata.validity)}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <div class="mui-input-row">
            <label>与项目关系</label>
            <input type="text"  class="mui-input-clear" placeholder="" v-model="thisdata.sketch">
          </div>
        </li>
        <li class="mui-table-view-cell" @click="starshow($event)">
          <a href="javascript:;" class="mui-navigate-right">添加备注<span class="mui-ellipsis">{{thisdata.remark}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a href="" class="mui-navigate-right">添加附件</a>
        </li>
        <li style="height: 15px; background: #EEEEEE"></li>
      </ul>
        
      <vue-one :oneobj="oneobj" :onearr="onearr" @getLayerOne="change"></vue-one>
    </div>
    <div class="allhide">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">{{clonetitel}}</h1>
        <a class="mui-icon mui-pull-right complete" @click="endall()" >完成</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell textareaclass nextshow">
          <div class="mui-input-row" style="float: left;width: 100%;height: 80px;">
            <label style="width:1%"><i></i></label>
            <textarea style="width:99%!important" type="text"  class="mui-input-clear" placeholder="请输入" v-model="thisdata.remark"></textarea>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>  
<script>
  import One from '../common/onelayer.vue'
  import axios from '~/plugins/axios'
  let $ = require('jquery')
  let _ = require('underscore')
  let model
  export default {
    head: {
      title: '我的项目'
    },
    data () {
      return {
        thisdata: {
          name: '这里是快速报备',
          first_party_name: '甲方名称',
          amount: '240万',
          intro: '项目介绍',
          category: 'tender', // 项目类型
          feasibility: 4, // '可行性'
          validity: 'three_month',
          remark: '备注',
          project_reportman: [ // 报备人信息
            {
              user_poi_reportman: 41,
              project_relation: '项目关系',
              royalties_expectation: '期望提成',
              strengths: '优势'
            }
          ],
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
          sketch: '简单描述'
        },
        onearr: [],
        oneobj: {
          state: 'three_month'
        },
        clonetitel: '报备备注'
      }
    },
    methods: {
      init: function () {
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
          model.oneobj.state = Math.random()
        })
      },

      // 控制样式开合
      starshow: function (e) {
        // $(e.currentTarget).nextsbiling()
        $('.allshow').hide()
        $('.allhide').show()
      },

      // 结束textarea
      endall: function () {
        $('.allshow').show()
        $('.allhide').hide()
      },

      // 项目期限转换
      strToCn: function (value) {
        return _.find(this.onearr, item => {
          return item.value === value
        }).text
      },

      // 提价数据
      submit: function () {
        let ssdata = _.extend(model.thisdata, {
          project_attachment: JSON.stringify(model.thisdata.project_attachment),
          project_reportman: JSON.stringify(model.thisdata.project_reportman)
        })
        axios.post('functions/report/fast_record', null, {
          data: ssdata
        }).then(function (data) {
        }).catch(function () {
          window.mui.toast('失败!')
        })
      },

      // 提交新建项目
      postReport: function () {
        console.log(model.thisdata)
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
        model.thisdata.validity = val[0].text
      }
    },
    components: {
      'vue-one': One
    },
    mounted () {
      model = this
      model.init()
    }
  }
</script>
<style lang="">
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
    height: 43px;
    padding: 0;
    line-height: 43px;
    font-size: 12px;
    /*padding-left: 10px;*/
  }
  .mui-input-row input{
    font-size: 12px;
    padding: 0;
    line-height: 43px;
    height: 43px
  }
  .nav {
    margin-top: 50px;
  }
  .mui-input-row label {
    /*padding-left: 20px;*/
  }
  .mui-table-view-chevron .mui-table-view-cell>a:not(.mui-btn){
    margin-right: 0;
    padding: 0;
  }
  .mui-navigate-right:after, .mui-push-right:after{
    right: 0;
  }
  .mui-input-row label~input{
    text-align: right;
  }
  .nav li {
    height: 43px;
    line-height: 43px;
    padding: 0;
  }
  .nav li.bbnameli {
    height: 30px;
    background: #E5E5E5;
    font-size: 12px;
    line-height: 30px;
    color: #676767;
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
    font-size: 12px;
    margin-right: 20px;
  }
  .baobdiv{
    float: left;
  }
  .cssradiodiv {
    float: left;
  }
  .cssradiodiv label{
    font-size: 12px;
  }
  .mui-radio input[type=radio]:before {
    font-size: 20px;
  }
  .mui-radio input[type=radio] {
    /*margin-top: 10px;*/
    top: 10px;
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
</style>