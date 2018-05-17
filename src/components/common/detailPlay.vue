<template>
  <div id="detail-play" keep-alive>
        <img v-bind:src="music.pic" alt="" class="bg-img">
      <!-- 全屏播放界面 -->
      <!-- <transition name="fade"> -->
        <!-- <music-body v-if="fullshow"></music-body> -->
        <div class="playingbody maxheight-body" style="height:calc(100% - 60px);">
            <div class="top">
                <span @click.stop="allscren()" class="back">返回</span>
                <span class="name">{{music.name}}</span>
            </div>
            <!-- 中间体，播放界面或歌词界面 -->
            <div class="body" style="height:calc(100% - 150px);">
                <img v-bind:src="music.pic" alt="" class="Rotation">
                <div class="irc" id="irc">
                   <div class="irc-wrap" id="irc-wrap">
                       <!-- <p v-for="lrc in playing_time_arr" class="lrcps" style="font-size: 8px; line-height: 20px; width: 200px; margin: 0 auto; color: #666" v-bind:time-data="lrc.timepoint">{{lrc.lrcstr}}</p> -->
                   </div>
                    <!-- <ul>
                        <li class="lrcps" v-for="node in playing_time_arr" v-bind:timepoint="node.lrcstr">{{node.lrcstr}}</li>
                    </ul> -->
               </div>
            </div>
            <div class="bottom">
                <!-- 添加到我喜欢 -->
                <i class="iconfont icon-icon-7" @click.stop="like(music.id)"></i>
                <!-- 歌曲评论列表 -->
                <i class="iconfont icon-icon-24" @touchend.stop="comment()"></i>
            </div>
        </div>
      <!-- </transition> -->
      <!-- 右下角点击获取当前播放列表 -->
      <transition name="fadea">
        <div class="playinglist" v-if="listshow" @click.stop="listhide()">
          <ul>
            <li v-for="item in musiclistDetail.tracks" v-bind:music-id="item.id" @click.stop="play(item.id)">{{item.name}}</li>
          </ul>
        </div>
      </transition>
      <!-- 评论? -->
      <transition name="comment">
      <comment v-if="commentshow" keep-alive></comment>
      </transition>
        <!-- 进度条 -->
        <div class="bor">
            <div class="dragnum dragbox" ref="dragbox" id="dragbox">
                <div class="progress" @click.stop="timeClick($event)">
                    <div class="progressbar" id="progressbar" v-bind:style="{transition: 'all .3s',width:this.music.currentTime/this.music.duration*200+'px'}">
                    </div>
                </div>
                <div class="bardrag" id="bardrag" v-bind:style="{left:this.music.currentTime/this.music.duration*200+'px'}">
                </div>
            </div>
        </div>
        <div class="tool-list">
            <div class="playmode iconfont" :class="changeclass(mode)" @click.stop="modechange()"></div>
            <div class="prev iconfont icon-icon-17" @click.stop="pre()"></div>
            <div class="playtool iconfont icon-icon-13" @click.stop="musicplay()" v-if="playorpause"></div>
            <div class="pausetool iconfont icon-icon-18" @click.stop="musicpause()" v-else></div>
            <div class="next iconfont icon-icon-15" @click.stop="next()"></div>
            <div class="menu iconfont icon-icon-1" @click.stop="get()"></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
//播放栏是否全屏

