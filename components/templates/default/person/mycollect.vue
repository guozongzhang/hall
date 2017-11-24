<template>
<div class="mui-content-padded" style="margin: 0px;">
  <div class="p20-box">
    <div class="clasify-tabs">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;" v-bind:class="activeTab === 'comprehensive' ? 'active' : ''" @click="matchSearch('comprehensive')">
            <div class="mui-media-body">
              <span class="tab-text">智能</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;" v-bind:class="activeTab === 'up_time' ? 'active' : ''" @click="matchSearch('up_time')">
            <div class="mui-media-body">
              <span class="tab-text">上架时间</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;" v-bind:class="activeTab === 'price' ? 'active' : ''"  @click="orderByPrice('price')">
            <div class="mui-media-body">
              <span class="tab-text" v-bind:class="activeprice ? 'activeprice' : ''">价格</span>
              <span class="self-iocn" v-bind:class="priceicon ? 'price-down' : 'price-up'"></span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;">
            <div class="mui-media-body" @click="showClassify()">
              <span class="tab-text">筛选</span>
              <span class="self-iocn selected-icon"></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="list-item" id="goodlist">
    <div class="f4-line"></div>
    <div class="goods-list mui-scroll-wrapper" id="pullfresh">
      <div class="mui-scroll">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell mui-media" v-for="item in goodsArr">
            <div class="info-box">
              <a v-bind:href="item.id" class="check-btn check-flag" v-bind:class="item.checked == item.id ? 'checked' : 'uncheck'" @click="checkOne(item)"></a>
              <img class="mui-media-object mui-pull-left" :src="item.thumbnail || 'images/square.png'">
              <div class="mui-media-body">
                <a class="fur-name" v-bind:href="linkPath + '/furdetail?id=' + item.fur_id_poi_furnitures">{{item.fur_name}}{{item.name}}</a>
                <div class="fur-price">
                  <span class="price">￥{{item.discount}}</span>
                  <span class="sub-price">￥{{item.price}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p class="loading-icon" v-show="is_loading">
          <span class="mui-spinner"></span>
          <span class="loading-text">{{loadingText}}</span>
        </p>
        <p class="nodata-icon" v-show="is_nodata">
          <span class="nodata-text">没有更多数据啦~</span>
        </p>
      </div>
    </div>
    <div class="opt-box">
      <a href="javascript:;" @click="checkAllItem()">
        <span class="check-btn" v-bind:class="checkedall ? 'checked' : 'uncheck'"></span>
        <span>全选</span>
      </a>
      <a href="javascript:;" class="del-btn" @click="delMyCollect()">
        <span>删除</span>
      </a>
    </div>
  </div>
  <div class="classify-box" id="classifylist">
    <div class="sub-classify">
      <div class="clasify-item" v-for="item in classifyArr">
        <p class="title">
          <label>{{item.name}}</label>
          <a href="javascript:;" @click="showAllTypes(item)">
            <span>{{item.showall ? '收起' : '全部'}}</span>
            <span class="fa" v-bind:class="item.showall ? 'fa-angle-up' : 'fa-angle-down'"></span>
          </a>
        </p>
        <ul class="items-ul">
          <li v-bind:class="item.active == sub.id ? 'active' : ''" v-for="(sub, indexs) in item.list" @click="choiceType(item, sub)" v-show="indexs < 3 || item.showall" v-if="sub.state == 'on'">
            <a href="javascript:;" :title="sub.com_brand_name || (sub.norname || sub.sp_type_name) || sub.style_name || sub.field_name">{{sub.com_brand_name || (sub.norname || sub.sp_type_name) || sub.style_name || sub.field_name}}</a>
          </li>
        </ul>
      </div>
      <div class="clasify-btn">
        <a href="javascript:;" @click="resetClassify()">重置</a>
        <a href="javascript:;" class="submit-btn" @click="setClassify()">确定</a>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let url = require('url')
let querystring = require('querystring')
let $ = require('jquery')
let _ = require('underscore')
let model
let pagesize = 4
let token
let tabsObj = {
  'comprehensive': {
    'comprehensive': 'comprehensive'
  },
  'up_time': {
    'up_time': 'up_time'
  },
  'price': {
    'price': 'desc'
  }
}
export default {
  data () {
    return {
      linkPath: '',
      activeTab: '',
      checkIdAll: [],
      checkedall: false,
      pages: 1,
      is_loading: true,
      is_nodata: false,
      loadingText: '正在加载...',
      priceicon: true,
      activeprice: false,
      classifyActiveArr: [],
      goodsArr: [],
      classifyArr: [
        {
          name: '品类',
          type: 'secondtype',
          active: 0,
          showall: false,
          list: []
        },
        {
          name: '品牌',
          type: 'brand',
          active: 0,
          showall: false,
          list: []
        },
        {
          name: '风格',
          type: 'style',
          active: 0,
          showall: false,
          list: []
        },
        {
          name: '空间',
          type: 'field',
          active: 0,
          showall: false,
          list: []
        }
      ]
    }
  },
  methods: {
    inits: async function (pages) {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      token = Cookies.get('dpjia-hall-token')
      if (!token) {
        window.location.href = model.linkPath + '/login'
      }
      let urlObj = querystring.parse(myURL.query)
      await model.getGoodsList(pages, urlObj, 'no')
      await model.getSimpleType()
      await model.getBands()
      await model.getStyleField()
      await model.checkUrl(urlObj)
      window.mui('#pullfresh').on('tap', 'a', function (event) {
        let classFlag = $(event.target).attr('class')
        if (classFlag.indexOf('check-flag') > -1) {
          let objid = $(event.target).attr('href')
          if (_.indexOf(model.checkIdAll, objid) > -1) {
            model.goodsArr.forEach((item) => {
              if (String(item.id) === String(objid)) {
                item.checked = 0
              }
            })
            model.checkIdAll = _.without(model.checkIdAll, objid)
          } else {
            model.goodsArr.forEach((item) => {
              if (String(item.id) === String(objid)) {
                item.checked = objid
              }
            })
            model.checkIdAll.push(objid)
          }
          if (model.checkIdAll.length === model.goodsArr.length) {
            model.checkedall = true
          } else {
            model.checkedall = false
          }
        }
        if (classFlag.indexOf('fur-name') > -1) {
          window.location.href = $(event.target).attr('href')
        }
      })
    },

    // 判断是否高亮
    checkUrl: function (urlObj) {
      model.classifyArr[0].active = urlObj.secondtype ? urlObj.secondtype : 0
      model.classifyArr[1].active = urlObj.brand ? urlObj.brand : 0
      model.classifyArr[2].active = urlObj.style ? urlObj.style : 0
      model.classifyArr[3].active = urlObj.field ? urlObj.field : 0
      if (urlObj.comprehensive) {
        model.activeTab = 'comprehensive'
      }
      if (urlObj.up_time) {
        model.activeTab = 'up_time'
      }
      if (urlObj.price) {
        model.activeTab = 'price'
      }
    },

    // 选择筛选条件
    matchSearch: function (type) {
      model.is_nodata = false
      model.activeTab = type
      let myURL = url.parse(window.location.href)
      let urlObj = querystring.parse(myURL.query)
      delete urlObj.secondtype
      delete urlObj.thirdtype
      delete urlObj.brand
      delete urlObj.style
      delete urlObj.field
      delete urlObj.up_time
      delete urlObj.price
      delete urlObj.comprehensive
      urlObj = _.extend(urlObj, tabsObj[type])
      model.pages = 1
      model.getGoodsList(model.pages, urlObj, 'no')
    },

    // 获取商品数据
    getGoodsList: function (pages, whereobj, addtype) {
      let myURL = url.parse(window.location.href)
      if (addtype === 'no') {
        model.goodsArr = []
      }
      model.is_loading = true
      let tmpurl = ''
      if (!_.isEmpty(whereobj)) {
        tmpurl = myURL.pathname + '?' + querystring.stringify(whereobj)
      } else {
        tmpurl = myURL.pathname
      }
      history.replaceState('', '', tmpurl)
      let param = {
        limit: pagesize,
        skip: pagesize * (pages - 1)
      }
      param = _.extend(param, whereobj)
      axios.get('functions/cloud/cloud_collect', {
        headers: {
          'X-DP-Token': token
        },
        params: param
      }).then(function (data) {
        model.is_loading = false
        if (data.data.items.length > 0) {
          data.data.items.forEach((tmp) => {
            tmp.checked = 0
          })
          model.goodsArr = _.union(model.goodsArr, data.data.items)
          model.pages++
          window.mui('#pullfresh').pullRefresh().endPullupToRefresh()
        } else {
          model.is_nodata = true
          window.mui('#pullfresh').pullRefresh().endPullupToRefresh()
        }
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

    // 下拉刷新获取数据
    pulldownRefresh: function () {
      model.is_loading = true
      let myURL = url.parse(window.location.href)
      let urlObj = querystring.parse(myURL.query)
      $('.mui-pull-bottom-pocket').remove()
      model.getGoodsList(model.pages, urlObj, 'getmore')
    },

    // 全选
    checkAllItem: function () {
      model.checkIdAll = []
      model.checkedall = !model.checkedall
      if (model.checkedall) {
        model.goodsArr.forEach((item) => {
          item.checked = item.id
          model.checkIdAll.push(item.id)
        })
      } else {
        model.goodsArr.forEach((item) => {
          item.checked = 0
        })
        model.checkIdAll = []
      }
    },

    // 删除收藏
    delMyCollect: function () {
      var btnArray = ['否', '是']
      window.mui.confirm('确认删除收藏？', '友情提示', btnArray, function (e) {
        if (e.index === 1) {
          let param = {
            _method: 'DELETE',
            ids: model.checkIdAll.join(',')
          }
          axios.post('functions/cart/app_preference', null, {
            data: param
          }).then(function (data) {
            model.goodsArr.forEach((item) => {
              if (_.indexOf(model.checkIdAll, item.id) > -1) {
                model.goodsArr = _.without(model.goodsArr, item)
              }
            })
            window.mui.toast('取消收藏成功!')
          }).catch(function (error) {
            if (error.response.data.message === 'token is invalid') {
              window.mui.toast('登录信息过期!')
              setTimeout(function () {
                Cookies.set('dpjia-hall-token', '')
                window.location.reload()
              }, 2000)
            }
          })
        }
      })
    },

    // 获取分类数据（品类）
    getSimpleType: function () {
      let param = {
        where: {
          com_id_poi_companys: this.$store.state.comid
        },
        order: '-id',
        limit: 1
      }
      axios.get('classes/company_skin_logs', {
        params: param
      }).then(function (data) {
        let info = JSON.parse(data.data.items[0].config)
        model.classifyArr[0].list = info[0].header[2].nav
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

    // 获取分类数据（品牌）
    getBands: function () {
      let param = {
        limit: 100,
        where: {
          com_id_poi_companys: this.$store.state.comid
        }
      }
      axios.get('classes/companys_brand', {
        params: param
      }).then(function (data) {
        data.data.items.forEach((item) => {
          item.state = 'on'
        })
        model.classifyArr[1].list = data.data.items
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

    // 获取公司开启的风格、空间
    getStyleField: function () {
      let param = {
        where: {
          com_id_poi_companys: this.$store.state.comid
        }
      }
      axios.get('classes/companys_self_type', {
        params: param
      }).then(function (data) {
        let styleids = data.data.items[0].companys_self_type_styleid
        let fielsids = data.data.items[0].companys_self_type_fieldid
        model.getStyle(styleids)
        model.getField(fielsids)
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

    // 获取分类数据（风格）
    getStyle: function (str) {
      let styleids = str.split(',') || []
      let param = {
        limit: 100,
        where: JSON.stringify(['style_id in ?', styleids])
      }
      axios.get('classes/furniture_styles', {
        params: param
      }).then(function (data) {
        data.data.items.forEach((item) => {
          item.state = 'on'
        })
        model.classifyArr[2].list = data.data.items
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

    // 获取分类数据（空间）
    getField: function (str) {
      let fieldids = str.split(',') || []
      let param = {
        where: JSON.stringify(['field_id in ?', fieldids])
      }
      axios.get('classes/furniture_field_types', {
        params: param
      }).then(function (data) {
        data.data.items.forEach((item) => {
          item.state = 'on'
        })
        model.classifyArr[3].list = data.data.items
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

    // 显示各分类全部（收起）
    showAllTypes: function (obj) {
      obj.showall = !obj.showall
    },

    // 点击筛选
    showClassify: function () {
      $('#classifylist').show()
      $('#classifylist').addClass('animated bounceInRight')
      setTimeout(function () {
        $('#classifylist').removeClass('bounceInRight')
      }, 1000)
    },

    // 选择分类
    choiceType: function (item, sub) {
      model.classifyActiveArr = _.filter(model.classifyActiveArr, function (tmp) {
        return tmp.type !== item.type
      })
      let obj = {
        type: item.type,
        val: sub.id
      }
      item.active = sub.id
      model.classifyActiveArr.push(obj)
    },

    // 重置分类
    resetClassify: function () {
      model.is_nodata = false
      let myURL = url.parse(window.location.href)
      model.classifyActiveArr = []
      model.goodsArr = []
      model.pages = 1
      let urlObj = querystring.parse(myURL.query)
      delete urlObj.secondtype
      delete urlObj.thirdtype
      delete urlObj.brand
      delete urlObj.style
      delete urlObj.field
      model.checkUrl(urlObj)
      model.getGoodsList(model.pages, urlObj, 'no')
      $('#classifylist').hide()
    },

    // 确定分类
    setClassify: function () {
      model.is_nodata = false
      let obj = {
        secondtype: model.getFilter(model.classifyActiveArr, 'secondtype'),
        brand: model.getFilter(model.classifyActiveArr, 'brand'),
        style: model.getFilter(model.classifyActiveArr, 'style'),
        field: model.getFilter(model.classifyActiveArr, 'field')
      }
      for (var key in obj) {
        if (_.isEmpty(obj[key])) {
          delete obj[key]
        }
      }
      model.goodsArr = []
      model.pages = 1
      let myURL = url.parse(window.location.href)
      let urlObj = querystring.parse(myURL.query)
      delete urlObj.secondtype
      delete urlObj.thirdtype
      delete urlObj.brand
      delete urlObj.style
      delete urlObj.field
      urlObj = _.extend(urlObj, obj)
      model.getGoodsList(model.pages, urlObj, 'no')
      $('#classifylist').hide()
    },

    // 过滤分类筛选条件
    getFilter: function (arr, type) {
      let obj = _.filter(arr, function (item) {
        return item.type === type
      })
      return ((obj || [])[0] || {}).val
    },

    // 按照价格排序
    orderByPrice: function (type) {
      model.is_nodata = false
      let myURL = url.parse(window.location.href)
      model.activeTab = type
      model.priceicon = !model.priceicon
      let urlObj = querystring.parse(myURL.query)
      delete urlObj.secondtype
      delete urlObj.thirdtype
      delete urlObj.brand
      delete urlObj.style
      delete urlObj.field
      delete urlObj.up_time
      delete urlObj.price
      delete urlObj.comprehensive
      urlObj = _.extend(urlObj, tabsObj[type])
      urlObj.price = model.priceicon ? 'desc' : 'asc'
      model.pages = 1
      model.getGoodsList(model.pages, urlObj, 'no')
    }
  },
  mounted () {
    model = this
    this.inits(1)
    window.mui.init({
      pullRefresh: {
        container: '#pullfresh',
        up: {
          contentnomore: '没有更多',
          callback: model.pulldownRefresh
        }
      }
    })
  }
}
</script>

<style>
  .p20-box{
    position: fixed;
    top: 44px;
    width: 100%;
    padding: 0 10px;
    z-index: 10;
    background-color: #fff;
  }
  .list-item{
    margin-top: 40px;
  }
  .loading-icon,
  .nodata-icon{
    height: 30px;
    margin: 10px 0;
    text-align: center;
  }
  .loading-text,
  .nodata-text{
    position: relative;
    top: -7px;
    left: 5px;
    font-size: 14px;
  }
  .clasify-tabs{
    height: 40px;
    padding: 0 30px;
  }
  .clasify-tabs .mui-grid-9{
    background-color: #fff !important;
    border-top: none !important;
    border-left: none !important;
  }
  .clasify-tabs .mui-grid-9 .mui-table-view-cell{
    height: 40px;
    border: none;
    padding: 0;
  }
  .clasify-tabs .mui-grid-9 .mui-table-view-cell a{
    height: 40px;
    padding: 0 !important;
  }
  .clasify-tabs .mui-grid-9 .mui-table-view-cell a.active .tab-text{
    color: #5075ce;
  }
  .clasify-tabs .mui-grid-9 .mui-table-view-cell .mui-media-body {
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0;
  }
  .clasify-tabs .tab-text{
    display: inline-block;
    height: 16px;
  }
  .activeprice{
    color: #5075ce;
  }
  .clasify-tabs .self-iocn{
    position: relative;
    left: 2px;
    display: inline-block;
    background: url('/images/person.png') no-repeat;
    background-size: 498px;
  }
  .clasify-tabs .price-down{
    top: 5px;
    width: 12px;
    height: 16px;
    background-position: -225px -71px;
  }
  .clasify-tabs .price-up{
    top: 5px;
    width: 12px;
    height: 16px;
    background-position: -241px -71px;
  }
  .clasify-tabs .selected-icon{
    top: 3px;
    width: 16px;
    height: 16px;
    background-position: -260px -68px;
  }
  .f4-line{
    width: 100%;
    height: 10px;
    background-color: #f4f4f4;
  }
  .goods-list{
    top: 94px !important;
  }
  .goods-list .mui-media {
    height: 100px;
    padding: 10px;
    border-bottom: 1px solid #cccccc;
  }
  .goods-list .mui-media .info-box{
    height: 80px;
    padding: 0;
    margin: 0;
  }
  .goods-list .mui-media .info-box .check-btn{
    position: relative;
    top: 25px;
    margin-right: 5px;
    display: inline-block;
    float: left;
    width: 30px;
    height: 30px;
    background: url('/images/person.png') no-repeat;
    background-size: 498px;
  }
  .goods-list .mui-media .info-box .checked{
    background-position: -293px -62px;
  }
  .goods-list .mui-media .info-box .uncheck{
    background-position: -323px -62px;
  }
  .goods-list .mui-media .info-box img{
    width: 80px;
    height: 80px;
    max-width: 80px;
    max-height: 80px;
  }
  .goods-list .mui-media .fur-name{
    height: 42px;
    font-size: 16px;
    color: #050505;
    font-weight: 600;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .opt-box{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #ababab;
    background-color: #fff;
    z-index: 1000;
  }
  .opt-box a {
    display: inline-block;
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #3d3d3d;
    font-size: 15px;
  }
  .opt-box a .check-btn{
    position: relative;
    top: 10px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('/images/person.png') no-repeat;
    background-size: 498px;
  }
  .opt-box a .checked{
    background-position: -293px -62px;
  }
  .opt-box a .uncheck{
    background-position: -323px -62px;
  }
  .opt-box a.del-btn{
    background-color: #5075ce;
    color: #fff;
  }
  .mui-media-body{
    height: 80px;
    padding: 2px 0;
  }
  .fur-price{
    height: 32px;
  }
  .fur-price > span{
    display: inline-block;
    position: relative;
    top: 12px;
    font-weight: 600;
  }
  .fur-price .price{
    font-size: 16px;
    color: #4e73cd;
  }
  .fur-price .sub-price{
    margin-left: 6px;
    font-size: 12px;
    color: #b0b0b0;
    text-decoration:line-through;
  }
  .goods-list .mui-media:after{
    background-color: #fff;
  }
  .mui-table-view-cell:after{
    background-color: #fff;
  }
  .mui-table-view:before,
  .mui-table-view:after{
    background-color: #fff;
  }
  .classify-box{
    display: none;
    position: fixed;
    top: 44px;
    z-index: 1000;
    width: 100%;
    height: calc(100% - 44px);
    background-color: rgba(0, 0, 0, 0.6);
    overflow-y: auto;
  }
  .sub-classify{
    position: absolute;
    right: 0;
    top: 0;
    width: 280px;
    min-height: calc(100% - 44px);
    padding: 10px;
    background-color: #fff;
    padding-bottom: 50px;
  }
  .clasify-item{
    margin-bottom: 20px;
  }
  .clasify-item .title{
    margin: 0;
    padding: 0;
    height: 22px;
    line-height: 22px;
    margin-bottom: 10px;
  }
  .title > label {
    color: #050505;
  }
  .title > a{
    float: right;
  }
  .clasify-item .items-ul{
    margin: 0;
    padding: 4px;
    list-style: none;
  }
  .clasify-item .items-ul li{
    display: inline-block;
    list-style: none;
    width: 74px;
    height: 30px;
    margin-right: 12px;
    margin-bottom: 6px;
  }
  .clasify-item .items-ul li:nth-child(3n){
    margin-right: 0;
  }
  .clasify-item .items-ul li a{
    display: inline-block;
    width: 80px;
    height: 30px;
    padding: 0 5px;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    text-decoration: none;
    color: #3d3d3d;
    border: 1px solid #737373;
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clasify-item .items-ul .active a{
    background-color: #5075ce;
    border: 1px solid #5075ce;
    color: #fff;
  }
  .clasify-btn{
    position: fixed;
    right: 0;
    bottom: 0;
    width: 280px;
    height: 50px;
    z-index: 100;
    background-color: #fff;
  }
  .clasify-btn > a{
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #3d3d3d;
    font-size: 15px;
    border-top: 1px solid #ababab;
    cursor: pointer;
  }
  .clasify-btn .submit-btn{
    background-color: #5075ce;
    border-top: 1px solid #5075ce;
    color: #fff;
  }
</style>
