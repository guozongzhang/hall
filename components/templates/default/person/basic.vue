<template>
  <div>
    <div class="personbg">
      <img class="bgimg" src="/images/shuijiao.jpg">
      <img class="bgheader" src="/images/shuijiao.jpg">
      <p>点击登录</p>
    </div>
    <ul class="mui-table-view">
      <li class="personli">
        <a href="javascript:;" class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" src="/images/shuijiao.jpg">
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              手机号:
              <span>13370179521</span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" src="/images/shuijiao.jpg">
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              手机号:
              <span>13370179521</span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" src="/images/shuijiao.jpg">
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              手机号:
              <span>13370179521</span>
            </p>
          </div>
        </a>
      </li>
      <li class="personli">
        <a href="javascript:;" class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left" src="/images/shuijiao.jpg">
          <div class="mui-media-body">
            <p class='mui-ellipsis'>
              手机号:
              <span>13370179521</span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
  .personbg {
    width: 100%;
    height: 182px;
    background: #ccc;
    position: relative;
    margin-bottom: 10px;
  }
  .personbg .bgimg{
    width: 100%;
    height: 98.5px;
  }

  .personbg .bgheader{
    width: 108px;
    height: 108px;
    border-radius: 100px;
    display: inline-block;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -55px;
    margin-top: -55px;
    border: 2px solid #fff;
    box-shadow: 0px 1px 5px #666;
  }
  .personbg p {
    margin: 0px;
    margin-top: 42px;
    text-align: center;
    color: #5175CE;
  }
  .mui-table-view .mui-media-object{
    height: 30px;
    width: 30px;
  }
  .personli {
    padding: 10px;
    height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .personli p{
    margin: 0px;
    height: 30px;
    line-height: 30px;
  }

</style>
