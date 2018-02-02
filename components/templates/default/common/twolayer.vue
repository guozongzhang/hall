/* 用法
*/
<template>
  <div>
  </div>
</template>
<script>
let model
let picker
export default {
  props: ['twoobj', 'twoarr'],
  data () {
    return {
    }
  },
  watch: {
    'twoobj.state': function () {
      model.getTwoInit()
    }
  },
  methods: {
    init: function () {
      picker = new window.mui.PopPicker({layer: 2})
    },
    // 获取数据
    getTwoInit: async function () {
      let arr = model.twoarr || []
      picker.setData(arr)
      picker.show(function (selectItems) {
        model.$emit('getLayerTwo', selectItems)
      })
    }
  },
  mounted () {
    model = this
    model.init()
  }
}
</script>
