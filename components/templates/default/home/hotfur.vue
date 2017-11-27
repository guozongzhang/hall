<template>
<div class="mui-slider">
  <div class="title-box">
    <label>热销排行</label>
    <span class="right-icon">
      <span class="mui-icon mui-icon-arrowright"></span>
    </span>
    <a :href="linkPath + '/goodslist?sales_count=sales_count'" class="go-more">更多</a>
  </div>
  <div class="new-box">
    <div class="fur-item" v-for="item in hotlistArr">
      <a class="link-box" :href="linkPath + '/furdetail?id=' + item.id">
        <img class="mui-media-object" :src="item.fur_image || '/images/square.png'">
        <span class="new-item" v-show="false">新品</span>
        <div class="fur-name">{{item.fur_name}}</div>
        <div class="money">
          <span>￥</span>
          <span>{{(item.sku_poi_furniture_sku || {}).discount || '0'}}</span>
        </div>
      </a>
    </div>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let url = require('url')
let model
export default {
  props: ['goodsids'],
  data () {
    return {
      linkPath: '',
      hotlistArr: [
        {
          id: 0,
          fur_image: '/images/square.png',
          fur_name: '热销',
          sku_poi_furniture_sku: ''
        },
        {
          id: 0,
          fur_image: '/images/square.png',
          fur_name: '热销',
          sku_poi_furniture_sku: ''
        },
        {
          id: 0,
          fur_image: '/images/square.png',
          fur_name: '热销',
          sku_poi_furniture_sku: ''
        }
      ]
    }
  },
  watch: {
    goodsids: function () {
      let idsArr = []
      model.goodsids.forEach((item) => {
        idsArr.push(item.id)
      })
      model.getFur(idsArr)
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    },

    // 获取商品信息
    getFur: async function (arr) {
      let param = {
        where: {
          fur_id: {
            $in: arr
          },
          com_id_poi_companys: this.$store.state.comid,
          user_poi_users: '0',
          st_id_poi_company_stores: '0',
          dealer_id_poi_company_dealer: '0'
        },
        keys: 'id, fur_name,fur_image,sku_poi_furniture_sku',
        include: 'sku_poi_furniture_sku'
      }
      let result = await axios.get('classes/furnitures', {
        params: param
      })
      model.hotlistArr = model.goodsids.map(el_a=>(result.data.items.find(el_b => el_b.id == el_a.id)))
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style scoped>
  .title-box{
    padding: 8px 14px;
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
    font-size: 14px;
    color: #989898;
  }
  .new-box {
    width: 100%;
    padding: 0 14px;
    white-space: nowrap;
    overflow: hidden;
    overflow-x: scroll; /* 1 */
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-overflow-scrolling: touch; /* 2 */
    text-align: justify; /* 3 */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .fur-item {
    display: inline-block;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 35%;
    position: relative;
    margin-right: 6px;
  }
  .fur-item .link-box{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .fur-item img{
    border: 1px solid #ccc;
    width: 100%;
  }
  .fur-name{
    width: 100%;
    font-size: 14px;
    color: #3d3d3d;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fur-item:nth-last-child(1){
    margin-right: 0;
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
    height: 30px;
  }
</style>
