/* 用法
*/
<template>
  <div>
  </div>
</template>
<script>
let model
export default {
  props: ['oneobj', 'onearr'],
  data () {
    return {
    }
  },
  watch: {
    'oneobj.state': function () {
      model.getOneInit()
    }
  },
  methods: {
    // 获取数据
    getOneInit: async function () {
      let arr = model.onearr || []
      var picker = new window.mui.PopPicker({layer: 1})
      picker.setData(arr)
      picker.show(function (selectItems) {
        model.$emit('getLayerOne', selectItems)
      })
    }
  },
  mounted () {
    model = this
  }
}
</script>
