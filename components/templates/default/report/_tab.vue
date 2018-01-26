<template>
  <div class="classify-box" id="classifylist">
    <div class="sub-classify">
      <div class="null-box" @click="cancelModal()"></div>
      <div class="content-box">
        <h3 class="selectTitle">选择产品品类</h3>
        <div class="clasify-item" v-for="item in classifyArr">
          <p class="title">
            <label>{{item.sp_type_name}}</label>
            <a href="javascript:;" @click="showAllTypes(item)">
              <span v-show="item.active.length > 0" style="margin-right:5px">已选{{item.active.length}}</span>
              <span class="fa" v-bind:class="item.showall ? 'fa-angle-up' : 'fa-angle-down'"></span>
            </a>
          </p>
          <ul class="items-ul">
            <li v-bind:class="item.active.indexOf(sub.id) > -1 ? 'active' : ''" v-for="(sub, index) in item.furniture_types" @click="choiceType(item, sub)" v-show="index < 3 || item.showall">
              <a href="javascript:;">{{sub.type_name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="clasify-btn">
        <a href="javascript:;" @click="resetClassify()">重置</a>
        <a href="javascript:;" class="submit-btn" @click="setClassify()">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
let model
let $ = require('jquery')
let Cookies = require('js-cookie')
export default {
  props: ['acticearr'],
  data () {
    return {
      classifyArr: [] // 操作的分类数据
    }
  },
  methods: {
    init: function (obj) {
      console.log('111', obj)
      let ms
      if (obj) {
        ms = obj
      } else {
        ms = model.acticearr
      }
      console.log('2', ms)
      axios.get('/functions/furnitures/furniture_types', {
      }).then(function (data) {
        console.log('1111', data)
        data.data.forEach(item => {
          if (item.furniture_types.length > 0) {
            item.furniture_types.forEach(furitem => {
              if (ms.length > 0) {
                ms.forEach(acitem => {
                  if (acitem.type_poi_furniture_types === furitem.id) {
                    item.active.push(acitem.id)
                  }
                })
              } else {
                item.active = []
              }
            })
          } else {
            item.active = []
          }
          item.showall = false
        })
        model.classifyArr = data.data
        console.log('1112145', model.classifyArr)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.href = model.linkPath + '/login'
          }, 2000)
        }
      })
    },
    // 点击空白消失选择宽
    cancelModal: function () {
      $('#classifylist').hide()
      model.init(model.acticearr) // 恢复原来数据
    },

    // 重置分类
    resetClassify: function () {
      model.classifyArr.forEach(item => {
        item.active = []
      })
    },

    // 确定分类
    setClassify: function () {
      let classifyArr = [] // 重新保存确定的分类
      let nameStr = '' // 显示的名字
      let activearr = [] // 选中的ids
      model.classifyArr.forEach(item => {
        item.active.forEach(msitem => {
          activearr.push(msitem)
        })
      })
      model.classifyArr.forEach(item => {
        item.furniture_types.forEach(acfur => {
          if (activearr.indexOf(acfur.id) > -1) {
            let obj = {
              type_poi_furniture_types: acfur.id,
              name: acfur.type_name,
              id: 0,
              delete: 'no'
            }
            classifyArr.push(obj)
            if (nameStr.length > 0) {
              nameStr = nameStr + ',' + acfur.type_name
            } else {
              nameStr = acfur.type_name
            }
          }
        })
      })
      model.init(classifyArr)
      model.$emit('submitArr', classifyArr, nameStr)
      $('#classifylist').hide()
    },

    // 显示各分类全部（收起）
    showAllTypes: function (obj) {
      obj.showall = !obj.showall
    },

    // 选择分类
    choiceType: function (item, sub) {
      if (item.active.indexOf(sub.id) < 0) {
        item.active.push(sub.id) // 控制高亮的数组
      } else {
        let index = item.active.indexOf(sub.id)
        item.active.splice(index, 1)
      }
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>
<style lang="">
  .content-box {
    background: #fff;
    overflow: hidden;
    width: 276px;
    float: right;
  }  
  .selectTitle {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #ccc;
    font-weight: 100;
    margin: 0;
    font-size:14px
  }
   .classify-box{
    display: none;
    position: fixed;
    top: 0px;
    z-index: 1000;
    width: 100%;
    height: calc(100%);
    background-color: rgba(0, 0, 0, 0.6);
    overflow-y: auto;
  }
   .sub-classify{
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    min-height: calc(100% - 44px);
    background-color:rgba(255,255,255,0.1);
    padding-bottom: 50px;
  }
  .null-box {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: calc(100% - 276px);
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    float: left;
  }
  .clasify-item{
    width: 275px;
    float: right;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  .clasify-item .title{
    margin: 0;
    padding: 0;
    height: 22px;
    line-height: 22px;
    margin-bottom: 20px;
  }
  .title > label {
    color: #050505;
  }
  .title > a{
    float: right;
  }
  .clasify-item .items-ul{
    margin: 0;
    padding: 0px;
    list-style: none;
  }
  .clasify-item .items-ul li{
    display: inline-block;
    list-style: none;
    width: 74px;
    height: 30px;
    margin-right: 12px;
    margin-bottom: 6px;
  }
  .clasify-item .items-ul li:nth-child(3n){
    margin-right: 0;
  }
  .clasify-item .items-ul li a{
    display: inline-block;
    width: 80px;
    height: 30px;
    padding: 0 5px;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    text-decoration: none;
    color: #3d3d3d;
    border: 1px solid #737373;
    border-radius: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clasify-item .items-ul .active a{
    background-color: #5075ce;
    border: 1px solid #5075ce;
    color: #fff;
  }
  .clasify-btn{
    position: fixed;
    right: 0;
    bottom: 0;
    width: 280px;
    height: 50px;
    z-index: 100;
    background-color: #fff;
  }
  .clasify-btn > a{
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #3d3d3d;
    font-size: 15px;
    border-top: 1px solid #ababab;
    cursor: pointer;
  }
  .clasify-btn .submit-btn{
    background-color: #5075ce;
    border-top: 1px solid #5075ce;
    color: #fff;
  }
</style>

