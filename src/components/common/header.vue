<template>
  <div id="header">
          <div class="menu" @click="changeOpen"></div>
          <div class="middle">
              <div class="local"></div>
              <div class="cloud"></div>
              <div class="group"></div>
          </div>
          <div class="search"></div>
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
        background: rgba(0, 37, 177, 0.77);
        .menu {
            width: 30%;
            height: 60px;
            background: url('../../assets/header/menu.png') no-repeat;
            background-size: auto 50%;
            background-position: 15%;
            float: left;
        }
        .middle {
            width: 40%;
            height: 60px;
            display: flex;
            float: left;
            .local {
                flex:1;
                -ms-flex:1;
                -webkit-flex:1;
                -webkit-box-flex:1;
                height: 60px;
                background: url('../../assets/header/localmusic.png') no-repeat;
                background-size: auto 50%;
                background-position: center;
            }
            .cloud {
                flex:1;
                -ms-flex:1;
                -webkit-flex:1;
                -webkit-box-flex:1;
                height: 60px;
                background: url('../../assets/header/cloudmusic.png') no-repeat;
                background-size: auto 50%;
                background-position: center;
            }
            .group {
                flex:1;
                -ms-flex:1;
                -webkit-flex:1;
                -webkit-box-flex:1;
                height: 60px;
                background: url('../../assets/header/group.png') no-repeat;
                background-size: auto 50%;
                background-position: center;
            }
        }
        .search {
            width: 30%;
            height: 60px;
            background: url('../../assets/header/search.png') no-repeat;
            background-size: auto 50%;
            background-position: 85%;
            float: left;
        }
        .clf {
            clear: both;
        }
    }
</style>
