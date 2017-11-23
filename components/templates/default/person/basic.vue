<template>
  <div>
    <div class="personbg">
      <img class="bgimg" src="/images/person_bg.png">
      <img :src="info.header_img" class="bgheader" > 
      <div class="name">
        <p>
          <span>
            <a href="javascript:;" @click="isLogin()">{{info.header_name}}
            </a>
          </span>
        </p>
      </div>
    </div>
    <ul class="ulbox">
      <li>
        <a href="javascript:;" >
          <span class="bgicon phone"></span>
          <span class="info">手机号码:</span>
          <span class="text">{{info.tel}}</span>
        </a>
      </li>
      <li>
        <a href="javascript:;" v-bind:class="(loginstate && !info.identity.none) ? 'mui-navigate-right' : ''" @click="goNextPage('/uptodesigner', 'identify')">
          <span class="bgicon head"></span>
          <span class="info" v-show="info.identity.none">当前身份:</span>
          <span class="text" v-show="info.identity.none">{{info.identity.txt}}</span>
          <span class="havesf" v-show="!info.identity.none">
            <i>当前身份: {{info.identity.txt}}</i>
            <i>升级为销售设计师,享受更多特权</i>
          </span>
        </a>
      </li>
      <li>
        <a href="javascript:;" v-bind:class="loginstate ? 'mui-navigate-right' : ''" @click="goNextPage('/mycollect', 'normal')">
          <span class="bgicon start"></span>
          <span class="info">我的收藏:</span>
          <span class="text">共{{info.fur_num}}个</span>
        </a>
      </li>
      <li>
        <a href="javascript:;" v-bind:class="loginstate ? 'mui-navigate-right' : ''" @click="goNextPage('/settings', 'normal')">
          <span class="bgicon set"></span>
          <span class="info">设置:</span>
        </a>
      </li>
      <li>
        <a :href="linkPath + '/about'" class="mui-navigate-right" >
          <span class="bgicon about"></span>
          <span class="info">关于:</span>
        </a>
      </li>
    </ul>
    <ul class="mui-table-view" style="display: none">
      <li class="personli">
        <a href="javascript:;">
          <span class="phone"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              手机号<i style="font-style: normal;">:</i>
              <span>{{info.tel}}</span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" v-bind:class="(loginstate && !info.identity.none) ? 'mui-navigate-right' : ''" @click="goNextPage('/uptodesigner', 'identify')">
          <span class="head"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis' v-bind:class="!info.identity.none ? 'h16' : ''">
              当前身份<i style="font-style: normal;">:</i>
              <span>{{info.identity.txt}}</span>
            </p>
            <i class="sjdesign" v-if="!info.identity.none">升级为销售设计师,享受更多特权</i>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" v-bind:class="loginstate ? 'mui-navigate-right' : ''" @click="goNextPage('/mycollect', 'normal')">
          <span class="start"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              我的收藏<i style="font-style: normal;">:</i>
              <span v-show="loginstate">
                共
                <i style="font-style: normal;color: #5075ce">{{info.fur_num}}</i>
                个
              </span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" v-bind:class="loginstate ? 'mui-navigate-right' : ''" @click="goNextPage('/settings', 'normal')">
          <span class="set"></span>
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              设置
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a :href="linkPath + '/about'" class="mui-navigate-right">
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
<style>
li {
  list-style-type: none
}
.ulbox li{
  height: 50px;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc
}
.ulbox li:last-child{
}
.ulbox {
  padding: 0;
  background: #fff;
}
.ulbox li a {
  display: block;
  overflow: hidden;
  position: relative;
}
.ulbox li a span{
  display: block;
  float: left;
  font-size: 14px;
  color: #000;
  height: 30px;
  line-height: 30px;
}
.ulbox li a span:nth-child(1) {
  background: url("/images/person.png") no-repeat;
  display: inline-block;
  background-size: 490px;
  margin-right: 10px;
  width: 30px;
}
.ulbox li a span:nth-child(2) {
  margin-right: 10px;
}
.ulbox li a span:last-child {
}

.ulbox li a span.havesf i:nth-child(1){
  display: block;
  height: 26px;
  margin-top: -8px;
  font-size: 14px;
  font-style: normal;
  line-height: 30px;
}

.ulbox li a span.havesf i:nth-child(2){
  display: block;
  height: 26px;
  margin-top: -8px;
  font-size: 12px;
  font-style: normal;
  line-height: 30px;
  color: #4E73CD
}

.ulbox li span.phone{
  background-position:  -212px -24px
}
.ulbox li span.wechet{
  background-position: -250px -24px;
}
.ulbox li span.wechet{
  background-position: -250px -24px;
}
.ulbox li span.head{
  background-position: -289px -24px;
}
.ulbox li span.start{
  background-position: -330px -24px;
}
.ulbox li span.set{
  background-position: -369px -24px;
}
.ulbox li span.about{
  background-position: -409px -24px;
}


</style>
<script>
import axios from '~/plugins/axios'
let url = require('url')
let Cookies = require('js-cookie')
let _ = require('underscore')
let model
export default {
  data () {
    return {
      linkPath: '',
      loginstate: false,
      info: {
        header_img: '/images/shuijiao.jpg',
        header_name: '点击登录',
        fur_num: 0,
        tel: '-',
        identity: {
          txt: '游客',
          none: true
        }
      }
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let token = Cookies.get('dpjia-hall-token')
      if (!_.isEmpty(token)) {
        model.loginstate = true
        model.getPersonInfo(token)
      }
    },

    // 获取个人信息
    getPersonInfo: function (token) {
      axios.get('users/cloud_personal?com_id=' + this.$store.state.comid, {
        headers: {
          'X-DP-Token': token
        }
      }).then(function (data) {
        model.info = {
          header_img: data.data.ui_head,
          header_name: data.data.ui_name || '未设置',
          tel: data.data.mobile,
          fur_num: data.data.count,
          identity: {
            txt: data.data.user_type,
            none: data.data.type
          }
        }
        let isupgrade = data.data.upgrade ? 'yes' : 'no'
        let vipprice = data.data.type ? 'yes' : 'no'
        Cookies.set('can-upgrade', isupgrade)
        Cookies.set('vip-price', vipprice)
      }).catch(function () {
        window.mui.toast('获取数据失败!')
      })
    },

    // 是否要登录
    isLogin: function () {
      if (!model.loginstate) {
        window.location.href = model.linkPath + '/login'
      }
    },

    // 跳转页面
    goNextPage: function (url, type) {
      if (model.loginstate) {
        if (type === 'normal') {
          window.location.href = model.linkPath + url
        } else {
          if (!model.info.identity.none) {
            window.location.href = model.linkPath + url
          }
        }
      }
    }
  },
  mounted () {
    model = this
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

  .ulbox li span.phone{
  background-position:  -212px -24px
}
.ulbox li span.wechet{
  background-position: -250px -24px;
}
.ulbox li span.wechet{
  background-position: -250px -24px;
}
.ulbox li span.head{
  background-position: -289px -24px;
}
.ulbox li span.start{
  background-position: -330px -24px;
}
.ulbox li span.set{
  background-position: -369px -24px;
}
.ulbox li span.about{
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
    line-height: 28px;
    color: #050505;
  }
  p.mui-ellipsis span, p.mui-ellipsis a{
    margin-left: 10px;
    width: auto;
    margin-right: 0px;
    display: inline
  }
  .personli a {
    display: inline-block;
    width: 100%;
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
</style>
