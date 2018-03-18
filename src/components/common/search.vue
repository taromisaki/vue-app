<template>
  <div id="search-wrap">
          <div class="goback" @click="searchhide">返回</div>
          <input class="search"></input>
          <div class="search-btn">搜索</div>
          <div class="clf"></div>
          <div class="result-wrap">
              <div class="hot-search">热门搜索</div>
              <div class="hot-search-spans">
                  <span>许巍</span>
                  <span>朴树</span>
                  <span>赵磊</span>
                  <span>周杰伦</span>
                  <span>李健</span>
                  <span>泰勒斯威夫特</span>
                  <span>艾薇儿</span>
              </div>
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
        .clf {
            clear: both;
        }
        .goback {
            float: left;
            width: 60px;
            height: 50px;
            line-height: 50px;
            font-size: 10px;
        }
        .search {
            display: block;
            width: 200px;
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            background: rgb(13, 140, 190);
            outline:none;
            float: left;
            border: 0;
            border-bottom: 1px solid #333;
            box-sizing: border-box;
        }
        .search-btn {
            float: left;
            width: 60px;
            height: 50px;
            line-height: 50px;
            font-size: 10px;
        }
        .result-wrap {
            width: 100%;
            border-top: 1px solid #666;
        }
        .hot-search {
            font-size: 14px;

        }
        .hot-search-spans {
            width: 80%;
            margin: 10px auto;
            span {
                display: inline-block;
                font-size: 8px;
                padding: 5px;
                border: 1px solid #666;
                border-radius: 10px;
            }
        }
    }
</style>