<template>
<div>
  <div class="subbox-show" style="position: relative">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="subGoBack()">
        <span style="position: relative;top: -1px;">返回</span>
      </a>
      <span class="fa close-icon" @click="goHome()">×</span>
      <h1 class="mui-title othertitle">联系人</h1>
      <a class="mui-icon mui-pull-right save-btn" @click="subaddlinkman()">提交</a>
    </header>
    <ul class="mui-table-view mui-table-view-chevron nav">
      <li class="mui-table-view-cell linkmantext linkman-box" style="padding: 0 !important" v-for="(item, num) in alinkman">
        <div class="jzztitele" style="padding-left: 25px;">
          第{{num+1}}联系人
          <div v-show="num != 0" class="fa fa-times-circle" style="color:red; float: right;width: 10%; margin-top: 8px" @click="deletelinkman(item)"></div>
        </div>
        <div class="mui-input-row" style="border-bottom: 1px solid #eee;padding: 0 10px;background-color: #fff;">
          <label class="linkman-title">联系人姓名</label>
          <input style="width:60%!important" maxlength="20" type="text"  class="mui-input-clear" v-model="item.name"/> 
        </div>
        <div class="mui-input-row" style="border-bottom: 1px solid #eee;padding: 0 10px;background-color: #fff;">
          <label class="linkman-title">联系人职务</label>
          <input style="width:60%!important" maxlength="20" type="text"  class="mui-input-clear" v-model="item.job"/> 
        </div>
        <div class="mui-input-row" style="padding: 0 10px;background-color: #fff;">
          <label class="linkman-title">联系人电话</label>
          <input style="width:60%!important" maxlength="20" type="text"  class="mui-input-clear" v-model="item.tel"/> 
        </div>
      </li>
    </ul>
    <span class="addlinkman" @click="addsublinkman()">添加联系人</span>
  </div>
</div>
</template>
<script>
let _ = require('underscore')
let url = require('url')
let model
let myURL
export default {
  props: ['linkmanobj'],
  data () {
    return {
      alinkman: [],
      dellinkmanids: [] // 标记删除联系人id
    }
  },
  methods: {
    init: function () {
      model.alinkman = this.linkmanobj
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    },

    // 添加多个联系人
    addsublinkman: function () {
      let obj = {
        id: 0,
        name: '',
        job: '',
        tel: '',
        delete: 'no'
      }
      model.alinkman.push(obj)
    },

    // 删除联系人
    deletelinkman: function (item) {
      if (item.id > 0) {
        model.dellinkmanids.push(item.id)
      }
      model.alinkman = _.without(model.alinkman, item)
    },

    // 提交
    subaddlinkman: function () {
      model.$emit('getLinkman', model.alinkman)
      console.log(model.alinkman)
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>
<style>
.mui-icon-back:before, .mui-icon-left-nav:before{
  font-size: 20px !important;
}
.bbrname{
  display: inline-block;
  width: 60%;
  padding: 9px 5px 10px;
  text-align: right
}  
.selfbg{
  background: #f4f4f4
} 
.sub-input-box .selectname{
  border: 0;
  margin: 0;
  width: 100%;
  text-align: left;
  display: inline-block;
  padding: 9px 15px 10px 15px;
}
.mui-table-view-chevron {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.cssradiodiv {
  position: relative;
  float: left;
  width: 80px;
  line-height: 34px;
  height: 100%;
}
.cssradiodiv label{
  font-size: 14px;
  margin-left: 27px;
  padding-right: 20px;
}
.cssradiodiv input[type="radio"] {
  top: 9px;
  left: 0;
  width: 28px;
  height: 28px;
}
.cssradiodiv input[type="radio"]::before{
  font-size: 20px !important;
}
.type-style {
  padding: 0 10px;
  height: 40px;
}
</style>
