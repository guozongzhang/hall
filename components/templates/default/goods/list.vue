<template>
<div class="mui-content-padded" style="margin: 0px;">
  <div class="p20-box">
    <div class="mui-input-row mui-search">
      <input type="search" class="mui-input-clear" placeholder="">
      <span class="mui-icon mui-icon-clear mui-hidden"></span>
      <span class="mui-placeholder">
        <span class="mui-icon mui-icon-search"></span>
      </span>
    </div>
    <div class="clasify-tabs">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-2 mui-col-sm-2">
          <a href="#">
            <div class="mui-media-body">
              <span class="tab-text">综合</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="#">
            <div class="mui-media-body">
              <span class="tab-text">上架时间</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;" @click="orderByPrice()">
            <div class="mui-media-body">
              <span class="tab-text" v-bind:class="activeprice ? 'activeprice' : ''">价格</span>
              <span class="self-iocn" v-bind:class="priceicon ? 'price-down' : 'price-up'"></span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-2 mui-col-sm-2">
          <a href="#">
            <div class="mui-media-body">
              <span class="tab-text">销量</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-2 mui-col-sm-2">
          <a href="#">
            <div class="mui-media-body" @click="showClasify()" id="show_btn">
              <span class="tab-text">筛选</span>
              <span class="self-iocn selected-icon"></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="f4-line"></div>
  <div class="goods-list">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in goodsArr">
        <div class="info-box">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <a class="fur-name" href="javascript:;">{{item.name}}</a>
            <div class="fur-price">
              <span class="price">￥{{item.price}}</span>
              <span class="sub-price">￥{{item.sub_price}}</span>
              <a href="javascript:;" class="collection-bth" v-bind:class="item.star ? 'star-active' : 'star-normal'" @click="collectBtn(item)">
                <span class="fa" v-bind:class="item.star ? 'fa-star' : 'fa-star-o'"></span>
                <span>{{item.star ? '取消' : '收藏'}}</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable">
    <!--菜单部分-->
    <aside id="offCanvasSide" class="mui-off-canvas-right">
      <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <button id="offCanvasHide" type="button" class="mui-btn mui-btn-danger mui-btn-block" style="padding: 5px 20px;">关闭侧滑菜单</button>
          <ul class="mui-table-view mui-table-view-chevron mui-table-view-inverted">
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">
                Item 1
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="mui-inner-wrap"></div>
  </div>
