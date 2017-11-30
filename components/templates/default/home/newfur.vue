<template>
<div class="mui-slider">
  <div class="title-box">
    <label>新品推荐</label>
    <span class="right-icon">
      <span class="mui-icon mui-icon-arrowright"></span>
    </span>
    <a :href="linkPath + '/goodslist?up_time=up_time'" class="go-more">更多</a>
  </div>
  <div class="mui-slider new-box">
    <div class="mui-slider-group">
      <div class="mui-slider-item fur-item" v-for="(tmp, index) in newlistArr"  v-bind:class="index == 0 ? 'mui-active' : ''">
        <a class="mui-media-object" :href="linkPath + '/furdetail?id=' + tmp.id">
          <img :src="tmp.fur_img || '/images/square.png'" />
          <span class="fur-price">￥{{tmp.price}}{{index}}</span>
        </a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
let url = require('url')
let model
export default {
  props: ['newarr'],
  data () {
    return {
      linkPath: '',
      newlistArr: [
        {
          id: 0,
          fur_img: '/images/newfur.png',
          price: '0'
        }
      ]
    }
  },
  watch: {
    'newarr': function () {
      model.newlistArr = this.newarr
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style scoped>
  .mui-slider-item {
    transform: scale(0.8)
  }
  .mui-active {
    transform: scale(1)
  }
  .mui-slider-item-duplicate {
    margin-right: 6px;
  }
  .noactive{
    transform: scale(0.8,0.8);
  }
  .active {
    transform: scale(1,1);
  }
  .title-box{
    padding: 8px 14px;
    font-size: 15px;
    color: #000;
  }
  .title-box label{
    float: left;
  }
  .right-icon{
    position: relative;
    top: 2px;
    display: inline-block;
    width: 16px;
    height: 16px;
    text-align: center;
    border-radius: 100%;
    background-color: #ffc700;color: #fff;
    margin-left: 5px;
  }
  .mui-icon-arrowright{
    position: absolute;
    left: 4px;
    top: 3px;
    font-size: 10px;
  }
  .go-more{
    float: right;
    font-size: 14px;
    color: #989898;
  }
  .new-box {
    width: 100%;
    padding: 0 14px;
    height: 120px;
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
    height: 120px;
    position: relative;
  }
  .fur-item .link-box{
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .fur-price{
    position: absolute;
    left: 50%;
    bottom: 10px;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    display: inline-block;
    min-width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 0px 8px;
    background-color: #4c6ab3;
    color: #fff;
  }
  .fur-item img{
    height: 100%;
  }
  .fur-item:nth-last-child(1){
    margin-right: 0;
  }
</style>
