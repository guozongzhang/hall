<template>
  <div>
    <div class="personbg">
      <img class="bgimg" src="/images/person_bg.png">
      <img class="bgheader" src="/images/shuijiao.jpg">
      <p>点击登录</p>
    </div>
    <ul class="mui-table-view">
      <li class="personli">
        <a href="javascript:;">
          <span class="phone"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              手机号:
              <span>-</span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;">
          <span class="wechet"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              微信号:
              <span>-</span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;">
          <span class="head"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              当前身份:
              <span>游客</span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" class="mui-navigate-right">
          <span class="start"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              我的收藏:
              <a>{{data.fur_num}}</a>
              个商品
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;">
          <span class="set"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis set'>
              设置
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" class="mui-navigate-right">
          <span class="about"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              关于
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {
        fur_num: 10
      }
    }
  },
  methods: {
    init: function () {
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
  img{
    display: inherit;
  }
  .personbg {
    width: 100%;
    height: 182px;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
  }
  .personbg .bgimg{
    width: 100%;
    height: 98.5px;
  }

  .personbg .bgheader{
    width: 104px;
    height: 104px;
    border-radius: 100px;
    display: inline-block;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -52px;
    margin-top: -52px;
    border: 2px solid #fff;
    box-shadow: 0px 1px 5px #666;
  }
  .personbg p {
    margin: 0px;
    margin-top: 48px;
    text-align: center;
    color: #5175CE;
    font-size: 16px;
  }
  .personli span{
    background: url("/images/person.png") no-repeat;
    display: inline-block;
    height: 30px;
    width: 30px;
    background-size: 490px;
    margin-right: 10px;
  }
  .personli span.phone{
     background-position:  -212px -24px
  }
  .personli span.wechet{
     background-position: -250px -24px;
  }
  .personli span.wechet{
     background-position: -250px -24px;
  }
  .personli span.head{
     background-position: -289px -24px;
  }
  .personli span.start{
     background-position: -330px -24px;
  }
 .personli span.set{
     background-position: -369px -24px;
  }
   .personli span.about{
     background-position: -409px -24px;
  }
  
  .personli {
    padding: 10px;
    height: 50px;
    border-bottom: 1px solid #ccc;
    position: relative;
  }
  .mui-media-body{
    display: inline-block
  }
  .personli p{
    margin: 0px;
    height: 30px;
    line-height: 30px;
    color: #050505;
  }
  p.mui-ellipsis span, p.mui-ellipsis a{
    margin-left: 10px;
  }

  .personli p.set{
    color: #A3A3A3
  }

</style>
