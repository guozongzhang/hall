<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron nav">
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>项目名称<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入项目名称" v-model="name">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>公司名称<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入公司名称" v-model="first_party_name">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>预计金额<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="万元" v-model="amount">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>简单描述<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="" v-model="sketch">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>项目可行性<i>*</i></label>
          <ul class="start">
            <li v-for="(index,item) in 5" @click="changeStart(index)">
              <i v-bind:class="feasibility - index >= 0 ? 'fa-star' : 'fa-star-o'" class="fa mui-icon mui-icon-left-nav mui-pull-right"></i>
            </li>
          </ul>
        </div>
      </li>
      <li class="mui-table-view-cell">
        <a href="javascript:;" class="mui-navigate-right" @click="testone()">项目有效期<span>{{validity}}</span></a>
      </li>

      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">报备人姓名</a>
      </li>

      <li class="mui-table-view-cell"> 
        <div class="mui-radio cssradiodiv">
          <label>自己</label>
          <input type="radio" name="style" value="left-none"/> 
        </div>
        <div class="mui-radio cssradiodiv">
          <label>其他人</label>
          <input type="radio" name="style" value="left-none"/> 
        </div>
      </li>
      
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <input type="text"  class="mui-input-clear" placeholder="请输入报备人姓名" v-model="first_party_name">
        </div>
      </li>


      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">添加备注</a>
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
          <input type="text"  class="mui-input-clear" placeholder="请输入项目编号">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">项目介绍<span>500字</span></a>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">风险分析<span>500字</span></a>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">招标时间<span>500字</span></a>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">交付时间<span>500字</span></a>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">产品分类<span>500字</span></a>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right">项目类型<span>500字</span></a>
      </li>


      <li class="mui-table-view-cell right0">
        <a href="" class="mui-navigate-right">更多甲方信息</a>
      </li>
      <li class="mui-table-view-cell">
        <a href="javascript:;" class="mui-navigate-right"  @click="testarea()">所属区域<span>{{first_party_province_poi_province.text}}</span><span>{{first_party_city_poi_city.text}}</span><span>{{ first_party_district_poi_district.text}}</span></a>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>联系人姓名<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入项目编号">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>联系人职务<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入联系人职务">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>联系人电话<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话">
        </div>
      </li>


      <li class="mui-table-view-cell right0">
        <a href="" class="mui-navigate-right ">更多报备信息</a>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>与项目关系<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入项目编号">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>期望提成<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入联系人职务">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>项目优势<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>联系电话<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>联系邮箱<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话">
        </div>
      </li>

      <li class="mui-table-view-cell right0">
        <a href="" class="mui-navigate-right ">更多竞争优势</a>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right ">己方竞争对手</a>
      </li>
      <li class="mui-table-view-cell">
        <a href="" class="mui-navigate-right ">报备人对手</a>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>项目亮点<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入项目亮点">
        </div>
      </li>
      <li class="mui-table-view-cell">
        <div class="mui-input-row">
          <label>项目形式预测<i>*</i></label>
          <input type="text"  class="mui-input-clear" placeholder="请输入项目形式预测">
        </div>
      </li>
    </ul>
    <vue-one :oneobj="oneobj" :onearr="onearr" @getLayerOne="change"></vue-one>
    <vue-area :areaobj="area" :arr="arr" @getLayerThree="changearea"></vue-area>

  </div>

    

</template>  
<script>
  import One from '../common/onelayer.vue'
  import Area from '../common/threelayer.vue'
  import Two from '../common/twolayer.vue'
  import axios from '~/plugins/axios'
  let model
  export default {
    head: {
      title: '我的项目'
    },
    data () {
      return {
        name: '项目名称',
        first_party_name: '甲方名称',  
        amount: '项目金额',
        intro: '项目介绍', 
        feasibility: 4, //'可行性'
        validity: '项目有效期',
        remark: '备注', 
        project_attachment: [ //附件信息
          {
            file_url: '',
            id: 0,
            delete: 'no'
          },
          {
            file_url: '',
            id: 0 ,
            delete: 'no'
          }
        ],
        // sketch: '简单描述',
        // risk_analysis: '风险',
        // invitation_time: '招标时间',
        // delivery_time: '交付时间',
        // project_furniture_types: [
        //   {
        //     type_poi_furniture_types: id,
        //   }
        // ],
        // category: '项目类型',
        // number: '项目编号',
        first_party_province_poi_province: {
          value: '',
          text: ''
        },
        first_party_city_poi_city: {
          value: '',
          text: ''
        },
        first_party_district_poi_district: {
          value: '',
          text: ''
        },
        // first_party_linkman: '甲方联系人',
        // first_party_tel: '甲方联系电话',
        // first_party_tel: '甲方联系电话',
        // first_party_tel: '甲方联系电话',
        // project_reportman: [ // 报备人信息
        //   {
        //     name: "",
        //     project_relation: "项目关系",
        //     royalties_expectation: "期望提成",
        //     strengths: "优势",
        //     tel: "",
        //     email: "",
        //   }
        // ],
        // second_party_competitor: '己方竞争对手',
        // competitor: '竞争对手',
        // competitor_strengths: '己方竞争对手',
        // competitor_projections: '己方竞争对手',


        // feasibility: 4,
        // validity: '三个月',
        district: '',
        province: '', 
        city: '',




        onearr: [
        ],
        oneobj: {
          state: 'three_month'
        },
        area: {
          state: ''
        },
        arr: [],
        area: {
          state: 0,
          province: -1,
          city: -1,
          districts: -1
        },
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

      // 提交新建项目
      postReport: function () {
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
        model.validity = val[0].text
      },

      // 选择省市区
      changearea: function (val) {
        model.first_party_province_poi_province = {
          value: val[0].value,
          text: val[0].text
        }
        model.first_party_city_poi_city = {
          value: val[1].value,
          text: val[1].text
        }
        model.first_party_district_poi_district = {
          value: val[2].value,
          text: val[2].text
        }
      },

      //省市区三级联动
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
      },
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