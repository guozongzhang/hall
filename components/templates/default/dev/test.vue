<template>
  <div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable">
    <!--菜单部分-->
    <aside id="offCanvasSide" class="mui-off-canvas-right">
      <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <button id="offCanvasHide" type="button" class="mui-btn mui-btn-danger mui-btn-block" style="padding: 5px 20px;">关闭侧滑菜单</button>
          <ul class="mui-table-view mui-table-view-chevron mui-table-view-inverted">
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right">
                Item 1
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="mui-inner-wrap">
      <div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
        <button id="offCanvasShow" type="button" class="mui-btn mui-btn-primary mui-btn-block" style="padding: 5px;">
          显示侧滑菜单
        </button>
        </div>
      </div>
      <!-- off-canvas backdrop -->
      <div class="mui-off-canvas-backdrop"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    init: function () {
      window.mui.init({
        swipeBack: false
      })
      // 侧滑容器父节点
      var offCanvasWrapper = window.mui('#offCanvasWrapper')
      // 菜单容器
      var offCanvasSide = document.getElementById('offCanvasSide')
      // 侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
      var classList = offCanvasWrapper[0].classList
      offCanvasSide.classList.remove('mui-transitioning')
      offCanvasSide.setAttribute('style', '')
      classList.add('mui-slide-in')
      offCanvasWrapper.offCanvas().refresh()
      document.getElementById('offCanvasShow').addEventListener('tap', function () {
        offCanvasWrapper.offCanvas('show')
      })
      document.getElementById('offCanvasHide').addEventListener('tap', function () {
        offCanvasWrapper.offCanvas('close')
      })
      // 主界面和侧滑菜单界面均支持区域滚动；
      window.mui('#offCanvasSideScroll').scroll()
      window.mui('#offCanvasContentScroll').scroll()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style>
html,
body {
  background-color: #efeff4;
}
#offCanvasWrapper{
  height: 500px;
}
p {
  text-indent: 22px;
}
span.mui-icon {
  font-size: 14px;
  color: #007aff;
  margin-left: -15px;
  padding-right: 10px;
}
.mui-off-canvas-right {
  color: #fff;
}
.title {
  margin: 35px 15px 10px;
}
.title+.content {
  margin: 10px 15px 35px;
  color: #bbb;
  text-indent: 1em;
  font-size: 14px;
  line-height: 24px;
}
input {
  color: #000;
}
</style>
