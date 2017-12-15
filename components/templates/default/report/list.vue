<template>
  <div>
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
            <h4>
              <i>{{item.amount}}万元</i>·<span>{{item.name}}</span>
            </h4>
            <span class="report-state" v-bind:class="item.state" v-if="item.state != 'wait'">
              <span class="sub" v-bind:class="item.state"></span>
              <span class="white-sub"></span>
              <span>{{proStateFilter(item.state)}}</span>
            </span>
            <div class="stars-style">
              <span class="star-box">
                <i class="fa mui-action-back mui-icon mui-icon-left-nav mui-pull-right"  v-for="sub in stars" aria-hidden="true" v-bind:class="sub <= item.feasibility ? 'fa-star' : 'fa-star-o'"></i>
              </span>
            </div>
            <div class="fz12">{{item.first_party_name}}</div>
            <div class="fz12 intro-style">{{item.intro}}</div>
            <div class="detail">
              <a :href="'/projectdetail?id=' + item.id">查看详情</a>
            </div>
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
  let pagesize = 2
  let flowState = [] // 项目状态
  export default {
    data () {
      return {
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
          let classFlag = $(event.target).attr('href')
          window.location.href = model.linkPath + classFlag
        })
        await model.getData()
      },

      // 下拉刷新获取数据
      pulldownRefresh: function () {
        model.is_loading = true
        $('.mui-pull-bottom-pocket').remove()
        model.getData()
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
    height: 174px;
    background: #fff;
    border-radius: 5px;
  }
  h4 {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    font-weight: 100;
    text-align: center;
    border-bottom: 1px dashed #BEBEBE;
    margin: 0;
  }
  h4 i{
    font-style:normal;
    color: red;
  }
  h4 span {
    color: #000;
  }
  .report-state{
    position: absolute;
    right: 0;
    top: -6px;
    display: inline-block;
    width: 50px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    font-size: 12px;
    border-radius: 0 0 5px 5px; 
  }
  .wait_handle {
    background-color: #5278e5;
  }
  .had_handle {
    background-color: #5278e5;
  }
  .adopt {
    background-color: #5278e5;
  }
  .rescinded {
    background-color: #ccc;
  }
  .had_handle{
    border-bottom: 6px solid #5278e5;
  }
  .reject {
    background-color: #f14F4F;
  }
  .had_reset {
    background-color: #f14F4F;
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
    margin-top: 14px;
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
    font-size: 20px;
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
  .navul {
    position: fixed;
    top: 44px;
    width: 100%;
    overflow: hidden;
    height: 40px;
    padding: 5px 0px;
    background: #fff;
    z-index: 1000;
  }
  .navul li {
    float: left;
    width: 33.33%;
    height: 30px;
    list-style-type: none;
    border-right: 1px solid #CBCBCB;
    position: relative;
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
    height: 5px;
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
    background-color: #eee;
  }
</style>