<template>
<div>
  <div class="mui-input-row search-box">
    <span class="search-icon fa fa-search"></span>
    <input type="text" class="mui-input searchinput" v-model="searchKey">
    <span class="cancel" @click="cancelSearch()">取消</span>
  </div>
  <div class="history-search">
    <p>
      <span>搜索历史</span>
      <span class="fa fa-trash" id="delhistory"></span>
    </p>
    <div class="history-item">
      <a :href="linkPath + '/goodslist?searchKey=' + item" v-for="item in historyArr" >{{item}}</a>
    </div>
  </div>
  <div class="line"></div>
  <div class="hot-search">
    <p>
      <span>热门搜索</span>
    </p>
    <div class="hot-item">
      <a :href="linkPath + '/goodslist?searchKey=' + item.txt" v-for="item in hotArr">{{item.txt}}</a>
    </div>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let Cookies = require('js-cookie')
let url = require('url')
let $ = require('jquery')
let querystring = require('querystring')
let model
let myURL
export default {
  data () {
    return {
      linkPath: '',
      searchKey: '',
      historyArr: [],
      hotArr: []
    }
  },
  methods: {
    init: function () {
      model.getHot()
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let urlObj = querystring.parse(myURL.query)
      // 如果有搜索关键字
      if (urlObj.searchKey) {
        model.searchKey = urlObj.searchKey
      }
      $('.searchinput').focus()
      $(document).keyup(function (e) {
        if (e.keyCode === 13) {
          window.location.href = model.linkPath + '/goodslist?searchKey=' + model.searchKey
        }
      })
      document.getElementById('delhistory').addEventListener('tap', function () {
        var btnArray = ['否', '是']
        if (model.historyArr.length === 0) {
          window.mui.toast('没有更多历史记录了')
          return
        }
        window.mui.confirm('确定要清空历史搜索记录？', '友情提示', btnArray, function (e) {
          if (e.index === 1) {
            model.historyArr = []
            Cookies.set('search-history-' + window.location.port, '')
          }
        })
      })
    },

    getHot: function () {
      model.historyArr = Cookies.get('search-history-' + window.location.port) ? (Cookies.get('search-history-' + window.location.port) || []).split(',') : []
      let len = model.historyArr.length
      if (len > 10) {
        model.historyArr = model.historyArr.slice(0, 5)
      }
      let param = {
        where: {
          name: 'shopsearch'
        }
      }
      axios.get('classes/homepage_modules', {
        params: param
      }).then(function (data) {
        let keywords = JSON.parse(data.data.items[0].config)
        model.hotArr = keywords.hotkey.split(',').map((item) => {
          let isred = false
          if (/^<.+>$/.test(item)) {
            item = item.slice(1, item.length - 1)
            isred = true
          }
          return {
            txt: item,
            isred: isred
          }
        })
      }).catch(function () {
      })
    },

    // 取消搜索
    cancelSearch: function () {
      let urlObj = querystring.parse(myURL.query)
      if (urlObj.searchKey) {
        window.location.href = model.linkPath + '/'
      } else {
        window.location.href = model.linkPath + '/goodslist'
      }
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

<style>
.search-box{
  position: relative;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #fff !important;
}
.searchinput{
  font-size: 15px;
}
.search-icon{
  position: absolute;
  top: 17px;
  left: 19px;
  font-size: 18px;
  color: #989898;
  display: inline-block;
}
.search-box input{
  height: 30px;
  line-height: 30px;
  margin: 0;
  border: none;
  background-color: #ededed;
  padding-left: 34px;
}
.search-box .cancel{
  width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  margin-left: 10px;
  text-align: center;
  display: block;
  flex-grow: 1;
  color: #616161;
}
.history-search,
.hot-search{
  padding: 10px 10px 0 10px;
  min-height: 46px;
  background-color: #fff !important;
}
.history-search p,
.hot-search p{
  height: 24px;
  line-height: 24px;
  font-size: 15px;
  color: #7e7e7e;
}
.history-search .fa-trash{
  float: right;
  color: #737373;
  font-size: 20px;
}
.history-item,
.hot-item{
  display: flex;
  flex-wrap: wrap;
}
.history-item a,
.hot-item a{
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid #737373;
  color: #3d3d3d;
  border-radius: 3px;
  margin-right: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.history-item a.active,
.hot-item a.active{
  background-color: #c7c7c7;
  border: 1px solid #c7c7c7;
  color: #fff;
}
.line{
  width: 100%;
  height: 10px;
  background-color: #f4f4f4;
}
</style>
