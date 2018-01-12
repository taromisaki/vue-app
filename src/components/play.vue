<template>
  <div id="play">
        <div class="listheader">
            <span class="back" @click="goBack()">歌单</span>
            <div class="list-set"></div>
            <div class="search-in-list"></div>
            <div class="clf"></div>
        </div>
        <div class="listbody"></div>
  </div>
</template>
<style lang="less" scoped>
    #play{
        overflow: scroll;
        width: 100%;
        height: 100%;
        background: url("../assets/musiclist/listbg.png") no-repeat;
        background-size: 100% auto;
        background-attachment:fixed;
    }
    .listheader {
            width: 100%;
            height: 60px;
            padding: 0;
            // background: rgba(0, 37, 177, 0.77);
            color: #fff;
            .back {
                display: inline-block;
                width: 100px;
                height: 60px;
                float: left;
                line-height: 60px;
                background: url('../assets/musiclistdetail/turnback.png') no-repeat;
                background-size: auto 30%;
                background-position: 15px;
                padding-left: 45px;
                box-sizing: border-box;
            }
            .search-in-list {
                width: 60px;
                height: 60px;
                float: right;
                line-height: 60px;
                background: url('../assets/musiclistdetail/search.png') no-repeat;
                background-size: auto 30%;
                background-position: 50%;
            }
            .list-set {
                width: 60px;
                height: 60px;
                float: right;
                line-height: 60px;
                background: url('../assets/musiclistdetail/more.png') no-repeat;
                background-size: auto 30%;
                background-position: 50%;
            }
            .clf {
                clear: both;
            }
        }
</style>
