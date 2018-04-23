<template>
  <div id="header">
          <div class="menu" @touchstart="changeOpen"></div>
          <div class="search" @touchstart="searchShow"></div>
          <div class="clf"></div>
  </div>
</template>
<script>
export default {
    methods: {
        //左侧个人信息栏出现
        changeOpen: function () {
            // console.log(this.$parent.show);
            
            this.$parent.componentsChange.leftpanelshow = true
            let body = document.getElementsByTagName('body')[0]
            body.style.overflow = 'hidden'
            console.log('左侧出现')
            // this.$emit('taggle',false);
        },
        searchShow: function (){
            this.$parent.componentsChange.searchWrapshow = true
        }
    }
}
</script>
<style lang="less" scoped>
    #header {
        position: fixed;
        top: 0;
        bottom:0;
        left: 0;
        right: 0;
        width: 100%;
        height: 60px;
        background: rgba(30, 99, 255, 0.6);
        .menu {
            width: 60px;
            height: 60px;
            background: url('../../assets/header/menu.png') no-repeat;
            background-size: auto 50%;
            background-position: 15%;
            float: left;
        }
        .search {
            width: 60px;
            height: 60px;
            background: url('../../assets/header/search.png') no-repeat;
            background-size: auto 50%;
            background-position: center;
            float: right;
        }
        .clf {
            clear: both;
        }
    }
</style>
