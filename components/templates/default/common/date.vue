/* 用法
*/
<template>
  <div>
  </div>
</template>
<script>
let model
export default {
  props: ['dateobj'],
  data () {
    return {
    }
  },
  watch: {
    'dateobj.state': function () {
      model.getOneInit()
    }
  },
  methods: {
    // 获取数据
    getOneInit: async function () {
      var dDate = new Date()
      dDate.setFullYear(2014, 7, 16)
      var minDate = new Date()
      minDate.setFullYear(2010, 0, 1)
      var maxDate = new Date()
      maxDate.setFullYear(2016, 11, 31)
      window.mui.plus.nativeUI.pickDate(function (e) {
        console.log(e)
        // model.$emit('getLayerOne', selectItems)
        var d = e.date
        console.log(d)
      }, function (e) {
        console.log(e)
      })
    }
  },
  mounted () {
    model = this
  }
}
</script>
