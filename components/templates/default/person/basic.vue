<template>
  <div>
    <div class="personbg">
      <img class="bgimg" src="/images/person_bg.png">
      <img :src="info.header_img" class="bgheader" > 
      <div class="name">
        <p>
          <span>
            <a href="javascript:;" @click="isLogin()"  v-bind:class="!info.identity.none ? 'loginend' : ''">{{info.header_name || '未设置'}}
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
      <li v-show="info.identity.none && projectstate">
        <a href="javascript:;" class="mui-navigate-right" @click="goNextPage('/report', 'project')">
          <span class="bgicon myproject"></span>
          <span class="info">我的项目:</span>
          <span class="text">共{{info.projects_count}}个</span>
          <span class="msg-style" v-if="info.readed > 0">{{info.readed}}</span>
        </a>
      </li>
      <li>
        <a href="javascript:;" v-bind:class="loginstate ? 'mui-navigate-right' : ''" @click="goNextPage('/settings', 'normal')">
          <span class="bgicon set"></span>
          <span class="info">设置</span>
        </a>
      </li>
      <li>
        <a :href="linkPath + '/about'" class="mui-navigate-right" >
          <span class="bgicon about"></span>
          <span class="info">关于</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import storage from '~/plugins/storage'
let url = require('url')
let Cookies = require('js-cookie')
let _ = require('underscore')
let model
let myURL
export default {
  data () {
    return {
      linkPath: '',
      loginstate: false,
      projectstate: false,
      info: {
        header_img: '/images/user.png',
        header_name: '点击登录',
        fur_num: 0,
        projects_count: 0,
        tel: '-',
        readed: 0,
        isreporter: false, // 是否拥有报备权限
        identity: {
          txt: '游客',
          none: true
        }
      }
    }
  },
  methods: {
    init: function () {
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let token = Cookies.get('dpjia-hall-token-' + process.env.port)
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
        model.projectstate = true
        model.info = {
          header_img: data.data.ui_head,
          header_name: data.data.ui_name || '未设置',
          tel: data.data.mobile,
          fur_num: data.data.count,
          readed: data.data.readed || 0,
          projects_count: data.data.projects_count,
          isreporter: data.data.isreporter,
          identity: {
            txt: data.data.user_type,
            none: data.data.type
          }
        }
        let userobj = {
          username: data.data.ui_name || '',
          usertel: data.data.mobile || '',
          useremail: data.data.u_email || ''
        }
        storage.set('userinfo', userobj)
        let isupgrade = data.data.upgrade ? 'yes' : 'no'
        let vipprice = data.data.type ? 'yes' : 'no'
        Cookies.set('can-upgrade-' + process.env.port, isupgrade)
        Cookies.set('vip-price-' + process.env.port, vipprice)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token-' + process.env.port, '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
      })
    },

    // 是否要登录
    isLogin: function () {
      if (!model.loginstate) {
        let preurl = myURL.path.split('/')[2]
        Cookies.set('dpjia-preurl-' + process.env.port, preurl, {domain: '.dpjia.com'})
        window.location.href = model.linkPath + '/login'
      }
    },

    // 跳转页面
    goNextPage: function (url, type) {
      if (type === 'project') {
        if (model.info.isreporter) {
          window.location.href = model.linkPath + url
        } else {
          window.mui.toast('您的身份未审核，审核通过后才能使用［项目报备］的功能')
        }
      }
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
<style>
  .loginend {
    font-size: 15px;
    color: #000;
    font-weight: bold;
  }
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
    line-height: 32px;
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
    background: url("/images/person.png") no-repeat;
    background-position:  -212px -24px
  }
  .ulbox li span.wechet{
    background: url("/images/person.png") no-repeat;
    background-position: -250px -24px;
  }
  .ulbox li span.wechet{
    background: url("/images/person.png") no-repeat;
    background-position: -250px -24px;
  }
  .ulbox li span.head{
    background: url("/images/person.png") no-repeat;
    background-position: -289px -24px;
  }
  .ulbox li span.start{
    background: url("/images/person.png") no-repeat;
    background-position: -330px -24px;
  }
  .ulbox li span.myproject{
    background: url("/images/person.png") no-repeat;
    background-position: -409px -62px;
  }
  .ulbox li span.set{
    background: url("/images/person.png") no-repeat;
    background-position: -369px -24px;
  }
  .ulbox li span.about{
    background: url("/images/person.png") no-repeat;
    background-position: -409px -24px;
  }
  .mui-navigate-right:after{
    right: 0px !important;
  }
  .mui-navigate-right .msg-style{
    position: absolute;
    right: 24px;
    top: 4px;
    font-size: 13px;
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color: #f14f4f;
    color: #fff;
    border-radius: 100%;
  }
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
    background: url('/images/person.png') no-repeat;
    display: inline-block;
    height: 30px;
    width: 30px;
    background-size: 490px;
    margin-right: 10px;
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
