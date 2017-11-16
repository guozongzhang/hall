<template>
  <div class="furniture">
    <div class="down">该商品已下架,如有需要请联系卖家</div>
    <div class="fur_info">
      <p class="title">银丰科技红烧云系列yyoowww</p>
      <span class="bqian">新品上市特价三天</span>
      <div class="titelfoot">
        <div class="price">
          <span>
            <i>优惠价:</i>
            <i>¥2699</i>
          </span>
          <span>
            <i>原价:</i>
            <i>¥29699</i>
          </span>
          <span>
            <i>专属价:</i>
            <i>¥699</i>
          </span>
        </div>
        <div class="scang">
          收藏
        </div>
      </div>
    </div>

    <div class="version">
      <p class="mui-navigate-right" >
        <a href="#modal">
          <span>已选择</span>
          <span>原木色、三层、658790321654、保修....x1</span>
        </a>
      </p>
      <div class="furdetail">
        <p class="c05">产品规格</p>
        <ul class="desc">
          <li>
            <span>品牌:</span>
            <span>银丰科艺</span>
          </li>
          <li>
            <span>系列:</span>
            <span>火烧云</span>
          </li>
          <li>
            <span>编码:</span>
            <span>YFKY001245</span>
          </li>
          <li>
            <span>用途:</span>
            <span>民用</span>
          </li>
          <li>
            <span>分类:</span>
            <span>炎炎夏日</span>
          </li>
          <li>
            <span>型号:</span>
            <span>SPD-009</span>
          </li>
          <li>
            <span>毛重:</span>
            <span>0.125KG</span>
          </li>
          <li>
            <span>体积:</span>
            <span>3.2M</span>
          </li>
          <li>
            <span>空间:</span>
            <span>办公室</span>
          </li>
          <li>
            <span>风格:</span>
            <span>自然风</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="furpic" >
      <div class="maodian" id="item2"></div>
      <p class="c05">图文详情</p>
      <ul class="desc">
        <li>
          <img src="/images/shuijiao.jpg" />
          <div>
            <h4>地中海风格</h4>
            <span class="content">风格简洁,造型经典,带您领略地中海风情</span>
          </div>
        </li>
        <li>
          <img src="/images/shuijiao.jpg" />
          <div>
            <h4>地中海风格</h4>
            <span class="content">风格简洁,造型经典,带您领略地中海风情</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="style">
      <p class='c3d'>地中海风格</p>
      <span class="c61">地中海风格是一种很特别的风格到底有多特别呢，我也不知道</span>
      <div class="styleimg">
        <div><img src="/images/shuijiao.jpg"></img></div>
        <div><img src="/images/shuijiao.jpg"></img></div>
        <div><img src="/images/shuijiao.jpg"></img></div>
      </div>
      <p class="text">地中海风格是一种很特别的风格到底有多特别呢，我也不知道地中海风格是一种很特别的风格到底有多特别呢，我也不知道地中海风格是一种很特别的风格到底有多特别呢，我也不知道地中海风格是一种很特别的风格到底有多特别呢，我也不知道</p>
    </div>

    <div id="modal" class="mui-modal">
      <a class="mui-icon mui-icon-close mui-pull-right" href="#modal"></a>
      <div class="header">
        <img src="" />
        <div class="title">
          <p>银丰科艺的非常厉害的一个产品</p>
          <div class="price"><i>专属价格：</i><i>¥26999</i></div>
          <span>请选择规格属性</span>
          <!-- <span>已选择：原木色</span> -->
        </div>
      </div>
      <div class="modelversion">
        <p class="c05">颜色</p>
        <div class="active">原木色</div>
        <div>原木色</div>
        <div>原木色</div>
        <div>原木色</div>
      </div>
      <div class="modelversion">
        <p class="c05">尺寸</p>
        <div class="active">200*150</div>
        <div>200*150*154</div>
        <div>200*150*154</div>
        <div>200*150*154</div>
      </div>
      <div class="modelversion">
        <p class="c05">其他规格</p>
        <div class="active">有扶手</div>
        <div>没扶手</div>
        <div>原木色</div>
        <div>小板凳</div>
      </div>
      <div class="submit">
        <span></span>
      </div>
    </div>

  </div>
</template>
<style>
  #modal {
    width: 100%;
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
    color: #989898;
  }
  #modal .mui-icon {
    margin-top: 10px;
    margin-right: 10px;
  }
  #modal .submit {
    height: 50px;
    background: #5075ce;
  }
  #modal .submit span {
    margin-top: 10px;
    display: block;
    height: 30px;
    width: 30px;
    margin: 10px auto;
    background: url('/images/login.png') no-repeat;
    background-size: 242px;
    cursor: pointer;
    background-position: -146px -18px;
    cursor: pointer;
    border: 2px solid #fff;
    border-radius: 30px;

  }
  .modelversion {
    padding: 0 10px;
    overflow: hidden;
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

</style> 
<script>
export default {
  data () {
    return {
      data: {

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
  height: 150px;
  max-width: 60%;
}
.furpic .desc div{
  width: 40%;
  float: left;
  padding: 0 20px;
}
.furpic h4 {
  text-align: left;
  margin: 50px 0 10px;
  font-size: 12px;
  font-weight: normal;
  color: #616161;
}
.furpic .content {
  text-align: left;
  float: left;
  font-size: 12px;
  color: #616161;
}
.style {
  background: #fff;
  padding-bottom: 10px;
}
.style p:nth-child(1){
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0
}
.style span{
  font-size: 12px;
  display: block;
  width: 50%;
  text-align: center;
  margin:0 auto;
}
.styleimg {
  padding: 0 20px;
  overflow: hidden;
}
.styleimg div{
  width: 30%;
  height: 165px;
  overflow: hidden;
  float: left;
  margin-right: 5%;
}
.styleimg div:nth-child(3){
  margin-right: 0
}
.styleimg img{
  height: 165px;
}
.style .text {
  margin: 10px 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 2px;
}

.version .mui-navigate-right{
  height: 50px;
  border-bottom: 1px solid #ccc;
  line-height: 50px;
  padding: 0 20px;
  position: relative;
  margin: 0;
}
.fur_info {
  height: 140px;
  margin-bottom: 10px;
  padding: 0 20px;
  background: #fff;
}
.fur_info .title {
  height: 45px;
  line-height: 50px;
  font-size: 16px;
  color: #050505;
  margin: 0;
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
  padding: 0 20px;
  margin-top: 11px;
}
</style>
