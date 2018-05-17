<template>
  <div id="search-wrap">
    <div class="goback iconfont icon-fanhui" @click="searchhide"></div>
    <input class="search" id="input">
    <div class="search-btn" @click.stop="searchall()">搜索歌曲</div>
    <div class="clf"></div>
    <div class="hot-wrap">
        <div class="hot-search">热门搜索</div>
        <div class="hot-search-spans">
            <span v-for="item in hotwords" @click.stop="searchall('',item)">{{item}}</span>
        </div>
    </div>
    <div class="result-wrap" v-if="result_show">
        <div class="type">
            <div><span @click.stop="searchall(1)" class="active">单曲</span></div>
            <div><span @click.stop="searchall(1000)">歌单</span></div>
            <div><span @click.stop="searchall(100)">歌手</span></div>
            <!-- <div><span @click.stop="searchall(1002)">用户</span></div> -->
        </div>
        <ul class="result-ul">
            <li v-for="song in list.list.songs" v-if="list.type == 1" class="song clearfix">
                <p class="name" v-bind:music-id="song.id">{{song.name}}</p>
                <span>{{song.artists[0].name}}-{{song.album.name}}</span>
            </li>
            <li v-for="playlist in list.list.playlists" v-if="list.type == 1000" class="menu clearfix">
                <img v-bind:src="playlist.coverImgUrl">
                <div class="menu-title">
                    <p @click="gomusiclist" v-bind:list-id="playlist.id">{{playlist.name}}</p>
                    <span>{{playlist.trackCount}}首&nbspby&nbsp{{playlist.creator.nickname}}</span>
                </div>
            </li>
            <li v-for="singer in list.list.artists" v-if="list.type == 100" class="singer clearfix">
                <img v-bind:src="singer.img1v1Url">
                <p>{{singer.name}}</p>
            </li>
            <li v-if="list.type == 1002" class="user">
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import { hotsearch } from "@/api/getData"
import { search } from "@/api/getData";
export default {
    data() {
        return {
            hotwords : [],
            list: {
                type: '1',
                list: []
            },
            result_show: false
        }
    },
    methods: {
        //左侧个人信息栏出现
        searchhide: function () {
            this.$router.go(-1)
        },
        async hot() {
            let data = {}
            let hotdata = await hotsearch(data)
            console.log(hotdata)
            for (let item of hotdata.data.result.hots) {
                this.hotwords.push(item.first)
            }
        },
        async searchall(t,k) {
            let dom = event.currentTarget
            $(dom).addClass('active').parent('div').siblings().find('span').removeClass('active') 
            let type = t || '1'
            let key = k || $('#input').val()
            k?$('#input').val(k):''
            if(key){
                let data = {'keywords': key,'type':type}
                let result = await search(data)
                console.log(result)
                this.list.type = type
                this.list.list = result.data.result
                this.result_show = true
            }else {
                return
            }
        },
        gomusiclist: function(event){
            console.log(event.currentTarget)
            let _self = this
            let dom = event.currentTarget
            let id = dom.getAttribute("list-id")
            this.$store.commit('getmusiclistid',id)
            this.$store.state.musiclistId = id
            this.$router.push('/main/listdetail')
        }
    },
    created: function () {
        this.hot()
    }
}
</script>
<style lang="less" scoped>
    #search-wrap {
        width: 100%;
        height: 100%;
        //background: rgb(13, 140, 190);
        z-index: 1001;
        color: #fff;
        .clf {
            clear: both;
        }
        .goback {
            float: left;
            width: 60px;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            text-align: center;
        }
        .search {
            display: block;
            width: 200px;
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            background: rgba(0, 0, 0, 0);
            outline:none;
            float: left;
            border: 0;
            color: #fff;
            font-size: 12px;
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
        .hot-wrap {
            width: 100%;
            border-top: 1px solid #666;
            padding-top: 20px;
        }
        .hot-search {
            font-size: 14px;

        }
        .hot-search-spans {
            width: 100%;
            margin: 10px auto;
            span {
                display: inline-block;
                font-size: 8px;
                padding: 5px;
                border: 1px solid #666;
                border-radius: 10px;
                margin-left: 10px;
                margin-top: 10px;
            }
        }
        .result-wrap {
            .type {
                display: flex;
                div {
                    flex: 1;
                    text-align: center;
                    span {
                        color: #fff;
                        padding-bottom: 4px;
                    }
                    .active {
                        border-bottom: 2px solid #00d1ff;
                    }
                }
            }
            .result-ul {
                margin-top: 15px;
                li {
                    &::before,&::after {
                        content: '\0020';
                        display: block;
                        height: 0;
                        clear: both;
                        visibility: hidden;
                    }
                }
                .song {
                    height: 30px;
                    margin-top: 15px;
                    &:first-child {
                        margin-top: 0;
                    }
                    p {
                        line-height: 18px;
                        font-size: 14px;
                    padding-left: 15px;
                    box-sizing: border-box;  
                    width: 100%;
                    }
                    span {
                        display: inline-block;
                    padding-left: 15px;
                        font-size: 10px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    box-sizing: border-box;    
                    width: 100%;
                    }
                }
                .singer {
                    margin-top: 15px;
                    padding-left: 15px;
                    box-sizing: border-box;
                    &:first-child {
                        margin-top: 0;
                    }
                    img {
                        width: 50px;
                        height: 50px;
                        float: left;
                        border-radius: 5px;
                    }
                    p {
                        float: left;
                        line-height: 50px;
                        padding-left: 15px;
                    }
                }
                .menu {
                    width: 100%;
                    line-height: 53px;
                    height: 53px;
                    margin-bottom: 5px;
                    list-style: none;
                    display: flex;
                    overflow: hidden;    
                    padding-left: 15px;
                    box-sizing: border-box;
                    img {
                        width: 50px;
                        height: 50px;
                        float: left;
                        flex:0;
                        border-radius: 5px;
                    }
                    .menu-title {
                        float: left;
                        flex:1;
                        height: 50px;
                        margin-left: 10px;
                        p {
                            display: block;
                            height: 20px;
                            width: 80%;
                            overflow: hidden;
                            line-height: 20px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            color: #fff;
                            text-decoration: none;
                            font-size: 12px;
                        }
                        span {
                            color: #fff;
                            display: block;
                            height: 25px;
                            line-height: 25px;
                            font-size: 14px;
                            padding-left: 0;
                            font-size: 10px;
                        }
                    }
                    .clf {
                        clear: both;
                    }
                }
            }
        }
    }
</style>