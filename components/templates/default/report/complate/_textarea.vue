<template>
<div>
  <div class="subbox-show" style="position: relative">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goTextBack()">返回</a>
      <span class="fa close-icon" @click="goHome()">×</span>
      <h1 class="mui-title othertitle">{{textarea.title}}</h1>
      <a class="mui-icon mui-pull-right save-btn" @click="confEditTextarea()">提交</a>
    </header>
    <div class="textarea-box edit-box">
      <div class="edittext">
        <textarea type="text" v-model="textarea.content" placeholder="最多输入500个字符"></textarea>
      </div>
    </div>
  </div>
</div>
</template>
<script>
let url = require('url')
let model
let myURL
export default {
  props: ['textareaobj'],
  data () {
    return {
      textarea: {}
    }
  },
  methods: {
    init: function () {
      model.textarea = this.textareaobj
      myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
    },

    // 提交输入信息
    confEditTextarea: function () {
      let obj = {
        flag: true,
        data: model.textarea
      }
      model.$emit('textareaFun', obj)
    },

    // 返回多行文本编辑
    goTextBack: function () {
      let obj = {
        flag: false,
        data: {}
      }
      model.$emit('textareaFun', obj)
    },

    // 返回首页
    goHome: function () {
      window.location.href = model.linkPath + '/'
    }
  },
  mounted () {
    model = this
    this.init()
  }
}
</script>
<style scoped>
</style>
