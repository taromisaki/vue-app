<template>
    <div id="musiclistDetail">
        <div class="listheader clearfix">
            <span class="back iconfont icon-fanhui" @click="goBacklist()"></span>
            <div class="list-set iconfont icon-weibiaoti12"></div>
        </div>
        <div class="middle">
            <img v-bind:src="musiclistDetail.coverImgUrl" alt="" class="cover">
            <div class="rightmsg">
                <p class="title">{{musiclistDetail.name}}</p>
                <div class="list-master clearfix">
                    <img v-bind:src="musiclistDetail.creator.avatarUrl" alt="" class="master">
                    <span class="master-name">{{musiclistDetail.creator.nickname}}</span>
                </div>
            </div>
            <div class="clf"></div>
        </div>
        <div class="musics-con">
            <ol class="musics-list" type="1">
                <li v-for="item in musiclistDetail.tracks" class="clearfix">
                    <div class="music-title">
                        <p v-bind:music-id="item.id" @click="play">{{item.name}}</p>
                        <!-- <span class="singer">{{item.album.artists[0].name}}</span> -->
                    </div>
                    <div class="music-tool"></div>
                </li>
            </ol>
        </div>
        <keep-alive>
        <comfooter v-show="!this.$parent.playing"></comfooter>
        </keep-alive>
    </div>
</template>
<script>
// import comfooter from '@/components/common/footer'
import comfooter from '@/components/common/footer'
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
        comfooter
    },
    methods: {
        async getData(id){
            let _self = this
            let pram = {'id':id}
            let par = await getmusiclistdetail(pram)
            let data = par.data
            console.log(">>>>>",data)
            _self.musiclistDetail = data.result
            _self.musiclistsId = data.privileges
            let itemsId = _self.musiclistsId
        },
        async play() {
            let dom = event.currentTarget
            let id = dom.getAttribute("music-id") 
            if(this.$store.state.musicplaying.id == id) {
                // this.$parent.playing = true
                this.$store.commit('_playing',true)
            }else {
                this.$store.commit('changemusic', {'id':id})
            }
            //this.$router.push('/main/detailplay')
        },
        goBacklist () {
            this.$router.go(-1)
        }
    },
    created: function (){
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
        width: 100%;
        height: 100%;
        .listheader {
            width: 100%;
            height: 60px;
            padding: 0;
            position: fixed;
            top: 0;
            left: 0;
            // background: rgba(0, 37, 177, 0.77);
            color: #fff;
                background: rgba(1,1,1,.5);
            .back {
                display: inline-block;
                width: 60px;
                height: 60px;
                float: left;
                line-height: 60px;
                padding-left: 15px;
                box-sizing: border-box;
                text-align: center;
            }
            .list-set {
                width: 60px;
                height: 60px;
                float: right;
                line-height: 60px;
                text-align: center;
            }
            .clf {
                clear: both;
            }
        }
        .middle {
            width: 100%;
            margin-top: 60px;
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
        }
        .musics-con {
            width: 100%;
            .musics-list {
                list-style: none;
                margin: 0;
                padding: 0;
                padding-bottom: 60px;
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
                            height: 45px;
                            line-height: 45px;
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
