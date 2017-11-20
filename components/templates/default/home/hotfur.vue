<template>
<div class="mui-slider">
  <div class="title-box">
    <label>热销排行</label>
    <span class="right-icon">
      <span class="mui-icon mui-icon-arrowright"></span>
    </span>
    <a href="/goodslist" class="go-more">更多</a>
  </div>
  <div class="mui-slider-group mui-slider-loop">
    <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一个图文表格) -->
    <div class="mui-slider-item mui-slider-item-duplicate">
      <ul class="mui-table-view mui-grid-view">
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a :href="linkPath + '/furdetail'">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg">
            <span class="new-item">新品</span>
            <div class="mui-media-body">Color of SIP CBD</div>
            <div class="money">
              <span>￥</span>
              <span>301</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg">
            <div class="mui-media-body">静静看这世界</div>
            <div class="money">
              <span>￥</span>
              <span>302</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg">
            <div class="mui-media-body">静静看这世界</div>
            <div class="money">
              <span>￥</span>
              <span>303</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="mui-slider-item">
      <ul class="mui-table-view mui-grid-view">
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg">
            <span class="new-item">新品</span>
            <div class="mui-media-body">Color of SIP CBD</div>
            <div class="money">
              <span>￥</span>
              <span>101</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg">
            <div class="mui-media-body">静静看这世界</div>
            <div class="money">
              <span>￥</span>
              <span>102</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg">
            <div class="mui-media-body">Color of SIP CBD</div>
            <div class="money">
              <span>￥</span>
              <span>103</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="mui-slider-item">
      <ul class="mui-table-view mui-grid-view">
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg">
            <div class="mui-media-body">Color of SIP CBD</div>
            <div class="money">
              <span>￥</span>
              <span>201</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg">
            <span class="new-item">新品</span>
            <div class="mui-media-body">静静看这世界</div>
            <div class="money">
              <span>￥</span>
              <span>202</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg">
            <div class="mui-media-body">Color of SIP CBD</div>
            <div class="money">
              <span>￥</span>
              <span>203</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="mui-slider-item">
      <ul class="mui-table-view mui-grid-view">
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg">
            <span class="new-item">新品</span>
            <div class="mui-media-body">Color of SIP CBD</div>
            <div class="money">
              <span>￥</span>
              <span>301</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg">
            <div class="mui-media-body">静静看这世界</div>
            <div class="money">
              <span>￥</span>
              <span>302</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg">
            <div class="mui-media-body">静静看这世界</div>
            <div class="money">
              <span>￥</span>
              <span>303</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="mui-slider-item mui-slider-item-duplicate">
      <ul class="mui-table-view mui-grid-view">
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/57137408d500db5578b48d94354a5585.jpg">
            <span class="new-item">新品</span>
            <div class="mui-media-body">Color of SIP CBD</div>
            <div class="money">
              <span>￥</span>
              <span>101</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/9478b77dbe799b62a2a06bb9c42e8e8c.jpg">
            <div class="mui-media-body">静静看这世界</div>
            <div class="money">
              <span>￥</span>
              <span>102</span>
            </div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4">
          <a href="/furdetail">
            <img class="mui-media-object" src="http://cdn.dpjia.com/files/uploads/images/fe4405fa30a0c39ab5ddc29f784b27ea.jpg">
            <div class="mui-media-body">Color of SIP CBD</div>
            <div class="money">
              <span>￥</span>
              <span>103</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
let url = require('url')
let model
export default {
  data () {
    return {
      linkPath: ''
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      window.mui.init()
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
  .title-box{
    padding: 8px 14px 0 14px;
    font-size: 15px;
    color: #000;
  }
  .right-icon{
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 100%;
    background-color: #ffc700;color: #fff;
    margin-left: 5px;
  }
  .mui-icon-arrowright{
    font-size: 16px;
  }
  .go-more{
    float: right;
    font-size: 15px;
    color: #989898;
  }
  .mui-table-view-cell{
    position: relative;
  }
  .new-item{
    position:absolute;
    top: 3px;
    left: 18px;
    display: inline-block;
    padding: 3px 8px;
    background-color: #d70000;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
  }
  .money{
    font-weight: bold;
    text-align: left;
    color: #4e73cd;
    margin-top: 3px;
  }
</style>
