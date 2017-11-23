<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <h1 class="mui-title">{{comName}}云展厅</h1>
  </header>
  <div class="mui-content">
    <component :is="search"></component>
    <component :is="slider" :imgarr="swiperArr"></component>
    <component :is="classifytab"></component>
    <div style="height: 10px;background-color: #f4f4f4;"></div>
    <component :is="hotfur" :goodsids="hotids"></component>
    <div style="height: 10px;background-color: #f4f4f4;"></div>
    <component :is="newfur" :arrInfo="newfur"></component>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let model
export default {
  head: {
    title: '首页'
  },
  beforeCreate () {
    // 注册组件 component(名字, 相对路径)
    this.component('search', 'home/search.vue')
    this.component('slider', 'home/sliders.vue')
    this.component('classifytab', 'home/classifytab.vue')
    this.component('hotfur', 'home/hotfur.vue')
    this.component('newfur', 'home/newfur.vue')
  },
  data () {
    return {
      comName: '',
      hotids: [],
      newfur: [],
      swiperArr: [
        {
          pic: ''
        }
      ]
    }
  },
  methods: {
    init: async function () {
      await model.getInitData()
      await model.getCompanyData()
    },

    // 获取公司信息
    getCompanyData: function () {
      let param = {
        where: {
          com_id: this.$store.state.comid
        },
        keys: 'id,com_name'
      }
      axios.get('classes/companys', {
        params: param
      }).then(function (data) {
        Cookies.set('com-name', data.data.items[0].com_name)
        model.comName = data.data.items[0].com_name
      }).catch(function () {
        window.mui.toast('获取数据失败!')
      })
    },

    // 获取配置信息
    getInitData: function () {
      let param = {
        where: {
          com_id_poi_companys: this.$store.state.comid
        },
        limit: 1,
        order: '-id'
      }
      axios.get('classes/company_mobile_skin_logs', {
        params: param
      }).then(function (data) {
        let info = JSON.parse(data.data.items[0].config)
        model.swiperArr = info[0].header[0].list[1].banner
        model.hotids = info[0].header[1].list[0].goods
        model.newfur = info[0].header[1].list[0].goods
      }).catch(function () {
        window.mui.toast('获取数据失败!')
      })
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>
<style>
  html,body{
    background-color: #fff;
  }
  .mui-content{
    background-color: #fff;
    padding-bottom: 50px;
  }
  .mui-bar{
    background-color: #ededed;
    box-shadow: none;
  }
</style>
