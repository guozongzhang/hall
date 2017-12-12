<template>
<div class="box">
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title">我的项目</h1>
  </header>
  <ul class="mui-table-view mui-table-view-chevron nav">
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>项目名称<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入项目名称">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>公司名称<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入公司名称">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>预计金额<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="万元">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>简单描述<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>项目可行性<i>*</i></label>
      </div>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">项目有效期</a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">报备人姓名</a>
      
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">添加备注</a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">添加附件</a>
    </li>
    <li style="height: 15px; background: #EEEEEE"></li>

    <li class="mui-table-view-cell right0" @click="show($event)">
      <a href="javascript:;" class="mui-navigate-right ">更多项目信息</a>
    </li>

    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>项目编号<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入项目编号">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">项目介绍<span>500字</span></a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">风险分析<span>500字</span></a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">招标时间<span>500字</span></a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">交付时间<span>500字</span></a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">产品分类<span>500字</span></a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">项目类型<span>500字</span></a>
    </li>


    <li class="mui-table-view-cell right0">
      <a href="" class="mui-navigate-right">更多甲方信息</a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right">所属区域</a>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>联系人姓名<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入项目编号">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>联系人职务<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入联系人职务">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>联系人电话<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话">
      </div>
    </li>


    <li class="mui-table-view-cell right0">
      <a href="" class="mui-navigate-right ">更多报备信息</a>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>与项目关系<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入项目编号">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>期望提成<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入联系人职务">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>项目优势<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>联系电话<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>联系邮箱<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入联系人电话">
      </div>
    </li>




    <li class="mui-table-view-cell right0">
      <a href="" class="mui-navigate-right ">更多竞争优势</a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right ">己方竞争对手</a>
    </li>
    <li class="mui-table-view-cell">
      <a href="" class="mui-navigate-right ">报备人对手</a>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>项目亮点<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入项目亮点">
      </div>
    </li>
    <li class="mui-table-view-cell">
      <div class="mui-input-row">
        <label>项目形式预测<i>*</i></label>
        <input type="text"  class="mui-input-clear" placeholder="请输入项目形式预测">
      </div>
    </li>


  </ul>
</div>
</template>
<script>
  let $ = require('jquery')
  export default {
    head: {
      title: '我的项目'
    },
    data () {
      return {
      }
    },
    beforeCreate () {
      // 注册组件 component(名字, 相对路径)
      // this.component('report', 'report/list.vue')
    },
    methods: {
      init: function () {
      },
      show: function (even) {
        var el = event.currentTarget
        $(el).addClass('show').siblings().removeClass('show')
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
<style>
  .nav li.show{
    height: auto;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .right0 .mui-navigate-right:after{
    right: auto;
    top: 37%;
    transform:rotate(90deg);
    margin-left: 5px;
  }
  .right0 .mui-navigate-right {
    text-align: center;
    color: #9D9D9D;
    margin-right: 5px;
  }
  
  .mui-input-row {
    height: 43px;
  }
  .mui-input-row label {
    height: 43px;
    padding: 0;
    line-height: 43px;
    font-size: 12px;
    padding-left: 10px;
  }
  .mui-input-row input{
    font-size: 12px;
    padding: 0;
    line-height: 43px;
    height: 43px
  }
  .nav {
    margin-top: 50px;
  }
  .mui-input-row label {
    padding-left: 20px;
  }

  .nav li {
    height: 43px;
    line-height: 43px;
    padding: 0;
  }
  .nav li a {
    font-size: 13px;
    color: #3A3A3A;
  }
  .nav li i {
    color: red;
    font-style: normal;
    margin-left: 4px;
  }
  .mui-table-view-cell>a:not(.mui-btn){
    margin: 0;
    padding-left: 20px;
  }
  .mui-table-view-cell:after {
    left: 0
  }
  .liul{
    padding: 0;

  }
</style>
