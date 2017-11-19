<template>
<div class="tabs">
  <ul class="mui-table-view mui-grid-view mui-grid-9">
    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
      <a href="/furclassify">
        <span class="mui-icon mui-icon-home"></span>
        <div class="mui-media-body">分类查询</div>
      </a>
    </li>
    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
      <a href="/goodslist?comprehensive=comprehensive">
        <span class="mui-icon mui-icon-email"></span>
        <div class="mui-media-body">全部商品</div>
      </a>
    </li>
    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3" @click="toMyCollect()">
      <a href="javascript:;">
        <span class="mui-icon mui-icon-chatbubble"></span>
        <div class="mui-media-body">我的收藏</div>
      </a>
    </li>
    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
      <a href="/person">
        <span class="mui-icon mui-icon-location"></span>
        <div class="mui-media-body">个人中心</div>
      </a>
    </li>
  </ul>
</div> 
</template>
<script>
let Cookies = require('js-cookie')
let $ = require('jquery')
let _ = require('underscore')
export default {
  data () {
    return {
    }
  },
  methods: {
    init: function () {
    },

    // 我的收藏
    toMyCollect: function () {
      let token = Cookies.get('dpjia-hall-token')
      if (_.isEmpty($.trim(token))) {
        var btnArray = ['否', '是']
        window.mui.confirm('还未登录,是否登录？', '友情提示', btnArray, function (e) {
          if (e.index === 1) {
            window.location.href = '/mycollect'
          }
        })
        return false
      } else {
        window.location.href = '/mycollect'
      }
    }
  },
  mounted () {
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
</style>
