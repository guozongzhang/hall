<template>
  <div class="classify-box" id="classifylist">
    <div class="sub-classify">
      <div class="null-box" @click="cancelModal()"></div>
      <div class="clasify-item" v-for="item in classifyArr">
        <p class="title">
          <label>{{item.sp_type_name}}</label>
          <a href="javascript:;" @click="showAllTypes(item)">
            <span>{{item.showall ? '收起' : '全部'}}</span>
            <span class="fa" v-bind:class="item.showall ? 'fa-angle-up' : 'fa-angle-down'"></span>
          </a>
        </p>
        <ul class="items-ul">
          <li v-bind:class="item.active.indexOf(sub.id) > -1 ? 'active' : ''" v-for="(sub, index) in item.furniture_types" @click="choiceType(item, sub)" v-show="index < 3 || item.showall">
            <a href="javascript:;">{{sub.type_name}}</a>
          </li>
        </ul>
      </div>
      <div class="clasify-btn">
        <a href="javascript:;" @click="resetClassify()">重置</a>
        <a href="javascript:;" class="submit-btn" @click="setClassify()">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
let model
let $ = require('jquery')
let _ = require('underscore')
import axios from '~/plugins/axios'
export default {
  props: [],
  data () {
    return {
      classifyArr: [], // 操作的分类数据
      classifyArrY: [], // 原始分类数据
      nameStr: '', // 显示的名字
    }
  },
  methods: {
    init: function () {
      axios.get('/functions/furnitures/furniture_types', {
      }).then(function (data) {
        data.data.forEach(item => {
          item.active = []
          item.showall = false
        })
        model.classifyArrY = _.clone(data.data)
        model.classifyArr = data.data
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
      model.classifyArr = model.classifyArrY // 恢复原来数据
    },

    // 重置分类
    resetClassify: function () {
      model.classifyArr.forEach(item => {
        item.active = []
      })
    },

    // 确定分类
    setClassify: function () {
      model.classifyArr.forEach(item => {
        item.furniture_types.forEach(acfur => {
          if (item.active.indexOf(acfur.id) > -1) {
            let obj = {
              type_poi_furniture_types: acfur.id,
              name: acfur.type_name,
              id: 0,
              delete: 'no'
            }
            if (model.nameStr.length > 0) {
              model.nameStr = model.nameStr + ',' + acfur.type_name
            } else {
              model.nameStr = acfur.type_name
            }
          }
        })
      })
      model.classifyArrY = model.classifyArr
      $('#classifylist').hide()
    },

    // 选择分类
    choiceType: function (item, sub) {
      if (item.active.indexOf(sub.id) < 0) {
        item.active.push(sub.id) // 控制高亮的数组
      } else {
        let index = item.active.indexOf(sub.id)
        item.active.splice(index, 1);
      }
    },
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>

