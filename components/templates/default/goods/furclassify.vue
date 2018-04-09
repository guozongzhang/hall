<template>
<div class="classify-box">
  <div class="left-box">
    <div class="left-classify">
      <a href="javascript:;" v-if="item.state == 'on'" v-bind:class="activeid == item.id ? 'active' : ''"  @click="choiceType(item)" v-for="item in leftArr">
        <span class="active-icon"></span>
        <span>{{item.norname ? item.norname : item.sp_type_name}}</span>
      </a>
    </div>
  </div>
  <div class="right-box">
    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-4" v-for="item in subArr" v-if="item.state == 'on'">
        <a v-bind:href="linkPath + '/goodslist?secondtype='+ activeid + '&thirdtype=' + item.id">
          <img class="mui-media-object" :src="item.icon_url || '/images/square.png'">
          <div class="mui-media-body">{{item.norname ? item.norname : item.type_name}}</div>
        </a>
      </li>
    </ul> 
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let url = require('url')
let model
let myURL
export default {
  data () {
    return {
      linkPath: '',
      activeid: 0,
      leftArr: [],
      subArr: []
    }
  },
  methods: {
    init: function () {
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      model.getClassify()
    },

    // 获取二级分类
    getClassify: function () {
      let param = {
        where: {
          com_id_poi_companys: this.$store.state.comid
        },
        order: '-id',
        limit: 1
      }
      axios.get('classes/company_skin_logs', {
        params: param
      }).then(function (data) {
        let info = JSON.parse(data.data.items[0].config)
        model.leftArr = info[0].header[2].nav
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token-' + myURL.port, '', {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/'
          }, 2000)
        }
      })
    },

    // 获取三级分类
    choiceType: function (obj) {
      model.activeid = obj.id
      model.subArr = obj.sp_type_id_rel_furniture_types.items
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
.classify-box{
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  height: calc(100% - 44px);
  display: flex;
}
.left-box{
  display: inline-block;
  width: 25%;
  overflow-x: hidden;
  overflow-y: auto;
}
.right-box{
  display: inline-block;
  width: 75%;
}
.left-classify{
  height: 100%;
  padding-top: 14px;
  border-right: 1px solid #dfdfdf;
  background-color: #fafafa;
}
.left-classify a{
  position: relative;
  display: block;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  color: #3c3c3c;
  cursor: pointer;
}
.active-icon{
  position: absolute;
  top: 10px;
  left: 0;
  display: none;
  width: 8px;
  height: 16px;
  background-color: #5075ce;
}
.left-classify a.active .active-icon{
  display: inline-block;
}
.left-classify a.active{
  color: #5075ce;
}
.right-box .mui-table-view:before,
.right-box .mui-table-view:after{
  background-color: #fff;
}
.right-box .mui-table-view.mui-grid-view{
  padding: 10px;
}
.right-box .mui-table-view.mui-grid-view .mui-table-view-cell{
  padding: 10px 10px 0 10px;
}
.right-box .mui-table-view.mui-grid-view .mui-media-body{
  font-size: 14px;
}
</style>
