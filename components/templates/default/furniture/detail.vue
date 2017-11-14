<template>
  <div class="furniture">
    <div class="fur_info">
      <p class="title">银丰科技红烧云系列yyoowww</p>
      <span class="bqian">新品上市特价三天</span>
      <div class="price">
        <span>优惠价<i>{{}}</i></span>
        <span>原价<i>{{}}</i></span>
        <span>专属价<i>{{}}</i></span>
      </div>
      <div class="scang">
        收藏
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {
      }  
    }
  },
  methods: {
    init: function () {
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.fur_info {
  height: 140px;
  margin-bottom: 10px;
}
.title {
  height: 45px;
  line-height: 50px;
  font-size: 16px;
}
</style>
