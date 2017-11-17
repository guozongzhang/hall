<template>
<div class="classify-box">
  <div class="left-box">
    <div class="left-classify">
      <a href="javascript:;" v-bind:class="activeid == item.id ? 'active' : ''"  @click="choiceType(item)" v-for="item in leftArr">
        <span class="active-icon"></span>
        <span>{{item.sp_type_name}}</span>
      </a>
    </div>
  </div>
  <div class="right-box">
    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-4" v-for="item in subArr">
        <a v-bind:href="'/furdetail?classifyid=' + item.id">
          <img class="mui-media-object" :src="item.icon_url">
          <div class="mui-media-body">{{item.type_name}}</div>
        </a>
      </li>
    </ul> 
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
let model
export default {
  data () {
    return {
      activeid: 0,
      leftArr: [],
      subArr: []
    }
  },
  methods: {
    init: function () {
      model.getClassify()
    },

    // 获取二级分类
    getClassify: function () {
      let param = {}
      axios.get('classes/furniture_simple_types', {
        params: param
      }).then(function (data) {
        model.leftArr = data.data.items
      }).catch(function () {
        window.mui.toast('获取数据失败!')
      })
    },

    // 获取三级分类
    choiceType: function (obj) {
      model.activeid = obj.id
      let param = {
        where: {
          sp_type_id_poi_furniture_simple_types: obj.id
        }
      }
      axios.get('classes/furniture_types', {
        params: param
      }).then(function (data) {
        model.subArr = data.data.items
      }).catch(function () {
        window.mui.toast('获取数据失败!')
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
.classify-box{
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  height: calc(100% - 44px);
  display: flex;
}
.left-box{
  display: inline-block;
  width: 25%;
  overflow-x: hidden;
  overflow-y: auto;
}
.right-box{
  display: inline-block;
  width: 75%;
}
.left-classify{
  height: 100%;
  padding-top: 14px;
  border-right: 1px solid #dfdfdf;
  background-color: #fafafa;
}
.left-classify a{
  position: relative;
  display: block;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  color: #3c3c3c;
  cursor: pointer;
}
.active-icon{
  position: absolute;
  top: 10px;
  left: 0;
  display: none;
  width: 8px;
  height: 16px;
  background-color: #5075ce;
}
.left-classify a.active .active-icon{
  display: inline-block;
}
.right-box .mui-table-view:before,
.right-box .mui-table-view:after{
  background-color: #fff;
}
.right-box .mui-table-view.mui-grid-view{
  padding: 10px;
}
.right-box .mui-table-view.mui-grid-view .mui-table-view-cell{
  padding: 10px 10px 0 10px;
}
.right-box .mui-table-view.mui-grid-view img{
  border: 1px solid #c9c9c9;
}
.right-box .mui-table-view.mui-grid-view .mui-media-body{
  font-size: 14px;
}
</style>
