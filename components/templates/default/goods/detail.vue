<template>
  <div class="furniture">
    <div class="down" v-show="isshow && detail.fur_states != 'up'">该商品已下架,如有需要请联系卖家</div>
    <div class="fur_info">
      <p class="title">{{detail.fur_name}}</p>
      <span class="bqian" v-show="detail.fur_adv">{{detail.fur_adv}}</span>
      <div class="titelfoot">
        <div class="price">
          <span style="display:none">
            <i>优惠价:</i>
            <i>¥{{defaluteSku.discount}}</i>
          </span>
          <span style="display:none">
            <i>原价:</i>
            <i>¥{{defaluteSku.price}}</i>
          </span>
          <span v-if="detail.discount_coefficient">
            <i>专属价:</i> 
            <i>¥{{defaluteSku.discount * detail.discount_coefficient}}</i>
          </span>
          <a href="javascript:;" class="collection-bth collect-flag" v-bind:class="defaluteSku.user_preference == '0' ? 'star-active' : 'star-normal'" @click="collection(defaluteSku)">
            <span class="fa collect-flag" v-bind:class="defaluteSku.user_preference == '0' ? 'fa-star' : 'fa-star-o'"></span>
            <span class="collect-flag">{{defaluteSku.user_preference == '0' ? '取消' : '收藏'}}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="version">
      <p class="mui-navigate-right" >
        <a href="javascript:;" v-on:click="showmodal()" class="changesku">
          <span>已选择:</span>
          <span class="ellipsis">{{defaluteSku.color}}{{defaluteSku.size}}{{defaluteSku.version}}</span>
        </a>
      </p>
      <div class="furdetail">
        <p class="c05">产品规格</p>
        <ul class="desc">
          <li>
            <span>品牌:</span>
            <span>{{detail.com_brand_name}}</span>
          </li>
          <li>
            <span>系列:</span>
            <span>{{detail.companys_self_series_name}}</span>
          </li>
          <li>
            <span>编码:</span>
            <span>{{detail.fur_num}}</span>
          </li>
          <li>
            <span>用途:</span>
            <span>{{detail.ftt_name}}</span>
          </li>
          <li>
            <span>分类:</span>
            <span>{{detail.sp_type_name}}</span>
          </li>
          <li>
            <span>型号:</span>
            <span>{{detail.fur_code}}</span>
          </li>
          <li>
            <span>毛重:</span>
            <span>{{detail.fur_weight}}Kg</span>
          </li>
          <li>
            <span>体积:</span>
            <span>{{detail.fur_volume}}m³</span>
          </li>
          <li>
            <span>空间:</span>
            <span>{{detail.field_name}}</span>
          </li>
          <li>
            <span>风格:</span>
            <span>{{detail.style_name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="furpic" >
      <div class="maodian" id="item2"></div>
      <p class="c05" v-show="detailpics.length > 0">图文详情</p>
      <ul class="desc">
        <li v-for="item in detailpics">
          <img v-bind:src="item.fip_url" />
        </li>
      </ul>
      <p v-show="detail.fur_info" class="text" v-html="detail.fur_info"></p>
    </div>
    
    <div class="modalbox">
      <div id="modal" class="">
        <a class="closemodal" href="javascript:;" v-on:click="closemodal()">+</a>
        <div class="header">
          <img v-bind:src="detail.fur_image" />
          <div class="title">
            <p>{{detail.fur_name}}</p>
            <div class="price"><i v-show="detail.discount_coefficient">专属价</i><i v-show="detail.discount_coefficient"> ¥{{defaluteSku.discount * detail.discount_coefficient}}</i><i>&nbsp;</i></div>
            <span v-show="!ishavesku" class="huise">请选择规格属性</span>
            <span class="closespan" v-show="ishavesku"><i>已选择：</i>{{changecolorObj.color}} {{changesizeObj.size}} {{changeversionObj.version}}<i v-on:click="resetBtn()" class="closesku">x</i></span>
          </div>
        </div>
        <div class="modelversion">
          <p class="c05">颜色</p> 
          <div  v-for="item in colorarr" v-on:click="changecolor(item)"  v-bind:class="item.disabled === false ? '' : 'active'">{{item.color}}</div>
        </div>
        <div class="modelversion">
          <p class="c05">尺寸</p>
          <div v-for="item in sizearr" v-bind:class="item.disabled === false ? '' : 'active'" v-on:click="changesize(item)">{{item.size}}</div>
        </div>
        <div class="modelversion">
          <p class="c05">其他规格</p>
          <div  v-for="item in versionarr" v-bind:class="item.disabled === false ? '' : 'active'" v-on:click="changeversion(item)">{{item.version}}</div>
        </div>
        <div class="submit">
          <span v-on:click="submit()"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
let url = require('url')
let _ = require('underscore')
let $ = require('jquery')
let Cookies = require('js-cookie')
let model
let myURL
export default {
  props: ['info'],
  data () {
    return {
      isshow: false,
      linkPath: '',
      detail: {},
      defaluteSku: {},
      detailpics: [],
      colorarr: [],
      sizearr: [],
      versionarr: [],
      ms: [],
      changecolorObj: {},
      changesizeObj: {},
      changeversionObj: {},
      selectSku: {},
      ishavesku: false
    }
  },
  watch: {
    info: function () {
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      this.detail = this.info
      model.isshow = true
      model.init(this.info)
    }
  },
  methods: {
    init: function (obj) {
      obj.furniture_sku.forEach(item => {
        this.ms.push(item.color + item.size + item.version)
        this.colorarr.push({color: item.color, disabled: false})
        this.colorarr = _.uniq(this.colorarr, item => { return item.color })
        this.sizearr.push({size: item.size, disabled: false})
        this.sizearr = _.uniq(this.sizearr, item => { return item.size })
        this.versionarr.push({version: item.version, disabled: false})
        this.versionarr = _.uniq(this.versionarr, item => { return item.version })
      })
      // 判断是或否有默认sku 1
      model.defaluteSku = obj.furniture_sku.filter(item => {
        return obj.sku_poi_furniture_sku === item.sk_id
      })[0]
      // 如果没有就选第一条 sku
      if (_.isEmpty(model.defaluteSku)) {
        model.ishavesku = obj.furniture_sku.length
        model.changecolorObj.color = obj.furniture_sku[0].color
        model.changesizeObj.size = obj.furniture_sku[0].size
        model.changeversionObj.version = obj.furniture_sku[0].version
        model.defaluteSku = obj.furniture_sku[0]
        model.colorarr.forEach(item => {
          if (item.color === obj.furniture_sku[0].color) {
            item.disabled = true
          }
        })
        model.sizearr.forEach(item => {
          if (item.size === obj.furniture_sku[0].size) {
            item.disabled = true
          }
        })
        model.versionarr.forEach(item => {
          if (item.version === obj.furniture_sku[0].version) {
            item.disabled = true
          }
        })
      } else {
        model.ishavesku = true
        model.changecolorObj.color = model.defaluteSku.color
        model.changesizeObj.size = model.defaluteSku.size
        model.changeversionObj.version = model.defaluteSku.version
        model.colorarr.forEach(item => {
          if (item.color === model.defaluteSku.color) {
            item.disabled = true
          }
        })
        model.sizearr.forEach(item => {
          if (item.size === model.defaluteSku.size) {
            item.disabled = true
          }
        })
        model.versionarr.forEach(item => {
          if (item.version === model.defaluteSku.version) {
            item.disabled = true
          }
        })
      }
      this.detailpics = obj.furniture_intro_pics.filter(item => {
        return item.intro_type !== 'intro'
      })
    },

    // 打开模态框
    showmodal: function () {
      $('.modalbox').css('display', 'block')
    },

    // 关闭模态框
    closemodal: function () {
      $('.modalbox').css('display', 'none')
    },

    // 选择sku的公共方法
    public: function (val, objitem) {
      if (val === 'size') {
        model.sizearr.forEach(item => {
          if (item.size === objitem.size) {
            item.disabled = true
            model.changesizeObj.size = item.size
          } else {
            item.disabled = false
          }
        })
        model.colorarr = []
        model.detail.furniture_sku.forEach(item => {
          if (objitem.size === item.size) {
            if (model.changecolorObj.color === item.color) {
              model.colorarr.push({color: item.color, disabled: true})
              model.changecolorObj.color = item.color
            } else {
              model.colorarr.push({color: item.color, disabled: false})
              model.changecolorObj.color = ''
            }
          }
          model.colorarr = _.uniq(model.colorarr, item => { return item.color })
        })
        model.versionarr = []
        model.detail.furniture_sku.forEach(item => {
          if (objitem.size === item.size) {
            if (model.changeversionObj.version === item.version) {
              model.versionarr.push({version: item.version, disabled: true})
              model.changeversionObj.version = item.version
            } else {
              model.versionarr.push({version: item.version, disabled: false})
              model.changeversionObj.version = ''
            }
          }
          model.versionarr = _.uniq(model.versionarr, item => { return item.version })
        })
      }

      if (val === 'color') {
        model.colorarr.forEach(item => {
          if (item.color === objitem.color) {
            item.disabled = true
            model.changecolorObj.color = item.color
          } else {
            item.disabled = false
          }
        })
        model.sizearr = []
        model.detail.furniture_sku.forEach(item => {
          if (objitem.color === item.color) {
            if (model.changesizeObj.size === item.size) {
              model.sizearr.push({size: item.size, disabled: true})
              model.changesizeObj.size = item.size
            } else {
              model.sizearr.push({size: item.size, disabled: false})
              model.changesizeObj.size = ''
            }
          }
          model.sizearr = _.uniq(model.sizearr, item => { return item.size })
        })
        model.versionarr = []
        model.detail.furniture_sku.forEach(item => {
          if (objitem.color === item.color) {
            if (model.changeversionObj.version === item.version) {
              model.versionarr.push({version: item.version, disabled: true})
              model.changeversionObj.version = item.version
            } else {
              model.versionarr.push({version: item.version, disabled: false})
              model.changeversionObj.version = ''
            }
          }
          model.versionarr = _.uniq(model.versionarr, item => { return item.version })
        })
      }

      if (val === 'version') {
        model.versionarr.forEach(item => {
          if (item.version === objitem.version) {
            item.disabled = true
            model.changeversionObj.version = item.version
          } else {
            item.disabled = false
          }
        })
        model.sizearr = []
        model.detail.furniture_sku.forEach(item => {
          if (objitem.version === item.version) {
            if (model.changesizeObj.size === item.size) {
              model.sizearr.push({size: item.size, disabled: true})
              model.changesizeObj.size = item.size
            } else {
              model.sizearr.push({size: item.size, disabled: false})
              model.changesizeObj.size = ''
            }
          }
          model.sizearr = _.uniq(model.sizearr, item => { return item.size })
        })
        model.colorarr = []
        model.detail.furniture_sku.forEach(item => {
          if (objitem.version === item.version) {
            if (model.changecolorObj.color === item.color) {
              model.colorarr.push({color: item.color, disabled: true})
              model.changecolorObj.color = item.color
            } else {
              model.colorarr.push({color: item.color, disabled: false})
              model.changecolorObj.color = ''
            }
          }
          model.colorarr = _.uniq(model.colorarr, item => { return item.color })
        })
      }
    },

    // 改变color
    changecolor: function (objitem) {
      model.ishavesku = true
      model.public('color', objitem)
    },
    // 改变size
    changesize: function (objitem) {
      model.ishavesku = true
      model.public('size', objitem)
    },
    // 修改版本
    changeversion: function (objitem) {
      model.ishavesku = true
      model.public('version', objitem)
    },
    // 重置选择
    resetBtn: function () {
      model.changecolorObj.color = ''
      model.changesizeObj.size = ''
      model.changeversionObj.version = ''
      model.colorarr = []
      model.sizearr = []
      model.versionarr = []
      model.detail.furniture_sku.forEach(item => {
        model.colorarr.push({color: item.color, disabled: false})
        model.sizearr.push({size: item.size, disabled: false})
        model.versionarr.push({version: item.version, disabled: false})
      })

      model.colorarr = _.uniq(model.colorarr, item => { return item.color })
      model.sizearr = _.uniq(model.sizearr, item => { return item.size })
      model.versionarr = _.uniq(model.versionarr, item => { return item.version })
      model.ishavesku = false
    },

    // 选择sku规格
    submit: function () {
      $('.modalbox').css('display', 'none')
      model.selectSku = _.find(model.detail.furniture_sku, item => {
        return item.color + item.size + item.version === model.changecolorObj.color + model.changesizeObj.size + model.changeversionObj.version
      })

      model.defaluteSku = {
        sk_id: model.selectSku.sk_id,
        color: model.selectSku.color,
        size: model.selectSku.size,
        version: model.selectSku.version,
        discount: model.selectSku.discount,
        price: model.selectSku.price,
        user_preference: model.selectSku.user_preference
      }
    },

    // 收藏sku
    collection: function (obj) {
      let token = Cookies.get('dpjia-hall-token-' + myURL.port)
      if (_.isEmpty($.trim(token))) {
        var btnArray = ['否', '是']
        window.mui.confirm('还未登录,是否登录？', '友情提示', btnArray, function (e) {
          if (e.index === 1) {
            let myURL = url.parse(window.location.href)
            let preurl = myURL.path.split('/')[2]
            Cookies.set('dpjia-preurl-' + myURL.port, preurl, {domain: '.dpjia.com'})
            window.location.href = model.linkPath + '/login'
          }
        })
        return false
      } else {
        let opt = {
          skuid: model.defaluteSku.sk_id,
          user_preference: String(model.defaluteSku.user_preference) === '0'
        }
        model.collectFur(opt)
      }
    },

    // 收藏、取消收藏商品
    collectFur: async function (obj) {
      let text = obj.user_preference ? '取消收藏' : '收藏成功！'
      model.defaluteSku.user_preference = obj.user_preference ? '1' : '0'
      if (!obj.user_preference) {
        let param = {
          point: obj.skuid,
          type: 'sku',
          action: 'favor',
          fur_type: 'online'
        }
        axios.post('classes/user_preference', null, {
          data: param
        }).then(function (data) {
          window.mui.toast(text)
        }).catch(function () {
          window.mui.toast('收藏失败!')
        })
      } else {
        let getresult = await axios.get('classes/user_preference', {
          params: {
            point: obj.skuid,
            limit: 1,
            order: '-id'
          }
        })
        let param = {
          _method: 'DELETE',
          ids: getresult.data.items[0].id
        }
        axios.post('functions/cart/app_preference', null, {
          data: param
        }).then(function (data) {
          window.mui.toast(text)
        }).catch(function () {
          window.mui.toast('操作失败!')
        })
      }
    }
  },
  mounted () {
    model = this
  }
}
</script>
<style scoped>
  .changesku {
    display: inline-block;
    width: 100%;
  }
  .changesku span:nth-child(1){
    display: inline-block;
    float: left;
  }
  .changesku span:nth-child(2){
    display: inline-block;
    width: 75%;
    float: left;
  }
  .closemodal {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #000;
    font-size: 48px;
    transform: rotate(45deg)
  }
  .modalbox {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.41);
    height: 100%;
    width: 100%;
    z-index: 10;
    display: none;
  }
  .closespan {
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 240px;
  }
  .closesku{
    .font-style: normal;
    position: absolute;
    top: -2px;
    right: -2px;
    color: #000;
    padding: 5px;
    line-height: 4px;
    text-align: center;
  }
  .collection-bth{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    display: inline-block;
    width: 70px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 3px;
    font-size: 15px;
  }
  .star-active{
    background-color: #5075ce;
    color: #fff;
  }
  .collection-bth .fa{
    display: inline-block !important;
    margin-right: 3px !important;
    margin-bottom: 20px !important;
  }
  .fa-star{
    color: #fcc500;
  }
  .fa-star-o{
    color: #8f8f8f;
  }
  .star-normal{
    background-color: #fff;
    border: 1px solid #5075ce;
    color: #3d3d3d;
  }
  #modal {
    height: 383px;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  #modal .header {
    overflow: hidden;
    padding: 10px;
  }
  #modal .header img{
    width: 90px;
    height: 90px;
    float: left;
    margin-right: 10px;
  }
  #modal .header .tltle {
    float: left;
  }
  #modal .header p {
    color: #050505;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
    margin-bottom: 10px;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
  }
  #modal .header .price{
    margin-bottom: 6px;
  }
  #modal .header .price i:nth-child(1){
    font-size: 12px;
    color: #989898;
    font-style: normal;
  }
  #modal .header .price i:nth-child(2){
    font-size: 16px;
    color: #4E73CD;
    font-style: normal;
  }
  #modal .header span{
    font-size: 14px;
    color: #5075ce;
  }
  #modal .header span i{
    color: #989898;
    font-style: normal
  }
  #modal .mui-icon {
    margin-top: 10px;
    margin-right: 10px;
  }
  #modal .submit {
    height: 50px;
    background: #5075ce;
    position: relative;
  }
  #modal .submit span {
    display: inline-block;
    height: 30px;
    width: 30px;
    background: url("/images/login.png") no-repeat;
    background-size: 242px;
    background-position: -146px -18px;
    cursor: pointer;
    border: 2px solid #fff;
    border-radius: 30px;
    position: absolute;
    left: 50%;
    margin-left: -15px;
    top: 50%;
    margin-top: -15px
  }
  .modelversion {
    padding: 0 10px;
    overflow: hidden;
  }
  p{
    margin: 0;
  }
  .modelversion p {
    height: 30px;
    line-height: 30px;
    margin: 0;
  }
  .modelversion div {
    border-radius: 2px;
    border: 1px solid #737373;
    color: #3D3D3D;
    text-align: center;
    float: left;
    padding: 5px;
    margin-right: 10px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .modelversion div.active{
    background: #5075CE;
    border: 1px solid #5075CE;
    color: #fff;
  }
  .down {
    position: absolute;
    top: -36px;
    z-index: 22;
    background: rgba(16, 2, 2, 0.41);
    color: #fff;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: center;
    width: 100%;
  }
  .maodian {
    height: 1px;
    position: absolute;
    top: -44px;
  }
  .c05 {
    color: #050505
  }
  .c61{
    color: #616161;
  }
  .c3d{
    color: #3D3D3D
  }
  .furniture{
    position: relative;
  }
  li {
    list-style: none;
  }
  .version{
    background: #fff;
  }
  .furdetail {
    overflow: hidden;
    padding: 0
  }
  .furdetail .mui-navigate-right {
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin:0
  }
  .furdetail p{
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 0
  }
  .desc{
    overflow: hidden;
    padding: 0 20px;
  }
  .furdetail .desc li {
    border-bottom: 1px dashed #ccc;
    float: left;
    list-style: none;
    padding-left: 35px;
    width: 50%;
    height: 30px;
    line-height: 30px;
  }
  .furpic ul li:last-child{
    margin-bottom: 0
  }
  .furdetail .desc li span {
    font-size: 12px;
    color: #616161;
  }
  .furdetail .desc li span:nth-child(2) {
    padding-left: 5px;
  }
  .furpic {
    background: #fff;
    position: relative;
    padding-bottom: 10px;
  }
  .furpic p {
    height: 30px;
    line-height: 38px;
    text-align: center;

  }
  .furpic ul {
    padding: 0
  }
  .furpic ul li{
    padding: 0;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .furpic img{
    float: left;
    display: block;
    width: 100%;
  }

  
  .furpic p.text {
    margin: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 2px;
    line-height: normal;
    height: auto;
    text-align: left;
  }

  .version .mui-navigate-right{
    height: 50px;
    border-bottom: 1px solid #ccc;
    line-height: 50px;
    padding: 0 20px;
    position: relative;
    margin: 0;
  }
  .version a span{
    color: #000;
  }
  .version a span:nth-child(1) {
    margin-right: 10px;
  }
  .fur_info {
    margin-bottom: 10px;
    padding: 0 20px 20px;
    background: #fff;
  }
  .fur_info .title {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    color: #050505;
    margin: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bqian{
    font-size: 12px;
    color: #ABABAB;
    border: 1px solid #ABABAB;
    border-radius: 2px;
    padding: 0 5px;
    display: inline-block;
  }
  .titelfoot{
    overflow: hidden;
    margin-top: 10px;
    height: 45px;
  }
  .titelfoot .price {
    position: relative;
    width: 100%;
    float:left;
  }
  .titelfoot .price span:nth-child(1){
    display: block;
    margin-bottom: 6px;
    overflow: hidden;
  }
  .titelfoot .price span:nth-child(1) i:nth-child(1){
    font-size: 12px;
    color: #050505;
    font-style: normal;
    float: left;
    margin-right: 5px;
  }
  .titelfoot .price span:nth-child(1) i:nth-child(2){
    font-size: 18px;
    color: #4E73CD;
    font-style: normal;
    float: left;
    line-height: 18px;
  }
  .titelfoot .price span:nth-child(2){
    display: inline-block;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .titelfoot .price span:nth-child(2) i:nth-child(1){
    font-size: 12px;
    color: #050505;
    font-style: normal;
    float: left;
    margin-right: 5px;
  }
  .titelfoot .price span:nth-child(2) i:nth-child(2){
    font-size: 18px;
    color: #B0B0B0;
    font-style: normal;
    float: left;
    line-height: 18px;
    text-decoration:line-through
  }
  .titelfoot .price span:nth-child(3){
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    margin-left: 10px;
  }
  .titelfoot .price span:nth-child(3) i:nth-child(1){
    font-size: 12px;
    color: #050505;
    font-style: normal;
    float: left;
    margin-right: 5px;
  }
  .titelfoot .price span:nth-child(3) i:nth-child(2){
    font-size: 18px;
    color: #FFC800;
    font-style: normal;
    float: left;
    line-height: 18px;
  }
  .scang {
    float: right;
    border: 1px solid #4E73CD;
    border-radius: 2px;
    background: url("/images/person.png") no-repeat;
    background-position: -212px -24px;
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    margin-top: 11px;
  }
  .sacang span {
    font-size: 14px;
  }
  .scang span:nth-child(1) {
    margin-right: 5px;
    color: #8F8F8F;
    font-size: 14px;
  }
  .scang span:nth-child(2) {
    color: #3D3D3D;
    font-size: 14px;
  }
  .modelversion div.aaa {
    color: red
  }
  .modelversion div.hidden{
    color: #ccc
  }
  #modal .header span.huise {
    color: #989898
  }
</style>
