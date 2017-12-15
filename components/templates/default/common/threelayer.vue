/* 用法
*/
<template>
  <div>
  </div>
</template>
<script>
let procitydis = require('~/static/js/area.json')
let model
export default {
  props: ['areaobj', 'arr'],
  data () {
    return {
    }
  },
  watch: {
    'areaobj.state': function () {
      model.getThreeInit()
    }
  },
  methods: {
    // 获取数据
    getThreeInit: async function () {
      let arrs = model.arr.length > 0 ? model.arr : procitydis
      var picker = new window.mui.PopPicker({layer: 3})
      picker.setData(arrs)
      picker.show(function (selectItems) {
        model.$emit('getLayerThree', selectItems)
      })
    }
  },
  mounted () {
    model = this
  }
}
</script>
