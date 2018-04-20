<template>
<div>
  <div class="subbox-show" style="position: relative" v-show="activeTab == 'one'">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">
        <span style="position: relative;top: -1px;">返回</span>
      </a>
      <span class="fa close-icon" @click="goHome()">×</span>
      <h1 class="mui-title othertitle">编辑竞争信息</h1>
      <a class="mui-icon mui-pull-right save-btn" @click="confEditComp()">提交</a>
    </header>
    <div class="textarea-box" style="height: initial">
      <div class="line-box"></div>
      <div>
        <div class="mui-input-row sub-input-box mui-navigate-right" @click="enterOtherCompete('second_party_competitor','乙方竞争对手')">
          <label>乙方对手</label>
          <span class="area-text sub-input-text">{{((competitors.second_party_competitor || '').split(',') || []).join('/')}}</span>
        </div>
        <div class="mui-input-row sub-input-box mui-navigate-right" style="display: none" @click="enterOtherCompete('competitor','报备人对手')">
          <label>竞争对手</label>
          <span class="area-text sub-input-text">{{((competitors.competitor || '').split(',') || []).join('/')}}</span>
        </div>
        <div class="mui-input-row sub-input-box">
          <label>项目亮点</label>
          <input type="text" placeholder="输入项目亮点" v-model="competitors.competitor_strengths">
        </div>
        <div class="mui-input-row sub-input-box">
          <label>形式预测</label>
          <input type="text" placeholder="输入形式预测" v-model="competitors.competitor_projections">
        </div>
      </div>
    </div>
  </div>
  <div v-show="activeTab == 'two'" class="subbox-show" style="position: relative">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="goSubBack()">
          <span style="position: relative;top: -1px;">返回</span>
        </a>
        <span class="fa close-icon" @click="goHome()">×</span>
        
        <a class="mui-icon mui-pull-right save-btn" @click="endOtherCompete()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron nav">
        <li class="mui-table-view-cell comp-input-box" v-for="(item, num) in jzds">
          <div class="jzztitele">第{{num+1}}竞争者</div>
          <div class="mui-input-row" style="width:80%;float:left;height: 44px;">
            <input maxlength="20" type="text"  class="mui-input-clear othertextarea" v-model="item.value"/> 
          </div>
          <div v-show="num != 0" class="fa fa-times-circle" style="color:red; float: right;width: 10%; margin-top: 14px" @click="deletejzz(item)"></div>
        </li>
      </ul>
      <span class="addjjz" @click="addjjz()">添加竞争者</span>
    </div>
</div>
</template>
<script>
let _ = require('underscore')
let url = require('url')
let model
let myURL
export default {
  props: ['compete'],
  data () {
    return {
      competitors: {

      },
      clonecompet: {},
      jzds: [],
      activeTab: 'one'
    }
  },
  methods: {
    init: function () {
      model.competitors = this.compete
      model.clonecompet = _.clone(this.compete)
      let jzdsarr = model.competitors.second_party_competitor.split(',')
      jzdsarr.forEach(item => {
        model.jzds.push({value: item})
      })
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    },

    enterOtherCompete: function () {
      model.activeTab = 'two'
      model.jzds = []
      let jzdsarr = model.competitors.second_party_competitor.split(',')
      jzdsarr.forEach(item => {
        model.jzds.push({value: item})
      })
    },

    // 添加竞争者
    addjjz: function () {
      model.jzds.push({value: ''})
    },

    // 删除竞争对手
    deletejzz: function (item) {
      model.jzds = _.without(model.jzds, item)
    },

    // 提交竞争对手
    endOtherCompete: function () {
      let arr = []
      model.jzds.forEach((item) => {
        if (!_.isEmpty(item.value)) {
          arr.push(item.value)
        }
      })
      model.competitors.second_party_competitor = arr.join(',')
      model.activeTab = 'one'
    },

    // 提交
    confEditComp: function () {
      let obj = {
        flag: true,
        data: model.competitors
      }
      model.$emit('getCompete', obj)
    },

    // 返回编辑
    goSubBack: function () {
      model.activeTab = 'one'
    },

    // 返回详情
    goBack: function () {
      let obj = {
        flag: false,
        data: model.clonecompet
      }
      model.$emit('getCompete', obj)
    }

  },
  mounted () {
    model = this
    this.init()
  }
}
</script>
<style>
</style>
