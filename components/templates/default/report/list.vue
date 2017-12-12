<template>
  <div>
    <ul class="navul">
      <li @click="getlist('all')" v-bind:class="{active:'all'== active}">
        <span class="text">全部项目</span>
        <span class="bglan"></span>
      </li>
      <li @click="getlist('wait')"  v-bind:class="{active:'wait'== active}">
        <span class="text">未报备项目</span>
        <span class="bglan"></span>
      </li>
      <li @click="getlist('rading')" v-bind:class="{active:'rading'== active}">
        <span class="text">已报备项目</span>
        <span class="bglan"></span>
      </li>
    </ul>
    <div v-for="(num,item) in 5" class="listdiv">
      <h4><i>25万元</i>·<span>京乐科技会议室改造</span></h4>
      <ul>
        <li v-for="(num,item) in 5"><i class="fa mui-action-back mui-icon mui-icon-left-nav mui-pull-right" aria-hidden="true" v-bind:class="2 - num > 0 ? 'fa-star' : 'fa-star-o'"></i></li>
      </ul>
      <div class="fz12">北京京乐科技网络技术有限公司</div>
      <div class="fz12">项目名称大智就是这个样子</div>
      <div class="detail">查看详情</div>
    </div>
  </div>
</template>
<script>
  // import axios from '~/plugins/axios'
  export default {
    // props: ['obj'],
    data () {
      return {
        state: '',
        active: 'all'
      }
    },
    methods: {
      // getlist: function (val) {
      //   this.active = val
      //   let param = {}
      //   if (this.active !== 'all') {
      //     param = {
      //        state: val
      //     }
      //   }
      //   axios.get('classes/projects', {
      //     params: param
      //   }).then(function (data) {
      //     console.log(data)
      //   }).catch(function (error) {
      //   })
      // }
    },
    mounted () {
      this.getlist()
    }
  }
</script>
<style lang="">
  .mui-bar-nav~.mui-content{
    padding-top: 0px!important;
  }
  .listdiv {
    margin: 15px;
    height: 165px;
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
  ul { 
    height: 40px;
    padding: 0;
    padding-top: 10px;
    padding-left: 130px;
  }
  ul li{
    list-style-type: none;
    float: left;
  }
  .fa-star {
    color: #FEB000;
    font-size: 24px;
  }
  .fa-star-o {
    color: #ccc;
    font-size: 24px;
  }
  .fz12 {
    font-size: 12px;
    text-align: center;
    height: 26px;
    line-height: 24px;
    color: #696969;
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
    width: 100%;
    overflow: hidden;
    margin-top: 44px;
    height: 40px;
    padding: 5px 0px;
    background: #fff;
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
    left: 50px;
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
</style>