<template>
    <div id="musicList">
        <div class="toolList">
            <ul>
                <li @click="getData()"><a>本地音乐</a></li>
                <li><a>我的电台</a></li>
                <li><a>我的收藏</a></li>
            </ul>
        </div>
        <div class="list-built">
            <span class="title">我的歌单({{musiclists.length}})</span>
            <span class="setting"></span>
            <div class="clf"></div>
        </div>
        <div class="built-drop">
            <div class="waiting" id="waiting"></div>
            <ul class="list">
                <li v-for="item in musiclists" @click = "getMusiclistDetail" v-bind:list-id="item.id">
                    <img v-bind:src="item.coverImgUrl" alt="">
                    <div class="menu-title">
                        <a alt="">{{item.name}}</a>
                        <span>{{item.trackCount}}首&nbspby&nbsp{{item.creator.nickname}}</span>
                    </div>
                    <span class="clf"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {getmusiclist} from '@/api/getData'
export default {
    name: 'Musiclist',
    data()  {
        return{
            musiclists: [],
            musiclistDetail:{}
        }
    },
    methods: {
        getMusiclistDetail(event) {
            console.log(this)
            console.log(event.currentTarget)
            let _self = this
            let dom = event.currentTarget
            let id = dom.getAttribute("list-id")
            this.$store.commit('getmusiclistid',id)
            this.$parent.componentsChange.musiclistshow = false
            this.$parent.componentsChange.musiclistdetailshow = true
            this.$store.state.musiclistId = id
        },
        // 封装请求方法
        async getData(){
            let _self = this
            let pram = {'uid':'515731832'}
            let par = await getmusiclist(pram)
            console.log(par)
            if (par.data.code == 200) {
                let data = par.data
                console.log(data)
                let len = data.playlist.length
                let names = []
                for(let i = 0;i<len;i++) {
                    names.push(
                        {
                            'id':data.playlist[i].id,
                            'name':data.playlist[i].name,
                            'coverImgUrl':data.playlist[i].coverImgUrl,
                            'creator':data.playlist[i].creator.nickname,
                            'trackCount':data.playlist[i].trackCount
                        }
                    )
                }
                console.log(_self.musiclists)
                _self.musiclists = names
                document.getElementById('waiting').style.display = 'none'
                return _self.musiclists 
            }  
        }
    },
    created: function (){
        this.getData()
    }
}
</script>

<style lang="less" scoped>
    ul {
        margin: 0;
        padding: 0;
    }
    #musicList {
        width: 100%;
        margin: 60px 0;
        padding: 0;
        
        .toolList {
            width: 100%;
            ul {
                list-style: none;
                li {
                    box-sizing: border-box;
                    margin-left: 15px;
                    height: 44px;
                    line-height: 44px;
                    img {
                        float: left;
                        height: 24px;
                        margin-top: 8px;
                    }
                    a {
                        padding-left: 8px;
                        color: #fff;
                        font-size: 14px;
                    }
                }
            }
        }
        .list-built {
            width: 100%;
            height: 25px;
            line-height: 25px;
            color: #fff;
            .title {
                font-size: 12px;
                padding-left: 15px;
            }
            .setting {
                display: inline-block;
                height: 25px;
                width: 25px;
                float: right;
                margin-right: 10px;
                background: url('../assets/musiclist/setting.png') no-repeat;
                background-size: auto 70%;
                background-position: 15%;
            }
            .clf {
                clear: both;
            }
        } 
        .built-drop {
            position: relative;
            width: 100%;
            .waiting {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: red;
            }
            .list {
                width: 100%;
                padding-top: 5px;
                padding-bottom: 30px;
                li {
                    width: 100%;
                    line-height: 53px;
                    height: 53px;
                    margin-bottom: 5px;
                    list-style: none;
                    display: flex;
                    overflow: hidden;
                    img {
                        width: 50px;
                        // height: 50px;
                        float: left;
                        flex:0;
                    }
                    .menu-title {
                        float: left;
                        flex:1;
                        height: 50px;
                        margin-left: 10px;
                        a {
                            display: block;
                            height: 20px;
                            width: 80%;
                            overflow: hidden;
                            line-height: 20px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            color: #fff;
                            text-decoration: none;
                            margin-top: 5px;
                        }
                        span {
                            color: #fff;
                            display: block;
                            height: 25px;
                            line-height: 25px;
                            font-size: 14px;
                        }
                    }
                    .clf {
                        clear: both;
                    }
                }
            }
        }
        .list-like {
            width: 100%;
            height: 25px;
            background: rgb(72, 185, 115);
            line-height: 25px;
            .title {
                font-size: 12px;
                padding-left: 15px;
            }
            .setting {
                display: inline-block;
                height: 25px;
                width: 25px;
                float: right;
                margin-right: 10px;
                background: url('../assets/leftpanel/out.png') no-repeat;
                background-size: auto 70%;
                background-position: 15%;
            }
            .clf {
                clear: both;
            }
        } 
        .like-drop {
            width: 100%;
            height: 100px;
        }
    }
</style>
