/* 用法
*/
<template>
  <div>
  </div>
</template>
<script>
let procitydis = require('~/static/js/area.json')
let model
let picker
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
    init: function () {
      picker = new window.mui.PopPicker({layer: 3})
    },
    // 获取数据
    getThreeInit: async function () {
      let arrs = model.arr.length > 0 ? model.arr : procitydis
      picker.setData(arrs)
      picker.pickers[0].setSelectedValue(String(model.areaobj.one), 0, function () {
        picker.pickers[1].setSelectedValue(String(model.areaobj.two), 0, function () {
          picker.pickers[2].setSelectedValue(String(model.areaobj.three))
          picker.show(function (selectItems) {
            model.$emit('getLayerThree', selectItems)
          })
        })
      })
    }
  },
  mounted () {
    model = this
    model.init()
  }
}
</script>
