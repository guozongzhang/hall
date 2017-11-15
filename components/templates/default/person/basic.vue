<template>
  <div>
    <div class="personbg">
      <img class="bgimg" src="/images/person_bg.png">
      <img :src="data.info3.header_img" class="bgheader" > 
      <div class="name">
        <p>
          <span>{{data.info3.header_name}}<i v-if="data.info3.type != 'wait'" class="editheader"> </i></span>
        </p>
      </div>
    </div>
    <ul class="mui-table-view">
      <li class="personli">
        <a href="/bindmobile" class="mui-navigate-right">
          <span class="phone"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              手机号:
              <span>{{data.info3.tel.num}}</span>
              <span class="colorlan">{{data.info3.tel.txt}}</span>
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
              <span>{{data.info3.wechet.first}}</span>
              <span class="colorlan">{{data.info3.wechet.second}}</span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;">
          <span class="head"></span>
          <div class="mui-media-body">
            <p :class="data.info3.type != 'wait' ? 'h16' : ''" class='mui-ellipsis' >
              当前身份:
              <span>{{data.info3.identity.txt}}</span>
            </p>
            <i class="sjdesign" v-if="!data.info3.identity.none">升级为销售设计师,享受更多特权</i>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" class="mui-navigate-right">
          <span class="start"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              我的收藏:
              <a>{{data.info3.fur_num}}</a>
              个商品
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="/settings" class="mui-navigate-right">
          <span class="set"></span>
          <div class="mui-media-body">
            <p :class="data.info3.type == 'wait' ? 'colorhui' : ''" class="mui-ellipsis">
              设置
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="/about" class="mui-navigate-right">
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
        info: {
          header_img: '/images/shuijiao.jpg',
          type: 'wait',
          fur_num: 10,
          tel: {
            num: '-',
            txt: ''
          },
          wechet: {
            first: '-',
            second: ''
          },
          identity: {
            txt: '游客',
            none: true
          },
          about: '/about/ms'
        },
        // 账号登录后
        info1: {
          header_img: '/images/muwu.jpg',
          header_name: '黄老板',
          type: 'zhlogin',
          fur_num: 10,
          tel: {
            num: 1393095412,
            txt: ''
          },
          wechet: {
            first: '暂无,马上去',
            second: '绑定'
          },
          identity: {
            txt: '嘉利信得 销售设计师',
            none: true
          },
          about: '/about/ms'
        },
        // 微信登录后2
        info2: {
          header_img: '/images/muwu.jpg',
          header_name: '黄老板',
          type: 'wechatlogin',
          fur_num: 10,
          tel: {
            num: 1393095412,
            txt: '更换手机号',
            href: ''
          },
          wechet: {
            first: '已绑定',
            second: '黄鑫',
            href: ''
          },
          identity: {
            txt: '嘉利信得普通用户',
            none: false
          },
          about: '/about/ms'
        },
        // 微信登录后1
        info3: {
          header_img: '/images/muwu.jpg',
          header_name: '黄老板',
          type: 'wechatlogin1',
          fur_num: 10,
          tel: {
            first: '暂无,马上去',
            second: '绑定',
            href: ''
          },
          wechet: {
            first: '已绑定',
            second: '黄鑫',
            href: ''
          },
          identity: {
            txt: '嘉利信得普通用户',
            none: false
          },
          about: '/about/ms'
        }
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
  
  .sjdesign {
    position: absolute;
    top: 23px;
    font-size: 12px;
    font-style: normal;
  }
  .colorlan{
    color: blue
  }
  .name span{
    display: inline-block
  }
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
    margin-top: -64px;
    border: 2px solid #fff;
    box-shadow: 0px 1px 5px #666;
  }
  .personbg p {
    margin: 0px;
    margin-top: 42px;
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
    width: auto;
    margin-right: 0px;
    display: inline
  }

  .personli p.set{
    color: #A3A3A3
  }
  .editheader{
    background: url("/images/person.png") no-repeat;
    display: inline-block;
    height: 20px;
    width: 25px;
    background-size: 490px;
    background-position: -448px -29px;
    float: right;
  }
  .personli p.h16{
    line-height: 16px;
  }
  .personli .colorhui {
    color: #9C9C9C
  }

</style>