</div>
</div>
</template>
<script>
let model
export default {
  data () {
    return {
      priceicon: true,
      activeprice: false,
      goodsArr: [
        {
          id: 1,
          img_url: 'http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg',
          name: '这里是商品的名称，估计会很长，还要换行的这里是商品的名称，估计会很长，还要换行的这里是商品的名称，估计会很长，还要换行的这里是商品的名称，估计会很长，还要换行的',
          price: '19888',
          sub_price: '9888',
          star: false
        },
        {
          id: 2,
          img_url: 'http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg',
          name: '这里是商品的名称，估计会很长，还要换行的',
          price: '19888',
          sub_price: '9888',
          star: true
        },
        {
          id: 3,
          img_url: 'http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg',
          name: '这里是商品的名称，估计会很长，还要换行的',
          price: '19888',
          sub_price: '9888',
          star: false
        },
        {
          id: 4,
          img_url: 'http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg',
          name: '这里是商品的名称，估计会很长，还要换行的',
          price: '19888',
          sub_price: '9888',
          star: true
        },
        {
          id: 4,
          img_url: 'http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg',
          name: '这里是商品的名称，估计会很长，还要换行的',
          price: '19888',
          sub_price: '9888',
          star: true
        },
        {
          id: 4,
          img_url: 'http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg',
          name: '这里是商品的名称，估计会很长，还要换行的',
          price: '19888',
          sub_price: '9888',
          star: true
        },
        {
          id: 4,
          img_url: 'http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg',
          name: '这里是商品的名称，估计会很长，还要换行的',
          price: '19888',
          sub_price: '9888',
          star: true
        }
      ]
    }
  },
  methods: {
    init: function () {
      window.mui.init({
        swipeBack: false
      })
      // 侧滑容器父节点
      var offCanvasWrapper = window.mui('#offCanvasWrapper')
      // 菜单容器
      var offCanvasSide = document.getElementById('offCanvasSide')
      // 侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
      var classList = offCanvasWrapper[0].classList
      offCanvasSide.classList.remove('mui-transitioning')
      offCanvasSide.setAttribute('style', '')
      classList.add('mui-slide-in')
      offCanvasWrapper.offCanvas().refresh()
      document.getElementById('show_btn').addEventListener('tap', function () {
        offCanvasWrapper.offCanvas('show')
      })
      document.getElementById('offCanvasHide').addEventListener('tap', function () {
        offCanvasWrapper.offCanvas('close')
      })
      // 主界面和侧滑菜单界面均支持区域滚动；
      window.mui('#offCanvasSideScroll').scroll()
    },

    showClasify: function () {
      console.log('====')
    },

    // 按照价格排序
    orderByPrice: function () {
      model.priceicon = !model.priceicon
      model.activeprice = true
    },

    // 收藏
    collectBtn: function (obj) {
      obj.star = !obj.star
      let text = obj.star ? '收藏成功！' : '取消收藏'
      window.mui.toast(text)
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
  #offCanvasSide{
    position: fixed;
    top: 44px;
  }
  p {
    text-indent: 22px;
  }
  span.mui-icon {
    font-size: 14px;
    color: #007aff;
    margin-left: -15px;
    padding-right: 10px;
  }
  .mui-off-canvas-right {
    color: #fff;
  }
  .title {
    margin: 35px 15px 10px;
  }
  .title+.content {
    margin: 10px 15px 35px;
    color: #bbb;
    text-indent: 1em;
    font-size: 14px;
    line-height: 24px;
  }
  input {
    color: #000;
  }
  .p20-box{
    padding: 0 10px;
  }
  .mui-content .mui-input-clear {
    background-color: #fff;
    border-bottom: 1px solid #8f8f8f;
    border-radius: 0;
    color: #989898;
    font-size: 14px;
    margin: 0;
  }
  .mui-icon-search{
    position: relative;
    left: 5px;
  }
  .clasify-tabs{
    height: 40px;
  }
  .clasify-tabs .mui-grid-9{
    background-color: #fff !important;
    border-top: none !important;
    border-left: none !important;
  }
  .clasify-tabs .mui-grid-9 .mui-table-view-cell{
    height: 40px;
    border: none;
    padding: 0;
  }
  .clasify-tabs .mui-grid-9 .mui-table-view-cell a{
    height: 40px;
    padding: 0 !important;
  }
  .clasify-tabs .mui-grid-9 .mui-table-view-cell .mui-media-body {
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0;
  }
  .clasify-tabs .tab-text{
    display: inline-block;
    height: 16px;
  }
  .activeprice{
    color: #5075ce;
  }
  .clasify-tabs .self-iocn{
    position: relative;
    left: 2px;
    display: inline-block;
    background: url('/images/person.png') no-repeat;
    background-size: 498px;
  }
  .clasify-tabs .price-down{
    top: 5px;
    width: 12px;
    height: 16px;
    background-position: -225px -71px;
  }
  .clasify-tabs .price-up{
    top: 5px;
    width: 12px;
    height: 16px;
    background-position: -241px -71px;
  }
  .clasify-tabs .selected-icon{
    top: 3px;
    width: 16px;
    height: 16px;
    background-position: -260px -68px;
  }
  .f4-line{
    width: 100%;
    height: 10px;
    background-color: #f4f4f4;
  }
  .goods-list .mui-media {
    height: 110px;
    padding: 10px;
    border-bottom: 1px solid #cccccc;
  }
  .goods-list .mui-media .info-box{
    height: 90px;
    padding: 0;
    margin: 0;
  }
  .goods-list .mui-media .info-box img{
    width: 90px;
    height: 90px;
    max-width: 90px;
    max-height: 90px;
  }
  .goods-list .mui-media .fur-name{
    height: 42px;
    font-size: 16px;
    color: #050505;
    font-weight: 600;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .mui-media-body{
    height: 90px;
  }
  .fur-price{
    height: 48px;
  }
  .fur-price > span{
    display: inline-block;
    position: relative;
    top: 26px;
    font-weight: 600;
  }
  .fur-price .price{
    font-size: 16px;
    color: #4e73cd;
  }
  .fur-price .sub-price{
    margin-left: 6px;
    font-size: 12px;
    color: #b0b0b0;
    text-decoration:line-through;
  }
  .goods-list .mui-media .collection-bth{
    position: relative;
    top: 10px;
    z-index: 100;
    float: right;
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
    display: inline-block;
    margin-right: 3px;
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
  .goods-list .mui-media:after{
    background-color: #fff;
  }
  .mui-table-view-cell:after{
    background-color: #fff;
  }
  .mui-table-view:before,
  .mui-table-view:after{
    background-color: #fff;
  }
</style>
