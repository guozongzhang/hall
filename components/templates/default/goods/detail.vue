<template>
  <div class="furniture">
    <div class="down">该商品已下架,如有需要请联系卖家</div>
    <div class="fur_info">
      <p class="title">{{detail.fur_name}}</p>
      <span class="bqian">{{detail.fur_adv}}</span>
      <div class="titelfoot">
        <div class="price">
          <span>
            <i>优惠价:</i>
            <i>¥{{defaluteSku.price}}</i>
          </span>
          <span>
            <i>原价:</i>
            <i>¥{{defaluteSku.discount}}</i>
          </span>
          <span>
            <i>专属价:</i>
            <i>¥</i>
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
          <span>{{defaluteSku.color}}{{defaluteSku.size}}{{defaluteSku.version}}</span>
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
            <span>{{detail.fur_weight}}KG</span>
          </li>
          <li>
            <span>体积:</span>
            <span>{{detail.fur_volume}}M</span>
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
      <p class="c05">图文详情</p>
      <ul class="desc">
        <li v-for="item in detailpics">
          <img v-bind:src="item.fip_url" />
        </li>
      </ul>
      <p class="text" v-html="detail.fur_info"></p>
    </div>



    <div id="modal" class="mui-modal">
      <a class="mui-icon mui-icon-close mui-pull-right" href="#modal"></a>
      <div class="header">
        <img v-bind:src="detail.fur_image" />
        <div class="title">
          <p>银丰科艺的非常厉害的一个产品</p>
          <div class="price"><i>专属价格：</i><i>¥{{defaluteSku.discount}}</i></div>
          <span>请选择规格属性</span>
          <!-- <span>已选择：原木色</span> -->
        </div>
      </div>
      <div class="modelversion">
        <p class="c05">颜色</p> 
        <div v-bind:class="item.fur_id_poi_furnitures === detail.fur_id ? 'active' : ''" v-for="item in detail.furniture_sku" >{{item.color}}</div>
      </div>
      <div class="modelversion">
        <p class="c05">尺寸</p>
        <div v-bind:class="item.fur_id_poi_furnitures === detail.fur_id ? 'active' : ''" v-for="item in detail.furniture_sku" >{{item.size}}</div>

      </div>
      <div class="modelversion">
        <p class="c05">其他规格</p>
        <div v-bind:class="item.fur_id_poi_furnitures === detail.fur_id ? 'active' : ''" v-for="item in detail.furniture_sku" >{{item.version}}</div>

      </div>
      <div class="submit">
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
let model
export default {
  props: ['info'],
  data () {
    return {
      detail: {},
      defaluteSku: {},
      detailpics: []
    }
  },
  watch: {
    info: function () {
      this.detail = this.info
      this.init(this.info)
    }
  },
  methods: {
    init: function (obj) {
      console.log('111',obj)
      this.defaluteSku = obj.furniture_sku.filter(item => {
        return obj.fur_id == item.fur_id_poi_furnitures
      })[0]
      this.detailpics = obj.furniture_intro_pics.filter(item => {
        return item.intro_type != "intro"
      })
    }
  },
  mounted () {
    model = this
  }
}
</script>
<style scoped>
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
    height: 150px;
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
