<template>
  <div id="search-wrap">
          <div class="goback" @click="saerchhide">返回</div>
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
        saerchhide: function () {
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
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        //左侧个人信息栏隐藏
        goback: function () {
            this.$parent.componentsChange.searchWrap = false;
        },
        cons: function () {
            console.log(this.userinfo)
        },
        //获取用户信息
        async getUserinfo(id) {
            let par = {'uid':id}
            let refreshreq = await loginrefresh(par)
            this.userinfo = refreshreq.data
            console.log(this.userinfo)
        } 
    },
    created: function () {
        // let user = this.$store.state.userinfo  localStorage.getItem('userid') ||
        
    },
    mounted: function () {
        //let id = this.$store.state.userId
        let id = localStorage.getItem('userid')
        //alert(id)
        this.getUserinfo(id)
    }
}
</script>

