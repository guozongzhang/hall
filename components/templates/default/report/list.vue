<template>
  <div>
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
</style>