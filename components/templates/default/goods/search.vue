<template>
<div>
  <div class="mui-input-row search-box">
    <span class="search-icon fa fa-search"></span>
    <input type="text" class="mui-input" v-model="searchKey">
    <span class="cancel" @click="cancelSearch()">取消</span>
  </div>
  <div class="history-search">
    <p>
      <span>搜索历史</span>
      <span class="fa fa-trash" id="delhistory"></span>
    </p>
    <div class="history-item">
      <a href="javascript:;" v-for="item in historyArr" v-bind:class="hisactive == item.id ? 'active' : ''">{{item.name}}</a>
    </div>
  </div>
  <div class="line"></div>
  <div class="hot-search">
    <p>
      <span>热门搜索</span>
    </p>
    <div class="hot-item">
      <a href="javascript:;" v-for="item in hotArr">{{item.name}}</a>
    </div>
  </div>
</div>
</template>
<script>
let model
export default {
  data () {
    return {
      searchKey: '',
      hisactive: 3,
      historyArr: [
        {
          id: 1,
          name: '这里的文字可能会很长'
        },
        {
          id: 2,
          name: '柜子'
        },
        {
          id: 3,
          name: '沙发柜子'
        },
        {
          id: 4,
          name: '柜子'
        },
        {
          id: 5,
          name: '木茶几'
        },
        {
          id: 6,
          name: '柜子'
        }
      ],
      hotArr: [
        {
          id: 1,
          name: '这里的文字可能会很长'
        },
        {
          id: 2,
          name: '柜子'
        },
        {
          id: 3,
          name: '沙发柜子'
        },
        {
          id: 4,
          name: '柜子'
        },
        {
          id: 5,
          name: '木茶几'
        },
        {
          id: 6,
          name: '柜子'
        }
      ]
    }
  },
  methods: {
    init: function () {
      document.getElementById('delhistory').addEventListener('tap', function () {
        var btnArray = ['否', '是']
        if (model.historyArr.length === 0) {
          window.mui.toast('没有更多历史记录了')
          return
        }
        window.mui.confirm('确定要清空历史搜索记录？', '友情提示', btnArray, function (e) {
          if (e.index === 1) {
            model.historyArr = []
            console.log('是')
          } else {
            console.log('否')
          }
        })
      })
    },

    // 取消搜索
    cancelSearch: function () {
      model.searchKey = ''
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
