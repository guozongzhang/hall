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
					<p>销售经理</p>
				</div>
				<div id="store" class="mui-control-content">
					<p>门店</p>
				</div>
			</div>
    </div>
  </div>
</div>
</template>
<script>
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
</style>
