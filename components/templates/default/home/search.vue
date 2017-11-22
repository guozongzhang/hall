<template>
<div class="mui-content-padded" style="margin: 5px;">
  <div class="mui-input-row mui-search">
    <input type="search" class="mui-input-clear" placeholder="搜索商品" v-model="searchKey" @blur="goSearch()">
    <span class="mui-icon mui-icon-clear mui-hidden"></span>
    <span class="mui-placeholder" style="text-align: left">
      <span class="mui-icon mui-icon-search"></span>
    </span>
  </div>
</div>
</template>
<script>
let url = require('url')
let $ = require('jquery')
let model
export default {
  data () {
    return {
      linkPath: '',
      searchKey: ''
    }
  },
  methods: {
    init: function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      $(document).keyup(function (e) {
        if (e.keyCode === 13) {
          window.location.href = model.linkPath + '/goodslist?searchKey=' + model.searchKey
        }
      })
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
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
  .mui-search:before{
    position: relative;
    top: 28px;
  }
</style>
