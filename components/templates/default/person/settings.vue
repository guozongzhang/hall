<template>
<div>
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media set-box">
      <a href="javascript:;">
        <span class="switch-box" v-bind:class="isActive ? 'active-box' : 'normal-box'" @click="switchState()">
          <span class="switch-btn" v-bind:class="isActive ? 'active-icon' : 'normal-icon'"></span>
        </span>
        <div class="mui-media-body vip-price">
          <span class="vip-title">专属价</span>
          <p class='mui-ellipsis vip-tips'>开启后,商品详情页显示与当前登录身份相关的专属价;<br>关闭后,详情页不出现专属价项。</p>
        </div>
      </a>
    </li>
    <li class="mui-table-view-cell sub-item">
      <a class="mui-navigate-right" :href="linkPath + '/editpwd'">更改密码</a>
    </li>
    <li class="mui-table-view-cell sub-item logout" @click="logout()">
      <a href="javascript:;">退出登录</a>
    </li>
  </ul>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let url = require('url')
let model
let token
export default {
  data () {
    return {
      linkPath: '',
      isActive: false,
      vipInfo: {}
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      token = Cookies.get('dpjia-hall-token')
      if (!token) {
        window.location.href = model.linkPath + '/login'
      }
      let vipprice = Cookies.get('vip-price')
      if (vipprice === 'yes') {
        axios.get('classes/user_preference', {
          params: {
            where: {
              point: this.$store.state.comid,
              type: 'cloud_price',
              action: 'vip_price'
            }
          }
        }).then(function (data) {
          if (data.data.items.length > 0) {
            model.vipInfo = data.data.items[0]
            model.isActive = model.vipInfo.fur_type === 'on'
          } else {
            model.isActive = false
          }
        }).catch(function (error) {
          if (error.response.data.message === 'token is invalid') {
            window.mui.toast('登录信息过期!')
            setTimeout(function () {
              Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
              window.location.reload()
            }, 2000)
          }
        })
      }
    },

    // 设置专属价
    switchState: async function () {
      let isDesigner = Cookies.get('vip-price')
      if (isDesigner === 'no') {
        model.isActive = false
        window.mui.toast('您不属于该云展厅的销售经理，不能开启专属价!')
        return false
      }
      let param = {
        point: this.$store.state.comid,
        type: 'cloud_price',
        action: 'vip_price'
      }
      let result = await axios.get('classes/user_preference', {
        params: {
          where: param
        }
      })
      if (result.data.items.length > 0) {
        let obj = {
          id: result.data.items[0].id,
          point: this.$store.state.comid,
          type: 'cloud_price',
          action: 'vip_price',
          fur_type: model.isActive ? 'off' : 'on'
        }
        axios.put('classes/user_preference', null, {
          data: obj
        }).then(function (data) {
          model.isActive = !model.isActive
          window.mui.toast('设置成功!')
        }).catch(function () {
          window.mui.toast('设置失败!')
        })
      } else {
        let obj = {
          point: this.$store.state.comid,
          type: 'cloud_price',
          action: 'vip_price',
          fur_type: model.isActive ? 'off' : 'on'
        }
        axios.post('classes/user_preference', null, {
          data: obj
        }).then(function (data) {
          model.isActive = !model.isActive
          window.mui.toast('设置成功!')
        }).catch(function () {
          window.mui.toast('设置失败!')
        })
      }
    },

    // 退出登录
    logout: function () {
      var btnArray = ['否', '是']
      window.mui.confirm('确定退出登录？', '友情提示', btnArray, function (e) {
        if (e.index === 1) {
          Cookies.set('dpjia-hall-token', '', {domain: '.dpjia.com'})
          Cookies.set('dpjia-exhibite-flag', 'no', {domain: '.dpjia.com'})
          Cookies.set('dpjia-preurl', '', {domain: '.dpjia.com'})
          window.location.href = model.linkPath + '/person'
        }
      })
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
.mui-table-view-cell:after{
  background-color: #fff;
}
.set-box{
  border-bottom: 1px solid #cccccc;
}
.vip-price .vip-title{
  font-size: 14px;
  color: #696969;
}
.vip-price .vip-tips{
  margin-top: 3px;
  font-size: 12px;
  line-height: 15px;
  color: #447dff;
}
.sub-item{
  height: 44px;
  line-height: 22px;
  font-size: 14px;
  color: #050505 !important;
}
.logout {
  border-top: 1px solid #cccccc;
}
.switch-box{
  position: relative;
  top: 16px;
  float: right;
  display: inline-block;
  width: 50px;
  height: 30px;
  border-radius: 50px;
  cursor: pointer;
}
.active-box{
  background-color: #4cd865;
}
.normal-box{
  background-color: #a5a5a5;
}
.switch-btn{
  position: absolute;
  top: 2px;
  display: inline-block;
  width: 26px;
  height: 26px;
  border-radius: 100%;
  background-color: #fff;
}
.active-icon{
  right: 2px;
}
.normal-icon{
  left: 2px;
}
</style>
