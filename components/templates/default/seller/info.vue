<template>
<div class="mui-content-padded">
  <div class="top-box">
    <img class="top-bg" src="/images/seller_bg.png">
    <div class="info-box">
      <div class="img-box">
        <img :src="basic.logo">
      </div>
      <div class="info-detail">
        <label>{{basic.subname}}云展厅</label>
        <p>{{basic.name}}</p>
        <p>{{basic.address}}</p>
        <p>{{basic.tel}}</p>
      </div>
    </div>
    <div class="store-info">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;">
            <span class="number">5</span>
            <span>个</span>
            <div class="mui-media-body">品牌</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;">
            <span class="number">26</span>
            <span>个</span>
            <div class="mui-media-body">系列</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;">
            <span class="number">9999</span>
            <span>个</span>
            <div class="mui-media-body">商品</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
          <a href="javascript:;">
            <span class="number">99</span>
            <span>个</span>
            <div class="mui-media-body">门店</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="tab-box">
      <div>
				<div id="segmentedControl" class="mui-segmented-control">
					<a class="mui-control-item mui-active" href="#designer">销售经理</a>
					<a class="mui-control-item" href="#store">线下门店</a>
				</div>
				<div id="designer" class="mui-control-content mui-active">
					<p>
            <span class="name">张三</span>
            <span class="tel">18702760110</span>
            <span class="area">华北区</span>
          </p>
          <p>
            <span class="name">李四</span>
            <span class="tel">18702760110</span>
            <span class="area">华北区</span>
          </p>
          <p>
            <span class="name">习大大</span>
            <span class="tel">18702760110</span>
            <span class="area">华北区</span>
          </p>
          <p>
            <span class="name">马云</span>
            <span class="tel">18702760110</span>
            <span class="area">华北区</span>
          </p>
          <p>
            <span class="name">销售员</span>
            <span class="tel">18702760110</span>
            <span class="area">华北区</span>
          </p>
          <p>
            <span class="name">销售员</span>
            <span class="tel">18702760110</span>
            <span class="area">华北区</span>
          </p>
				</div>
				<div id="store" class="mui-control-content">
          <div class="store-item">
            <img src="/images/shuijiao.jpg">
            <div class="store-detail">
              <label>体验店名称</label>
              <p>湖北省武汉市洪山区鲁磨路388号地址大学</p>
              <p>010-87657680</p>
            </div>
          </div>
          <div class="store-item">
            <img src="/images/shuijiao.jpg">
            <div class="store-detail">
              <label>体验店名称</label>
              <p>体验店地址</p>
              <p>010-87657680</p>
            </div>
          </div>
          <div class="store-item">
            <img src="/images/shuijiao.jpg">
            <div class="store-detail">
              <label>体验店名称</label>
              <p>体验店地址体验店地址体验店地址体验店地址体验店地址</p>
              <p>010-87657680</p>
            </div>
          </div>
          <div class="store-item">
            <img src="/images/shuijiao.jpg">
            <div class="store-detail">
              <label>体验店名称</label>
              <p>体验店地址</p>
              <p>010-87657680</p>
            </div>
          </div>
				</div>
			</div>
    </div>
    <p class="preview-share" @click="previewShare()">
      <span class="mui-icon mui-icon-eye"></span>
      <span>预览我的分享</span>
    </p>
    <div class="share-box animated">
      <div class="share-info">
        <p class="close-box">
          <span class="mui-icon mui-icon-closeempty" @click="closeShare()"></span>
        </p>
        <p class="share-tips">您将首页、商品详情页或者联系信息页分享出去后,其他人通过您分享的链接只能看到您自己的联系方式</p>
        <div class="designer-box">
          <div class="up-info">
            <div class="img-circle">
              <img src="/images/shuijiao.jpg">
            </div>
            <div class="designer-info">
              <label>嘉利信得云展厅官方定制销售经理</label>
              <p>
                <span class="designer-name">习大大</span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </p>
              <p>联系电话:18702760110</p>
            </div>
          </div>
          <div class="down-info">服务区域: 华北区(北京、天津、河北)</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
