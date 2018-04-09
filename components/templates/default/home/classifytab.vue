<template>
<div class="tabs">
  <ul class="mui-table-view mui-grid-view mui-grid-9">
    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
      <a :href="linkPath + '/furclassify'">
        <span class="mui-icon self-icon classify-icon"></span>
        <div class="mui-media-body label-text">分类查询</div>
      </a>
    </li>
    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
      <a :href="linkPath + '/goodslist'">
        <span class="mui-icon self-icon goods-icon"></span>
        <div class="mui-media-body label-text">全部商品</div>
      </a>
    </li>
    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3" @click="toMyCollect()">
      <a href="javascript:;">
        <span class="mui-icon self-icon collect-icon"></span>
        <div class="mui-media-body label-text">我的收藏</div>
      </a>
    </li>
    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
      <a :href="linkPath + '/person'">
        <span class="mui-icon self-icon per-icon">
          <span class="mui-badge" style="top: 2px" v-if="msgnum > 0">{{msgnum}}</span>
        </span>
        <div class="mui-media-body label-text">个人中心</div>
      </a>
    </li>
  </ul>
</div> 
</template>
<script>
import axios from '~/plugins/axios'
let url = require('url')
let Cookies = require('js-cookie')
let $ = require('jquery')
let _ = require('underscore')
let model
let token
export default {
  data () {
    return {
      msgnum: 0, // 未读消息数量
      linkPath: ''
    }
  },
  methods: {
    init: function () {
      token = Cookies.get('dpjia-hall-token')
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      if (!_.isEmpty($.trim(token))) {
        axios.get('users/cloud_personal?com_id=' + this.$store.state.comid, {
          headers: {
            'X-DP-Token': token
          }
        }).then(function (data) {
          model.msgnum = data.data.readed || 0
        }).catch(function (error) {
          if (error.response.data.message === 'token is invalid') {
            window.mui.toast('登录信息过期!')
            Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
          }
        })
      }
    },

    // 我的收藏
    toMyCollect: function () {
      if (_.isEmpty($.trim(token))) {
        var btnArray = ['否', '是']
        window.mui.confirm('还未登录,是否登录？', '友情提示', btnArray, function (e) {
          if (e.index === 1) {
            Cookies.set('dpjia-preurl', '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/login'
          }
        })
        return false
      } else {
        window.location.href = model.linkPath + '/mycollect'
      }
    }
  },
  mounted () {
    model = this
    model.linkPath = '/' + this.$store.state.comname
    this.init()
  }
}
</script>

<style>
  .tabs .mui-table-view {
    background-color: #fff;
    padding: 10px 0;
  }
  .tabs .mui-table-view .mui-table-view-cell {
    border-bottom: none;
    padding: 0 15px;
  }
  .tabs .mui-table-view .mui-table-view-cell a {
    padding: 0 !important;
  }
  .self-icon{
    display: inline-block;
    width: 36px;
    height: 36px;
    background: url('/images/home.png') no-repeat;
    background-size: 164px;
    
  }
  .classify-icon{
    background-position: -1px -2px;
  }
  .goods-icon{
    background-position: -43px -2px;
  }
  .collect-icon{
    background-position: -84px -2px;
  }
  .per-icon{
    background-position: -125px -2px;
  }
  .label-text{
    font-size: 12px !important;
    color: #989898 !important;
  }
</style>
