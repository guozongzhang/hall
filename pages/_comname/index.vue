<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <h1 class="mui-title"><span>{{comName}}</span>云展厅</h1>
  </header>
  <div class="mui-content">
    <component :is="search"></component>
    <div style="margin: 0 5px;">
      <component :is="slider" :imgarr="swiperArr"></component>
    </div>
    <component :is="classifytab"></component>
    <div style="height: 10px;background-color: #f4f4f4;"></div>
    <component :is="hotfur" :goodsids="hotids"></component>
    <div style="height: 10px;background-color: #f4f4f4;"></div>
    <component :is="newfur" :newarr="newfurArr"></component>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let model
export default {
  head: {
    title: '首页',
    meta: [
      { itemprop: 'name', content: '搭配家logo' },
      { itemprop: 'image', content: 'http://cdn.dpjia.com/files/uploads/images/58600feaea6c3d33e3bb87c01fba6c11.png' },
      { name: 'description', content: '家具专业20年' }
    ]
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
      newfurArr: [],
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
        keys: 'id,com_name,full_name'
      }
      axios.get('classes/companys', {
        params: param
      }).then(function (data) {
        Cookies.set('com-name-' + process.env.port, data.data.items[0].com_name)
        model.comName = data.data.items[0].com_name
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
        model.hotids = info[0].header[1].list[0].goods
        model.swiperArr = info[0].header[0].list[1].banner
        model.newfurArr = info[0].header[0].list[2].goods
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token-' + process.env.port, '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
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
    padding-bottom: 20px;
  }
  .mui-bar{
    background-color: #ededed;
    box-shadow: none;
  }
  .mui-bar h1{
    font-weight: 400 !important;
  }
  .mui-bar h1 span{
    font-weight: 600 !important;
  }
</style>
