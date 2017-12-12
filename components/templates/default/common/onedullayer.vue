/* 用法
*/
<template>
  <div>
    <div class="mui-poppicker mui-active">
      <div class="mui-poppicker-header">
        <button class="mui-btn mui-poppicker-btn-cancel">取消</button>
        <button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>
        <div class="mui-poppicker-clear">
        </div>
      </div>
      <div class="mui-poppicker-body">
        <div class="mui-picker" style="width: 100%;">
          <div class="mui-picker-inner">
            <div class="mui-pciker-rule mui-pciker-rule-ft">
            </div>
            <ul class="mui-pciker-list" style="transform: perspective(1000px) rotateY(0deg) rotateX(0deg);">
              <li class="highlight" style="transform-origin: center center -89.5px; transform: translateZ(89.5px) rotateX(0deg);">京乐</li>
              <li class="visible" style="transform-origin: center center -89.5px; transform: translateZ(89.5px) rotateX(-20deg);">京乐</li>
              <li class="visible" style="transform-origin: center center -89.5px; transform: translateZ(89.5px) rotateX(-40deg);">Osdesign</li>
              <li class="visible" style="transform-origin: center center -89.5px; transform: translateZ(89.5px) rotateX(-60deg);">乐享</li>
              <li class="visible" style="transform-origin: center center -89.5px; transform: translateZ(89.5px) rotateX(-80deg);">世纪京洲</li>
              <li style="transform-origin: center center -89.5px; transform: translateZ(89.5px) rotateX(-100deg);">华盛</li>
              <li style="transform-origin: center center -89.5px; transform: translateZ(89.5px) rotateX(-120deg);">中瑞</li>
              <li style="transform-origin: center center -89.5px; transform: translateZ(89.5px) rotateX(-140deg);">搭配家</li>
            </ul>
          <div class="mui-pciker-rule mui-pciker-rule-bg"></div>
        </div>
      </div></div>
    </div>
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