let $ = require('jquery')
export default {
  data () {
    return {
      basic: {
        logo: 'http://cdn.dpjia.com/files/uploads/images/82d9d215d58aa06eb8e52f8d6852132b.jpg?x-oss-process=image/resize,m_fill,h_160,w_230',
        name: '北京嘉利信得有限公司',
        subname: '嘉利信得',
        address: '北京市海淀区学院路7号弘彧大厦',
        tel: '010-87556767'
      }
    }
  },
  methods: {
    init: function () {
    },

    // 预览分享
    previewShare: function () {
      $('.share-box').show()
      $('.share-box').addClass('bounceInUp')
      setTimeout(function () {
        $('.share-box').removeClass('bounceInUp')
      }, 1000)
    },

    // 关闭分享
    closeShare: function () {
      $('.share-box').hide()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
html,body{
  background-color: #ededed !important;
}
.mui-content-padded{
  margin: 0 !important;
}
.top-box{
  position: relative;
}
.top-box .top-bg{
  width: 100%;
  vertical-align: middle;
}
.info-box{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 36px;
  float: left;
}
.img-box{
  position: relative;
  display: inline-block;
  width: 40%;
  background-color: #fff;
  float: left;
}
.img-box img{
  display: block;
  width: 94%;
  margin: 3%;
}
.info-detail{
  margin-left: 20px;
  display: inline-block;
  width: 50%;
  color: #fff;
}
.info-detail label{
  display: block;
  padding-bottom: 4px;
  border-bottom: 1px solid #a1c4e1;
  margin-bottom: 2px;
}
.info-detail p{
  margin: 0;
  height: 20px;
  line-height: 20px;
  padding: 0;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.store-info ul.mui-grid-view{
  background-color: #fff;
  border: none;
}
.store-info ul.mui-grid-view li.mui-table-view-cell{
  border: none;
  color: #3d3d3d;
  padding: 6px;
  font-size: 14px;
}
.number{
  color: #4e73cd;
  font-size: 18px;
  font-weight: 600;
}
.tab-box{
  background-color: #ededed;
  padding: 15px 10px;
}
.tab-box .mui-segmented-control{
  border-radius: 0;
  border: none;
}
.tab-box .mui-segmented-control a{
  color: #040404;
}
.mui-segmented-control .mui-control-item{
  border-bottom: 1px solid #7f7f7f;
  border-left: none;
}
.tab-box .mui-segmented-control .mui-active{
  background-color: #fff;
  color: #040404;
  border: 1px solid #7f7f7f;
  border-bottom: none;
}
.mui-control-content{
  border: 1px solid #7f7f7f;
  border-top: none;
  background-color: #fff;
}
#designer,
#store{
  padding-bottom: 20px;
  height: 220px;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
}
#designer p{
  height: 54px;
  line-height: 54px;
  border-bottom: 1px dashed #b0b0b0;
  margin: 0;
  padding: 0;
}
#designer p span{
  display: inline-block;
  text-align: center;
  color: #050505;
}
#designer .name{
  width: 30%;
}
#designer .tel{
  width: 40%;
  color: #5175ce;
}
#designer .area{
  width: 30%;
}
.store-item{
  display: flex;
  padding: 12px;
  border-bottom: 1px dashed #b0b0b0;
}
.store-item img{
  width: 120px;
  height: 80px;
  float: left;
  vertical-align: middle;
}
.store-item .store-detail{
  display: inline-block;
  padding: 8px 12px;
  flex-grow: 1;
}
.store-detail label{
  display: block;
  font-size: 16px;
  color: #050505;
  margin-bottom: 2px;
  font-weight: 600;
}
.store-item .store-detail p{
  margin: 0;
  padding: 0;
  font-size: 13px;
  max-width: 200px;
  color: #3d3d3d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preview-share{
  margin: 0;
  padding: 0;
  padding: 20px;
  text-align: center;
  color: #5175cd;
  background-color: #ededed;
  cursor: pointer;
}
.preview-share .mui-icon-eye{
  display: inline-block;
  font-size: 18px;
  margin-right: 4px;
}
.share-box{
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.share-info{
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 270px;
  background-color: #fff;
}
.close-box{
  margin: 0;
  padding: 0;
  text-align: right;
  cursor: pointer;
}
.close-box span{
  font-size: 30px;
}
.share-tips{
  padding: 0 20px;
  margin: 0;
  font-size: 13px;
  color: #7e7e7e;
}
.designer-box{
  margin: 10px 20px;
  border-radius: 2px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 0 6px #dccece;
}
.up-info{
  padding: 15px;
  height: 130px;
  display: flex;
}
.img-circle{
  width: 85px;
  height: 85px;
  border-radius: 100%;
  border: 1px solid #d9d9da;
  overflow: hidden;
}
.up-info .img-circle img{
  width: 84px;
  height: 84px;
}
.designer-info{
  margin-left: 8px;
  padding: 3px 0;
  flex-grow: 1;
}
.designer-info label{
  display: block;
  border-bottom: 1px solid #a7a7a7;
  padding-bottom: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #030303;
}
.designer-info p{
  margin: 0;
  padding: 0;
  color: #030303;
}
.designer-info p span{
  display: inline-block;
}
.designer-name{
  font-size: 16px;
  font-weight: 600;
  color: #050505;
  margin-right: 5px;
}
.designer-info p .fa-star{
  color: #ffc700;
}
.down-info{
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 15px;
  background-color: #e9e9ea;
  color: #4f4f50;
}
</style>
