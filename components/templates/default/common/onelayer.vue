<template>
  <div>
  </div>
</template>
<script>
let model
let picker
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
    init: function () {
      picker = new window.mui.PopPicker({layer: 1})
    },
    // 获取数据
    getOneInit: async function () {
      let arr = model.onearr || []
      picker.setData(arr)
      picker.show(function (selectItems) {
        model.$emit('getLayerOne', selectItems)
      })
    }
  },
  mounted () {
    model = this
    model.init()
  }
}
</script>
