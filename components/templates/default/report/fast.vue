<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron nav">
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label @click="submit()">项目名称<i>*</i></label>
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
        <a href="javascript:;" class="mui-navigate-right" @click="testone()">项目有效期<span>{{thisdata.validity}}</span></a>
      </li>


      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>与项目关系</label>
          <input type="text"  class="mui-input-clear" placeholder="" v-model="thisdata.sketch">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">添加备注</a>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">添加附件</a>
      </li>
      <li style="height: 15px; background: #EEEEEE"></li>

    </ul>
      
    <vue-one :oneobj="oneobj" :onearr="onearr" @getLayerOne="change"></vue-one>
  </div>

    

</template>  
<script>
  import One from '../common/onelayer.vue'
  import axios from '~/plugins/axios'
  let _ = require('underscore')
  let model
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
          validity: '项目有效期',
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
              name: ''
            }
          ],
          category: '项目类型',
          number: '项目编号',
          state: 'wait'
        },
        onearr: [
        ],
        oneobj: {
          state: 'three_month'
        }
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

      submit: function () {
        let ssdata = _.extend(model.thisdata, {
          first_party_province_poi_province: model.thisdata.first_party_province_poi_province.value,
          first_party_city_poi_city: model.thisdata.first_party_city_poi_city.value,
          first_party_district_poi_district: model.thisdata.first_party_district_poi_district.value,
          project_attachment: JSON.stringify(model.thisdata.project_attachment),
          project_reportman: JSON.stringify(model.thisdata.project_reportman),
          project_furniture_types: JSON.stringify(model.thisdata.project_furniture_types)
        })
        axios.post('functions/report/project', null, {
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
        this.feasibility = index
      },

      // 月份选择
      testone: function () {
        model.oneobj.state = Math.random()
      },

      // 改变月份
      change: function (val) {
        console.log(val)
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
    padding-left: 10px;
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
    padding-left: 20px;
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
</style>