.minheight {
    transition:  all 0.5s;
    height: 60px;
}
.maxheight-body {
    transition:  all 0.5s;
    //height: calc(100% - 60px);
    top: 0;
    overflow: hidden;
    opacity: 1;
}
.minheight-body {
    transition:  all 0.5s;
    top: 100%;
    opacity: 0;
}
//播放栏是否因为播放列表变样式
.listshow {
    transition:  all 0.5s;
    height: 60%;
}
.listhide {
    transition:  all 0.5s;
    height: 60px;
}
#detail-play {
    position: fixed;
    // height: 60px;
    height: 100%;
    width: 100%;
    // background: red;
    background: rgba(66, 207, 177, 1);
    bottom: 0;
        z-index: 1001;
    .bg-img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        -webkit-filter: blur(50px); /* Chrome, Opera */
        -moz-filter: blur(50px);
            -ms-filter: blur(50px);    
                filter: blur(50px); 
    }
    .playingbody {
        position: relative;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.6);
        .top {
            position: relative;
            height: 60px;
            width: 100%;
            line-height: 60px;
            text-align: center;
            .back {
                position: absolute;
                left: 15px;
                top: 0;
                color: #fff;
            }
            .name {
                color: #fff;
            }
        }
        .body {
            width: 100%;
            padding-top: 50px;
            @-webkit-keyframes rotation {
                from {-webkit-transform: rotate(0deg);}
                to {-webkit-transform: rotate(360deg);}
            }
            .Rotation{
                -webkit-transform: rotate(360deg);
                animation: rotation 10s linear infinite;
                -moz-animation: rotation 10s linear infinite;
                -webkit-animation: rotation 10s linear infinite;
                -o-animation: rotation 10s linear infinite;
                display: block;
                width: 150px;
                height: 150px;
                margin: 0 auto;
                border: 1px;
                border-radius: 50%;
            }
            .irc {
                width: 100%;
                height: 200px;
                margin-top: 20px;
                overflow: scroll;
                text-align: center;
                position: relative;
                &::-webkit-scrollbar {
                    display: none;
                }
                .irc-wrap {
                    position: absolute;
                    //top: 20px;
                    left: 50%;
                    margin-left: -100px;
                }
                p {
                    // line-height: 16px;
                    // font-size: 12px;
                    //position: absolute;
                    //top: 0;
                    font-size: 8px; 
                    line-height: 20px;
                    width: 200px; 
                    margin: 0 auto;
                    color: #666;
                }
                .active {
                    color: #fff;
                }
            }
        }
        .bottom {
            position: absolute;
            height: 30px;
            width: 200px;
            bottom: 30px;
            left: 50%;
            right: 0;
            margin-left: -100px;
            box-sizing: border-box;
            display: flex;
            i {
                box-sizing: border-box;
                flex: 1;
                text-align: center;
                font-size: 20px;
                line-height: 30px;
                color: #fff;
            }
        }
    }
    .playinglist {
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        width: 100%;
        position: fixed;
        bottom: 0;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        padding-top: 70%;
        overflow: hidden;
        z-index: 1000;
        ul {
            background: rgb(27, 193, 199);
            overflow: scroll;
            height: 300px;
            padding: 0;
            margin: 0;
            position: absolute;
            bottom: 60px;
            left: 0;
            right: 0;
        }
        li {
            box-sizing: border-box;
            list-style: none;
            color: #fff;
            font-size: 12px;
            line-height: 30px;
            height:30px;
            max-width: 80%;
            margin-left: 5px;
            margin-top: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .tool-list {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        width: 100%;
        display: flex;
        background: #305776;
        .playmode {
            span {
                display: block;
                height: 24px;
                width: 24px;
                line-height: 24px;
                font-size: 12px;
                margin: 18px auto;
                border: 1px solid #fff;
                border-radius: 6px;
                box-sizing: border-box;
            }

        }
        div {
            flex: 1;
            font-size: 20px;
            line-height: 60px;
            text-align: center;
            color: #fff;
        }
    }
    .bor {
        height: 30px;
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 60px;
        background: rgba(22, 22, 22, 0.3);
        //测试进度条
        .dragbox {
            width: 200px;
            position: relative;
            height: 5px;
            background-color: #f5f5f5;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
            margin: 12.5px auto;
        }
        .progress {
            background: #a7a7a7;
            margin-bottom: 0px;
            height: 5px;
            overflow: hidden;
            border-radius: 2px;
            -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        }

        .progressbar {
            background-color: #337ab7;
            float: left;
            width: 0;
            height: 100%;
            font-size: 12px;
            line-height: 20px;
            color: #fff;
            text-align: center;
            -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
            box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
            -webkit-transition: width .6s ease;
            -o-transition: width .6s ease;
            transition: width .6s ease;
        }

        .bardrag {
            position: absolute;
            top: -3px;
            display: inline-block;
            height: 10px;
            width: 10px;
            background-color: #337ab7;
            border: 1px solid #e1e0de;
            border-radius: 10px;
            cursor: e-resize;
        }

        .dragnum {
            // display: inline-block;
            // vertical-align: middle;
        }

        .nowbar {
            margin-top: 10px;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-in-out
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform:rotateY(180deg);
  opacity: 0;
}
.fadea-enter-active, .fadea-leave-active {
  transition: all .5s ease-in-out
}
.fadea-enter, .fadea-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform:rotateY(180deg);
  opacity: 0;
}
.comment-enter-active, .comment-leave-active {
  transition: all .5s ease-in-out
}
.comment-enter, .comment-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform:comment-in-out;
  opacity: 0;
}
@keyframes comment-in-out{
    0% {top: 100%;opacity: 0;}
    100% {top: 0;opacity: 1;}
}
</style>
<script>
import comment from '@/components/common/comment'
import {getmusiclistdetail} from '@/api/getData'
import {musicurl} from '@/api/getData'
import {musicdetail} from '@/api/getData'
import {lyric} from '@/api/getData'
import { likemusic } from "@/api/getData"
let Child = {
  template: '<div style="height:calc(100% - 60px);"></div>'
}
export default {
  data() {
      return {
          //正在播放的音乐
          music:{
            id:'',
            name: '',
            url: '',
			pic: '',
			duration: '',//歌曲总时间
			currentTime: ''//歌曲播放进度
          },
          //当前手机宽度，用于计算滚动条
          phoneWidth: '',
          //判断初始状态，未在播放
          isdefault: true,
          //控制播放或暂停时渲染的元素
          playorpause: true,
          //播放列表是否展开
          listshow: false,
          //评论列表
          commentshow: false,
          //存储正在播放的音乐列表的各音乐id
          musiclistsId: [],
          //存储音乐列表具体信息
          musiclistDetail:{},
          //以下是进度条测试data
          bardata : {
            pos: {},
            startX: null,
            locked: false,
            distance: 0, //当前位置
            endDistance: 0, //上次操作结束位置
            transTime: .3, //点击拖动动画
            dragWidth: 0 //进度条宽度
          },
          timeDuration: null,
          timeNow: null,
          //正在播放的歌曲的歌词，包括每句歌词出现的时间
          playing_time_arr: [],
          playing_lrc: [],
          //歌词模板
          lrctemp: '',
          //播放模式: 1代表列表循环，2代表随机，3代表单曲
          mode: 1
      }
  },
  components: {
      'music-body': Child,
      'lrc-temp': this.lrctemp,
      'comment': comment
  },
  methods: {
      //暂停
      musicpause() {
          this.playorpause = true
          let dom = document.getElementById('audio')
          dom.pause()
      },
      //播放
      musicplay() {
          this.playorpause = false
          let dom = document.getElementById('audio')
          dom.play()
      },
      //是否全屏展开播放栏
      allscren(e) {
          //this.$parent.playing = false
          this.$store.commit('_playing',false)
      },
      //获取音乐列表信息
      async getData(id){
            let _self = this
            let pram = {'id':id}
            let par = await getmusiclistdetail(pram)
            let data = par.data
            _self.musiclistDetail = data.result
            let idsArr = []
            for (let item of data.result.tracks) {
                idsArr.push(item.id)
            }
            _self.musiclistsId = idsArr
            let itemsId = _self.musiclistsId
      },
        //获取具体音乐信息并播放
        async play(musicid) {
            let audio = this.$parent.$refs.audio
            // audio.removeEventListener("canplaythrough")
            // audio.removeEventListener("timeupdate")
            let _self = this
            //audio.src = ''
            //$('#audio').remove()
            let id =musicid
            // let name = dom.innerHTML
            let pram = {'id':id}
            let par = await musicurl(pram)
            let url = par.data.data[0].url
            if (!url) {
                console.log('无连接')
                _self.$store.commit('changemusic', {'id':id})
                _self.next()
                return '该歌曲暂不支持播放'
            }else {
                let parm = {'ids':id}
                let getmusic = await musicdetail(parm)
                console.log(getmusic)
                let musicname = getmusic.data.songs[0].name
                _self.music.id = getmusic.data.songs[0].id
                _self.music.name = musicname
                _self.music.pic = getmusic.data.songs[0].al.picUrl
                let musicinfo = getmusic.data.songs[0]
                _self.$store.commit('changemusic', {'id':id,'url':url,'name':musicname,'musicinfo':musicinfo})
                let grogressbar = document.getElementById('progressbar')
                let bardrag = document.getElementById('bardrag')
                //let audiostr = '<audio src='+url+' id="audio"></audio>'
                //$('body').append(audiostr) 
                $(audio).attr('src',url)
                let lyrict = await lyric(pram)
                let lyrics;
                if (lyrict.data.lrc) {
                    lyrics = lyrict.data.lrc.lyric
                    this.formatLyric(lyrics)
                }else {
                    console.log('未找到相关歌词') 
                    this.playing_time_arr = []
                    let irccon = document.getElementById('irc-wrap')
                    irccon.innerHTML = '<p class="lrcps" style="font-size: 8px; line-height: 20px; width: 200px; margin: 0 auto; color: #fff">未找到相关歌词</p>'
                }
                //歌词p标签数组
                let lrcps = $('.lrcps').toArray()
                //let lrc_container = $('#irc ul')   
                $('.lrcps').css({marginTop: 0})
                //存放歌词时间数据
                let father_wrap =  $('#irc')
                let wrap = $('#irc-wrap')
                let lrcArr = this.playing_lrc
                //let timeArr = this.playing_time_arr
                //深拷贝
                let timeArr = Object.create(this.playing_time_arr)
                console.log($(document.getElementsByTagName('audio')))
                $(audio).one("canplaythrough", function(){
                    console.log('音乐准备完毕')
                    _self.isdefault = false
                    _self.playorpause = false
                    if (audio.readyState == 4) {
                        console.log('监听的url变化，赋值播放时间，监听时间变化')
                        var temp = timeArr, index , top = 0
                        audio.play()
                        $(audio).on("timeupdate", function (){
                            let now = this.currentTime
                            _self.music.duration = audio.duration
                            _self.music.currentTime = audio.currentTime 
                            if (temp !== []) {
                                for (let i = 0, l = temp.length; i < l; i++) {
                                    if (now/*当前播放的时间*/ >= temp[i].timepoint) {
                                        console.log(temp[i].timepoint)
                                        index = lrcArr.indexOf(temp[i].timepoint)
                                        $(lrcps[index]).css({color: '#fff'})
                                        if (index > 0) {
                                            $(lrcps[index-1]).css({color: '#666'})
                                        }
                                        if (index >= 5) {
                                            top += -$(lrcps[index-1]).height()
                                            wrap.animate({'top': top+'px'},100)
                                        }
                                        temp.splice(i,1)
                                        return 0;
                                    } else{
                                        return 0;
                                    };
                                };
                            }
                        })
                    }
                });
                audio.addEventListener("ended",function(){
                    if(_self.mode == 3) {
                        this.play(id)
                    }else {
                        _self.next()
                    }
                })
            }
        },
        //从store获取音乐列表id并展开
        get() {
            console.log(this.listshow)
            let _self = this
            let id = this.$store.state.musiclistId
            this.getData(id)
            _self.listshow = !_self.listshow
        },
        //给音乐点赞
        async like(id) {
            let parm = {'id':id,'like':true}
            let result = await likemusic(parm)
            console.log(result)
        },
        listhide() {
            this.listshow = false
        },
        //进度条测试
        timeClick: function(e) { //点击拖动到指定位置
            console.log('点击')
            let audio = document.getElementById("audio")
            var x = e.clientX,leftSpace = (this.phoneWidth - 200)/2
                console.log(x,leftSpace)
            this.music.currentTime = (x - leftSpace)/200*this.music.duration
            audio.currentTime = this.music.currentTime
        },
        //TODO
        //滑动
        touchstart: function(e) {
            console.log('开始滑动',e)
            e.preventDefault();
            let audio = document.getElementById("audio")
            var x = e.changedTouches[0].clientX;
            let leftSpace = (this.phoneWidth - this.bardata.dragWidth)/2
            let moveX = x - leftSpace;
            this.bardata.distance = moveX;
            console.log(x - leftSpace)
            this.music.currentTime = (x - leftSpace)/200*this.music.duration
        },
        touchmove: function (e) {
            console.log('正在滑动')
            let audio = document.getElementById("audio")
            var x = e.changedTouches[0].clientX;
            let leftSpace = (this.phoneWidth - this.bardata.dragWidth)/2
            let moveX = x - leftSpace;
            this.bardata.distance = moveX;
            console.log(x - leftSpace)
            this.music.currentTime = (x - leftSpace)/200*this.music.duration
        },
        touchover: function(e) {
            console.log('滑动结束')
            let audio = document.getElementById("audio")
            var x = e.changedTouches[0].clientX;
            console.log(x)
            let leftSpace = (this.phoneWidth - this.bardata.dragWidth)/2
            this.music.currentTime = (x - leftSpace)/200*this.music.duration
            audio.currentTime = this.music.currentTime
        },
        //歌词时间转换
        formatLyricTime: function(str) {
            var arr=str.split(":");
            var second=0;
            if (arr.length==3) {
                second=-(-arr[0]*3600-arr[1]*60-arr[2]);
            } else {
                second=-(-arr[0]*60-arr[1]);
            }
            return second.toFixed(3);
        },
        //格式化歌词
        formatLyric: function(str) {
            var arr=[],
                brr=[],
                crr=[],
                data={},
                //lrc_data='',
                drr=[];

            // 将字符串按“\n” 分割成数组
            arr=str.split("\n");
            // 去除最后一个空格
            arr.splice(-1,1);
            // 存入crr数组中
            for (var i=0;i<arr.length;i++) {
                // 将字符串按“]” 分割成数组
                brr=arr[i].split("]");
                // 匹配歌词时间，排除歌词附加信息 eg: "by:Treckiefans"
                // /^(\d+:){1,2}\d+\.?\d+$/g  match 00:02 || 00:00:03 || 00:00:05.2
                if (!!/^(\d+:){1,2}\d+\.?\d+$/g.test(brr[0].substring(1)) && brr[1] !== '') {
                    data={
                        "timepoint":this.formatLyricTime(brr[0].substring(1)),
                        "lrcstr":brr[1]
                    };
                    //lrc_data= brr[1]
                    // 将所有键值对放入数组中
                    crr.push(data);
                    drr.push(data.timepoint)
                } else {
                    // 歌词贡献者信息，暂不处理 "by:Treckiefans"
                }
            }
            console.log('处理后的',crr)
            this.playing_time_arr = crr
            this.playing_lrc = drr
            
            let irccon = document.getElementById('irc-wrap'),
                template = '';
            for (let p = 0; p < crr.length; p++) {
                template += '<p class="lrcps" style="font-size: 8px; line-height: 20px; width: 200px; margin: 0 auto; color: #666" time-data="'+crr[p].timepoint+'">'+crr[p].lrcstr+'</p>'
            }
            irccon.innerHTML = template
        },
        comment: function () {
            this.commentshow = !this.commentshow
        },
        next: function (){
            console.log('下一曲')
            let arr = this.musiclistsId
            let now = this.music.id
            console.log(arr,'+++++++++++++++++++++++++++++++++++++',now)
            for (let i = 0;i < arr.length; i++) {
                if (now == arr[i]) {
                    console.log(arr[i])
                    this.play(arr[i+1])
                    return
                } 
            }
        },
        pre: function (){
            console.log('上一曲')
            let arr = this.musiclistsId
            let now = this.music.id
            console.log(arr,'+++++++++++++++++++++++++++++++++++++',now)
            for (let i = 0;i < arr.length; i++) {
                if (now == arr[i]) {
                    console.log('222')
                    this.play(arr[i-1])
                    return
                } 
            }
        },
        //播放模式
        modechange: function (){
            this.mode += 1
            if (this.mode > 3) {
                this.mode = 1
            }
            if (this.mode == 2) {
                this.arrChange()
            }
        },
        arrChange: function (){
            let arr = this.musiclistsId
            arr.sort(function() {
                return (0.5-Math.random());
            })
            this.musiclistsId = arr
        },
        changeclass: function(val){
            switch (val) {
                case 1 :
                    return 'icon-icon-20';
                    break;
                case 2 : 
                    return 'icon-icon-22';
                    break;
                case 3: 
                    return 'icon-icon-19';
                    break;  
            }

        }
    },
  watch: {
      musicid: {
          handler: function(val){
            let _self = this
            let id = val
            if(this.music.id == id) {
                return
            }else {
                this.music.id = id
                console.log(val,'考222')
                this.play(id)
            }
        }
      },
      listid: {
          handler: function(val){
            let _self = this
            this.getData(val)
        }
      }
  },
  created: function() {
      this.isdefault = true
      console.log(this.$store.state.musiclistId)
      this.phoneWidth = document.documentElement.clientWidth
      
                this.play(this.$store.state.musicplaying.id)
  },
  computed: {
      //获取store中的音乐信息
      musicid() {
          return this.$store.state.musicplaying.id
      },
      listid() {
          return this.$store.state.musiclistId
      }
  },
  mounted: function (){ 
    //获取进度条宽度 
  },
  beforeDestroyed() {  
  } 
}
</script>

