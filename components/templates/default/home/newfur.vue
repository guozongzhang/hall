<template>
<div class="mui-slider">
  <div class="title-box">
    <label>新品推荐</label>
    <span class="right-icon">
      <span class="mui-icon mui-icon-arrowright"></span>
    </span>
    <a :href="linkPath + '/goodslist'" class="go-more">更多</a>
  </div>
  <div class="new-box">
    <div class="fur-item" v-for="item in newlistArr">
      <a class="link-box" :href="linkPath + '/furdetail?id=' + item.id">
        <img class="mui-media-object" :src="item.fur_image || '/images/default_null.jpg'">
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
  data () {
    return {
      linkPath: '',
      newlistArr: [
        {
          id: 0,
          fur_image: '/images/default_null.jpg',
          fur_name: '未设置',
          sku_poi_furniture_sku: ''
        }
      ]
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      model.getFur()
    },

    // 获取新品商品信息
    getFur: async function () {
      let param = {
        limit: 5,
        order: '-create_time',
        keys: 'id, fur_name,fur_image'
      }
      let result = await axios.get('classes/furnitures', {
        params: param
      })
      model.newlistArr = result.data.items
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
    font-size: 15px;
    color: #989898;
  }
  .new-box {
    width: 100%;
    padding: 0 14px;
    height: 180px;
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
    width: 96%;
    height: 180px;
    position: relative;
    margin-right: 6px;
  }
  .fur-item .link-box{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .fur-item img{
    width: 100%;
  }
  .fur-item:nth-last-child(1){
    margin-right: 0;
  }
</style>
