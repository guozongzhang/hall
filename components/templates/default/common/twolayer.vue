/* 用法
*/
<template>
  <div>
  </div>
</template>
<script>
let model
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
    // 获取数据
    getTwoInit: async function () {
      let arr = model.twoarr || []
      var picker = new window.mui.PopPicker({layer: 2})
      picker.setData(arr)
      picker.show(function (selectItems) {
        model.$emit('getLayerTwo', selectItems)
      })
    }
  },
  mounted () {
    model = this
  }
}
</script>
