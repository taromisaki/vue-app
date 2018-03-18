<template>
  <div id="search-wrap">
          <div class="goback" @click="searchhide">返回</div>
          <input class="search"></input>
          <div class="search-btn"></div>
          <div class="result-wrap">

          </div>
  </div>
</template>
<script>
export default {
    methods: {
        //左侧个人信息栏出现
        searchhide: function () {
            this.$parent.componentsChange.searchWrapshow = false
        }
    }
}
</script>
<style lang="less" scoped>
    #search-wrap {
        position: fixed;
        top: 0;
        bottom:0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgb(13, 140, 190);
        z-index: 1001;
        .goback {
            float: left;
            width: 60px;
            height: 30px;
            line-height: 30px;
        }
        .search {
            display: block;
            width: 200px;
            height: 30px;
            background: rgb(13, 140, 190);
            outline:none;
            float: left;
            border: 0;
            border-bottom: 1px solid #333;
            box-sizing: border-box;
        }
    }
</style>