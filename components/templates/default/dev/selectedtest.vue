<template>
  <div>
    <ul class="ulbox">
      <li>
        <a class="mui-navigate-right" @click="testarea()">
          <span class="bgicon about"></span>
          <span class="info">测试area</span>
        </a>
      </li>
      <li>
        <a class="mui-navigate-right" @click="testtwo()">
          <span class="bgicon about"></span>
          <span class="info">测试二级</span>
        </a>
      </li>
      <li>
        <a class="mui-navigate-right" @click="testone()">
          <span class="bgicon about"></span>
          <span class="info">测试一级</span>
        </a>
      </li>
    </ul>
    <div v-show="false">
      <vue-area :areaobj="area" @getLayerThree="change"></vue-area>
      <vue-two :twoobj="twoobj" :twoarr="twoarr" @getLayerTwo="change"></vue-two>
      <vue-one :oneobj="oneobj" :onearr="onearr" @getLayerOne="change"></vue-one>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import Area from '../common/threelayer.vue'
import Two from '../common/twolayer.vue'
import One from '../common/onelayer.vue'
let model
export default {
  data () {
    return {
      area: {
        state: 0,
        province: -1,
        city: -1,
        districts: -1
      },
      oneobj: {
        state: 0,
        id: 0
      },
      onearr: [],
      twoobj: {
        state: 0,
        id: 0
      },
      twoarr: []
    }
  },
  components: {
    'vue-area': Area,
    'vue-two': Two,
    'vue-one': One
  },
  methods: {
    // 测试省市区
    testarea: function () {
      model.area.state = Math.random()
    },

    // 测试一级选择
    testone: function () {
      let param = {
        limit: 10,
        where: {
          com_id_poi_companys: this.$store.state.comid
        }
      }
      axios.get('classes/companys_brand', {
        params: param
      }).then(function (data) {
        data.data.items.forEach((item) => {
          model.onearr.push({'value': item.id, 'text': item.com_brand_name})
        })
        model.oneobj.state = Math.random()
      })
    },

    // 测试二级选择
    testtwo: function () {
      let obj = {
        relation: [
          {
            table: 'furniture_types',
            key: 'sp_type_id_poi_furniture_simple_types',
            keys: 'type_name'
          }
        ]
      }
      let param = {
        limit: 10,
        keys: 'id,sp_type_name',
        with: JSON.stringify(obj)
      }
      axios.get('classes/furniture_simple_types', {
        params: param
      }).then(function (data) {
        data.data.items.forEach((item) => {
          let tmp = {
            'text': item.sp_type_name,
            'value': item.id,
            'children': []
          }
          item.sp_type_id_rel_furniture_types.items.forEach((sub) => {
            tmp.children.push({'value': sub.id, 'text': sub.type_name})
          })
          model.twoarr.push(tmp)
        })
        model.twoobj.state = Math.random()
      })
    },

    change: function (str) {
      console.log(str)
    }
  },
  mounted () {
    model = this
  }
}
</script>
<style>
  .loginend {
    font-size: 15px;
    color: #000;
    font-weight: bold;
  }
  li {
    list-style-type: none
  }
  .ulbox li{
    height: 50px;
    padding: 10px 20px;
    border-bottom: 1px solid #ccc
  }
  .ulbox li:last-child{
  }
  .ulbox {
    padding: 0;
    background: #fff;
  }
  .ulbox li a {
    display: block;
    overflow: hidden;
    position: relative;
  }
  .ulbox li a span{
    display: block;
    float: left;
    font-size: 14px;
    color: #000;
    height: 30px;
    line-height: 30px;
  }
  .ulbox li a span:nth-child(1) {
    background: url("/images/person.png") no-repeat;
    display: inline-block;
    background-size: 490px;
    margin-right: 10px;
    width: 30px;
  }
  .ulbox li a span:nth-child(2) {
    margin-right: 10px;
  }
  .ulbox li a span:last-child {
  }

  .ulbox li a span.havesf i:nth-child(1){
    display: block;
    height: 26px;
    margin-top: -8px;
    font-size: 14px;
    font-style: normal;
    line-height: 32px;
  }

  .ulbox li a span.havesf i:nth-child(2){
    display: block;
    height: 26px;
    margin-top: -8px;
    font-size: 12px;
    font-style: normal;
    line-height: 30px;
    color: #4E73CD
  }

  .ulbox li span.phone{
    background-position:  -212px -24px
  }
  .ulbox li span.wechet{
    background-position: -250px -24px;
  }
  .ulbox li span.wechet{
    background-position: -250px -24px;
  }
  .ulbox li span.head{
    background-position: -289px -24px;
  }
  .ulbox li span.start{
    background-position: -330px -24px;
  }
  .ulbox li span.set{
    background-position: -369px -24px;
  }
  .ulbox li span.about{
    background-position: -409px -24px;
  }
  .mui-navigate-right:after{
    right: 0px !important;
  }
</style>
