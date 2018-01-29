<template>
  <div>
    <div class="mui-input-row mui-search">
      <a target="_blank" style="position: absolute;left: 12px;top: 10px;width: 26px;height: 26px;" href="http://help.dpjia.com/%E4%BA%A7%E5%93%81%E6%96%87%E6%A1%A3/%E4%BA%A7%E5%93%81%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C/%E9%A1%B9%E7%9B%AE%E6%8A%A5%E5%A4%87/%E5%BF%AB%E9%80%9F%E6%8A%A5%E5%A4%87" class="mui-pull-right">
        <span class="list-icon help-icon"></span>
      </a>
      <input type="text" class="search-box-input" v-model="searchKey" placeholder="搜素您想要查找的项目">
      <a :href="linkPath + '/newproject'" class="mui-pull-right" style="position: absolute;right: 10px;top: 9px;width: 26px;height: 26px;">
        <span class="list-icon add-icon"></span>
      </a>
    </div>
    <ul class="navul">
      <li @click="switchTab('all')" v-bind:class="{active:'all'== active}">
        <span class="text">全部项目</span>
        <span class="bglan"></span>
      </li>
      <li @click="switchTab('wait')"  v-bind:class="{active:'wait'== active}">
        <span class="text">未报备项目</span>
        <span class="bglan"></span>
      </li>
      <li @click="switchTab('other')" v-bind:class="{active:'other'== active}">
        <span class="text">已报备项目</span>
        <span class="bglan"></span>
      </li>
    </ul>
    <div>
      <div class="mui-scroll-wrapper" id="pullfresh">
        <div class="mui-scroll">
          <div v-for="item in datalist" class="listdiv">
            <a :href="'/projectdetail?id=' + item.id" class="flagdetail">
              <h4 class="mui-ellipsis">
                <i>{{parseFloat(item.amount)}}万元</i><span>·{{String(item.name).length > 13 ? String(item.name).substring(0, 13) + '...': String(item.name)}}</span>
              </h4>
              <div>
                <span class="report-state" v-bind:class="item.state" v-if="item.state == 'rescinded' || item.state == 'had_reset' || item.state == 'adopt' || item.state == 'had_handle' || item.state == 'wait_handle'">
                  <span class="sub" v-bind:class="item.state"></span>
                  <span class="white-sub"></span>
                  <span>{{proStateFilter(item.state)}}</span>
                </span>
                <span class="report-state-icon" v-bind:class="item.state" v-show="item.state == 'reject' || item.state == 'shutdown' || item.state == 'overdue'"></span>
                <div class="stars-style">
                  <span class="star-box">
                    <i class="fa fa-star"  v-for="sub in stars" aria-hidden="true" v-if="sub <= item.feasibility"></i>
                  </span>
                </div>
                <div class="fz12 mui-ellipsis">{{String(item.first_party_name).length > 13 ? String(item.first_party_name).substring(0, 13) + '...': String(item.first_party_name)}}</div>
                <div class="fz12 intro-style mui-ellipsis">{{String(item.sketch).length > 13 ? String(item.sketch).substring(0, 13) + '...': String(item.sketch)}}</div>
              </div>
              <div class="detail">
                <a href="javascript:;">
                查看详情
                <span class="active-point">•</span>
                </a>
              </div>
            </a>
          </div>
          <p class="loading-icon" v-show="is_loading">
            <span class="mui-spinner"></span>
            <span class="loading-text">{{loadingText}}</span>
          </p>
          <p class="nodata-icon" v-show="is_nodata">
            <span class="nodata-text">没有更多数据啦~</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from '~/plugins/axios'
  let url = require('url')
  let $ = require('jquery')
  let _ = require('underscore')
  let model
  let pagesize = 6
  let flowState = [] // 项目状态
  export default {
    data () {
      return {
        searchKey: '',
        linkPath: '',
        pages: 1,
        stars: [5, 4, 3, 2, 1],
        state: '',
        active: 'all',
        datalist: [],
        is_loading: false,
        is_nodata: false,
        loadingText: '正在加载...'
      }
    },
    methods: {
      // 初始化数据
      init: async function () {
        let myURL = url.parse(window.location.href)
        model.linkPath = '/' + myURL.pathname.split('/')[1]
        window.mui('#pullfresh').on('tap', 'a', function (event) {
          let objclass = $(event.target).closest('.flagdetail').attr('href')
          window.location.href = model.linkPath + objclass
        })
        await model.getData()

        // 搜索enter事件注册执行enter事件
        document.onkeydown = function (e) {
          var ev = document.all ? window.event : e
          if (ev.keyCode === 13) {
            if (!_.isEmpty(model.searchKey)) {
              model.pages = 1
              model.datalist = []
              model.getSearch()
            }
          }
        }
      },

      // 搜索
      getSearch: function () {
        model.is_loading = true
        model.getSearchData()
      },

      // 搜索接口
      getSearchData: function () {
        let param = {
          clazz: 'projects',
          skip: (model.pages - 1) * pagesize,
          limit: pagesize,
          com_id_poi_companys: this.$store.state.comid,
          search: model.searchKey
        }
        axios.get('es/es', {
          params: param
        }).then(function (msg) {
          if (msg.data.items.length > 0) {
            model.datalist = _.union(model.datalist, msg.data.items)
            model.pages++
            window.mui('#pullfresh').pullRefresh().endPullupToRefresh()
          } else {
            model.is_loading = false
            model.is_nodata = true
            window.mui('#pullfresh').pullRefresh().endPullupToRefresh()
          }
        }).catch(function (error) {
          console.log(error)
        })
      },

      // 下拉刷新获取数据
      pulldownRefresh: function () {
        model.is_loading = true
        $('.mui-pull-bottom-pocket').remove()
        if (!_.isEmpty(model.searchKey)) {
          // 有搜索
          model.getSearchData()
        } else {
          model.getData()
        }
      },

      // 获取项目数据
      getData: function () {
        let param = {
          skip: (model.pages - 1) * pagesize,
          limit: pagesize,
          order: '-update_time'
        }
        if (model.active !== 'all') {
          if (model.active === 'other') {
            param = _.extend(param, {where: JSON.stringify({'state': {'$ne': 'wait'}})})
          } else {
            param = _.extend(param, {where: {state: model.active}})
          }
        }
        axios.get('classes/projects', {
          params: param
        }).then(function (msg) {
          if (msg.data.items.length > 0) {
            model.datalist = _.union(model.datalist, msg.data.items)
            model.pages++
            window.mui('#pullfresh').pullRefresh().endPullupToRefresh()
          } else {
            model.is_loading = false
            model.is_nodata = true
            window.mui('#pullfresh').pullRefresh().endPullupToRefresh()
          }
        }).catch(function (error) {
          console.log(error)
        })
      },

      // 切换tabs
      switchTab: function (str) {
        model.is_nodata = false
        model.datalist = []
        model.pages = 1
        model.active = str
        model.init()
      },

      // 获取项目常量信息
      getPorState: async function () {
        let param = {
          where: JSON.stringify({
            state_types: {
              $in: ['report_state']
            }
          })
        }
        let res = await axios.get('classes/selectable_states', {params: param})
        res.data.items.forEach((item) => {
          // 项目流程状态
          if (item.state_types === 'report_state') {
            let tmp = {
              'text': item.alias,
              'value': item.name
            }
            flowState.push(tmp)
          }
        })
      },

      // 项目状态过滤
      proStateFilter: function (str) {
        let res = ''
        flowState.forEach((item) => {
          if (item.value === str) {
            res = item.text
          }
        })
        return res
      }
    },
    async mounted () {
      model = this
      await model.getPorState()
      await this.init()
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
<style scoped>
  .list-icon {
    position: absolute;
    top: -2px;
    width: 26px;
    height: 26px;
    background: url('/images/list_icon.png') no-repeat;
    background-size: 250px;
  }
  .help-icon{
    left: -2px;
    background-position: -74px -3px;
  }
  .add-icon{
    right: 3px;
    background-position: -117px -3px;
  }
  .report-state-icon {
    position: absolute;
    z-index: 6;
    top: 0;
    right: 30px;
    width: 68px;
    height: 44px;
    background: url('/images/report_state.png') no-repeat;
    background-size: 615px;
  }
  .reject{
    background-position: -27px -55px;
  }
  .overdue{
    background-position: -206px -55px;
  }
  .shutdown{
    background-position: -117px -55px;
  }
  .mui-search {
    height: 43px;
  }
  .search-box-input {
    position: relative;
    top: 7px;
    display: block;
    width: 70%;
    height: 30px;
    margin: 0 auto;
    border-radius: 50px;
    font-size: 12px;
    border: none;
    background-color: #eee;
  }
  .svg-style {
    width: 18px;
    height: 18px;
    fill: #ccc;
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
  .mui-bar-nav~.mui-content{
    padding-top: 0px!important;
  }
  .listdiv {
    position: relative;
    margin: 15px;
    height: 170px;
    background: #fff;
    border-radius: 5px;
  }
  h4 {
    height: 44px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 100;
    text-align: center;
    border-bottom: 1px dashed #eee;
    margin: 0;
    font-weight: 600,
  }
  h4 i{
    font-style:normal;
    color: #f14f4f;
    font-weight: 600;
  }
  h4 span {
    color: #333;
    font-weight: 600;
  }
  .report-state{
    position: absolute;
    right: 0;
    top: -6px;
    display: inline-block;
    width: 64px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    font-size: 12px;
    border-radius: 0 0 5px 5px; 
  }
  .wait_handle,
  .had_handle,
  .adopt {
    background-color: #5278e5;
    border-bottom: 6px solid #5278e5;
  }
  .had_reset {
    background-color: #f14F4F;
    border-bottom: 6px solid #f14F4F;
  }
  .rescinded {
    background-color: #ccc;
    border-bottom: 6px solid #ccc;
  }
  .report-state .sub{
    position: absolute;
    width: 6px;
    height: 6px;
    left: -6px;
    top: 0;
    display: inline-block;
  }
  .report-state .white-sub{
    position: absolute;
    width: 0px;
    height: 0px;
    left: -6px;
    top: 0;
    display: inline-block;
    border-top: 6px solid #efeff4;
    border-right: 6px solid transparent;
  }
  
  .stars-style{
    height: 24px;
    line-height: 24px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .stars-style .fa{
    display: inline-block;
    width: 22px;
    height: 22px;
  }
  .star-box{
    display: block;
    width: 112px;
    height: 24px;
    margin: 0 auto;
  }
  .fa-star {
    color: #ffb400;
    font-size: 18px;
  }
  .fa-star-o {
    color: #ccc;
    font-size: 20px;
  }
  .fz12 {
    font-size: 12px;
    text-align: center;
    height: 26px;
    line-height: 24px;
    color: #696969;
  }
  .intro-style{
    padding: 0 10px;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detail {
    position: relative;
    height: 30px;
    line-height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #929292;
    text-align: center;
    background: #E5E5E5;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .detail a {
    color: #999;
  }
  .detail .active-point {
    display: none;
    position: relative;
    left: -9px;
    top: -6px;
    font-size: 16px;
    color: #f14f4f;
  }
  .navul {
    position: fixed;
    top: 46px;
    width: 100%;
    overflow: hidden;
    height: 34px;
    padding: 0px;
    background: #fff;
    z-index: 1000;
  }
  .navul li {
    float: left;
    width: 33.33%;
    height: 30px;
    list-style-type: none;
    border-right: 1px solid #eee;
    position: relative;
    top: 2px;
  }
  .navul li:last-child{
    border: 0px;
  }
  .navul li span{
    float: left;
    font-size: 14px;
    height: 30px;
    line-height: 26px;
    text-align: center;
    width: 100%;
    color: #9B9B9B
  }
  .navul li .bglan {
    width: 27%;
    margin: 0 auto;
    height: 3px;
    background: #4E7AE7;
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    top: 25px;
    border-radius: 50px;
    display: none;
  }
  .navul li.active .text{
    color: #4E7AE7;
  }
  .navul li.active .bglan{
    display: block;
  }
  #pullfresh{
    position: fixed;
    top: 80px;
    bottom: 60px;
    background-color: #eee;
  }
</style>