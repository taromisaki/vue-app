<template>
    <div id="musiclistDetail">
        <div class="listheader">
            <span class="back" @click="goBacklist()">歌单</span>
            <div class="list-set"></div>
            <div class="search-in-list"></div>
            <div class="clf"></div>
        </div>
        <div class="middle">
            <img v-bind:src="musiclistDetail.coverImgUrl" alt="" class="cover">
            <div class="rightmsg">
                <p class="title">{{musiclistDetail.name}}</p>
                <div class="list-master">
                    <img src="../assets/head.png" alt="" class="master">
                    <span class="master-name">misaki-taro</span>
                    <div class="clf"></div>
                </div>
            </div>
            <div class="clf"></div>
            <div class="tool">
                <div class="stay">收藏</div>
                <div class="comment">评论</div>
                <div class="share">分享</div>
                <div class="download">下载</div>
            </div>
        </div>
        <div class="musics-con">
            <div class="list-tool">
                <div class="playall">播放全部</div>
                <div class="select">多选</div>
            </div>
            <ol class="musics-list" type="1">
                <li v-for="item in musiclistDetail.tracks" v-bind:music-id="item.id" @click="play">
                    <div class="music-title">
                        <p alt="">{{item.name}} <span v-if="item.alia[0]">({{item.alia[0]}})</span></p>
                        <span class="singer">{{item.ar[0].name}} -- {{item.al.name}}</span>
                    </div>
                    <div class="music-tool"></div>
                    <span class="clf"></span>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
// import comfooter from '@/components/common/footer'
import {getmusiclistdetail} from '@/api/getData'
import {musicurl} from '@/api/getData'
import {musicdetail} from '@/api/getData'

export default {
    name: 'musiclistDetail',
    data()  {
        return{
            musiclistsId: [],
            musiclistDetail:{}
        }
    },
    components: {
        // comfooter
    },
    methods: {
        async getData(id){
            let _self = this
            let pram = {'id':id}
            let par = await getmusiclistdetail(pram)
            let data = par.data
            console.log(data)
            _self.musiclistDetail = data.playlist
            _self.musiclistsId = data.privileges
            let itemsId = _self.musiclistsId
        },
        async play() {
            let dom = event.currentTarget
            let id = dom.getAttribute("music-id")
            this.$store.commit('changemusic', {'id':id})
        },
        goBacklist () {
            this.$parent.componentsChange.musiclistshow = !this.$parent.componentsChange.musiclistshow
            this.$parent.componentsChange.musiclistdetailshow = !this.$parent.componentsChange.musiclistdetailshow
        }
    },
    mounted: function (){
        console.log(this)
        let id = this.$store.state.musiclistId
        this.getData(id)
    },
    // mounted: function () {
    //     let id = this.$store.state.musiclistId
    //     this.getMusiclistDetail(id)
    // },
    beforeCreate: function (){

    }
}
</script>

<style lang="less" scoped>
    #musiclistDetail {
        overflow: scroll;
        margin-top: 60px;
        width: 100%;
        height: 100%;
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
        .middle {
            height: 180px;
            width: 100%;
            // background: rgba(0, 37, 177, 0.77);
            color: #fff;
            .cover {
                width: 115px;
                height: 115px;
                float: left;
                margin-left: 15px;
            }
            .rightmsg {
                float: left;
                width: 200px;
                .title {
                    margin-left: 15px;
                    font-size: 14px;
                }
                .list-master {
                    margin: 20px 15px;
                    .master {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        float: left;
                    }
                    .master-name {
                        float: left;
                        font-size: 12px;
                        line-height: 20px;
                        padding-left: 5px;
                    }
                    .clf {
                        clear: both;
                    }
                }
            }
            .clf {
                clear: both;
            }
            .tool {
                width: 100%;
                display: flex;
                margin-left: 10px auto;
                div {
                    flex: 1;
                    text-align: center;
                    padding-bottom: 0;
                    font-size: 12px;
                    padding-top: 35px;
                    box-sizing: border-box;
                    height: 50px;
                }
                .stay {
                    
                    background: url('../assets/musiclistdetail/hided.png') no-repeat;
                    background-size: auto 50%;
                    background-position: 50%;
                }
                .comment {
                    background: url('../assets/musiclistdetail/comment.png') no-repeat;
                    background-size: auto 50%;
                    background-position: 50%;
                }
                .share {
                    background: url('../assets/musiclistdetail/share.png') no-repeat;
                    background-size: auto 50%;
                    background-position: 50%;
                }
                .download {
                    background: url('../assets/musiclistdetail/download.png') no-repeat;
                    background-size: auto 50%;
                    background-position: 50%;
                }
            }
        }
        .musics-con {
            width: 100%;
            .list-tool {
                width: 100%;
                height: 40px;
                color:#fff;
                font-size: 12px;
                // background: rgba(28, 62, 126, 0.68);
                .playall {
                    width: 78%;
                    float: left;
                    height: 40px;
                    line-height: 40px;
                    box-sizing: border-box;
                    background: url('../assets/musiclistdetail/play.png') no-repeat;
                    background-size: auto 50%;
                    background-position: 15px;
                    padding-left: 40px;
                }
                .select {
                    width: 22%;
                    float: left;
                    height: 40px;
                    line-height: 40px;
                    background: url('../assets/musiclistdetail/moreset.png') no-repeat;
                    background-size: auto 50%;
                    background-position: 10px;
                    padding-left: 34px;
                    box-sizing: border-box;
                }
            }
            .musics-list {
                list-style: none;
                margin: 0;
                padding: 0;
                padding-bottom: 20px;
                // background: rgba(28, 62, 126, 0.68);
                li {
                    color: #fff;
                    font-size: 14px;
                    line-height: 38px;
                    height:50px;
                    margin-left: 30px;
                    // list-style: none;
                    margin-top: 5px;
                    .music-title {
                        line-height: 45px;
                        height: 45px;
                        width: 80%;
                        float: left;
                        padding-left: 10px;
                        box-sizing: border-box;
                        p {
                            padding: 0;
                            margin:0;
                            font-size: 14px;
                            width: 100%;
                            height: 21px;
                            line-height: 21px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            // overflow: hidden;
                            // // line-height: 20px;
                            // white-space: nowrap;
                            // text-overflow: ellipsis;
                        }
                        .singer {
                            width: 100%;
                            font-size: 10px;
                            line-height: 17px;
                            display: inline-block;
                            float: left;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }
                    .music-tool {
                        float: right;
                        background: url('../assets/musiclistdetail/more.png') no-repeat;
                        background-size: auto 50%;
                        background-position: 25%;
                        height: 38px;
                        width: 50px;
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .music-play {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
