<template>
  <div id="detail-play">
        <img v-bind:src="music.pic" alt="" class="bg-img">
      <!-- 全屏播放界面 -->
      <!-- <transition name="fade"> -->
        <!-- <music-body v-if="fullshow"></music-body> -->
        <div style="height:calc(100% - 60px);" class="playingbody maxheight-body">
            <div class="top" @click="allscren()">返回</div>
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
                <!-- 播放模式 -->
                <img class="playmode" src="../../assets/footer/sigle.png"></img>
                <!-- 添加到我喜欢 -->
                <img class="like" src="../../assets/footer/like.png"></img>
                <!-- 歌曲评论列表 -->
                <img class="comment" src="../../assets/footer/comment.png"></img>
            </div>
        </div>
      <!-- </transition> -->
      <!-- 右下角点击获取当前播放列表 -->
      <transition name="fadea">
        <div class="playinglist" v-if="listshow" @click.stop="listhide()">
          <ul>
            <li v-for="item in musiclistDetail.tracks" v-bind:music-id="item.id" @click.stop="play(item.id)">{{item.album.name}}</li>
          </ul>
        </div>
      </transition>
     
        <!-- 进度条 -->
        <div class="bor">
            <div class="dragnum dragbox" ref="dragbox" id="dragbox">
                <div class="progress" @click.stop="timeClick($event)" @touchstart.stop="touch($event)" @touchmove.stop="touchmove($event)" @touchend.stop="touchover($event)">
                    <div class="progressbar" id="progressbar" style="transition: all .3s">
                    </div>
                </div>
                <div class="bardrag" id="bardrag">
                </div>
            </div>
        </div>
        <div class="tool-list">
            <div class="playmode">
                <span></span>
                </div>
            <div class="prev"></div>
            <div class="playtool" @click.stop="musicplay()" v-if="playorpause"></div>
            <div class="pausetool" @click.stop="musicpause()" v-else></div>
            <div class="next"></div>
            <div class="menu" @click.stop="get()"></div>
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
    display: none;
    // background: red;
    background: rgba(66, 207, 177, 1);
    bottom: 0;
    .bg-img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        -webkit-filter: blur(20px); /* Chrome, Opera */
        -moz-filter: blur(20px);
            -ms-filter: blur(20px);    
                filter: blur(20px); 
    }
    .playingbody {
            position: relative;
            overflow: hidden;
        .top {
            height: 60px;
            width: 100%;
            line-height: 60px;
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
                overflow: scroll;
                text-align: center;
                position: relative;
                &::-webkit-scrollbar {
                    display: none;
                }
                .irc-wrap {
                    position: absolute;
                    top: 0;
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
            img {
                float: left;
                display: block;
                box-sizing: border-box;
                width: 20px;
                height: 20px;
            }
            .playmode {
            }
            .like {
                margin-left: 70px;
            }
            .comment {
                margin-left: 70px;
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
        .prev {
            background: url("../../assets/footer/play.png") no-repeat;
            background-size: 24px 24px;
            background-position: center;
        }
        .playtool {
            background: url("../../assets/footer/play.png") no-repeat;
            background-size: 24px 24px;
            background-position: center;
        }
        .next {
            background: url("../../assets/footer/play.png") no-repeat;
            background-size: 24px 24px;
            background-position: center;
        }
        .pausetool {
            background: url("../../assets/footer/pause.png") no-repeat;
            background-size: 24px 24px;
            background-position: center;
        }
        .menu {
            background: url("../../assets/footer/playinglist.png") no-repeat;
            background-size: 24px 24px;
            background-position: center;
        }
        div {
            flex: 1;
        }
    }
    .bor {
        height: 30px;
        width: 100%;
        position: fixed;
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

</style>
<script>
import {getmusiclistdetail} from '@/api/getData'
import {musicurl} from '@/api/getData'
import {musicdetail} from '@/api/getData'
import {lyric} from '@/api/getData'
let Child = {
  template: '<div style="height:calc(100% - 60px);"></div>'
}
export default {
  data() {
      return {
          //正在播放的音乐
          music:{
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
          lrctemp: ''
      }
  },
  components: {
      'music-body': Child,
      'lrc-temp': this.lrctemp
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
          console.log(111)
          $('#detail-play').hide()
          $('#footer').show()
      },
      //获取音乐列表信息
      async getData(id){
            let _self = this
            let pram = {'id':id}
            let par = await getmusiclistdetail(pram)
            let data = par.data
            console.log('||||||||||||||||',par)
            _self.musiclistDetail = data.result
            _self.musiclistsId = data.id
            let itemsId = _self.musiclistsId
      },
        //获取具体音乐信息并播放
        async play(musicid) {
            let _self = this
            let audio = document.getElementById("audio")
            audio.src = ''
            let id =musicid
            // let name = dom.innerHTML
            let pram = {'id':id}
            let par = await musicurl(pram)
            console.log(par)
            let url = par.data.data[0].url
            console.log(url)
            let parm = {'ids':id}
            let getmusic = await musicdetail(parm)
            console.log(getmusic)
            let musicname = getmusic.data.songs[0].name
            _self.music.name = getmusic.data.songs[0].name
            _self.music.pic = getmusic.data.songs[0].al.picUrl
			let musicinfo = getmusic.data.songs[0]
            _self.$store.commit('changemusic', {'id':id,'url':url,'name':musicname,'musicinfo':musicinfo})
            let grogressbar = document.getElementById('progressbar')
            let bardrag = document.getElementById('bardrag')
            audio.src = url
            let lyrict = await lyric(pram)
            let lyrics;
            if (!lyrict.data.nolyric) {
                lyrics = lyrict.data.lrc.lyric
                this.formatLyric(lyrics)
            }else {
                console.log('未找到相关歌词')
                //this.playing_time_arr = '未找到相关歌词'
            }
            //歌词p标签数组
            let lrcps = $('.lrcps').toArray()
            //let lrc_container = $('#irc ul')
            $('.lrcps').css({marginTop: 0})
            //存放歌词时间数据
            let wrap = $('#irc-wrap')
            let lrcArr = this.playing_lrc
            //let timeArr = this.playing_time_arr
            let timeArr = Object.create(this.playing_time_arr)
            console.log(wrap,lrcps)
            audio.addEventListener("canplaythrough", function(){
                console.log('音乐准备完毕')
                _self.isdefault = false
                _self.playorpause = false
                if (audio.readyState == 4) {
                    console.log('监听的url变化，赋值播放时间，监听时间变化')
                    var temp = timeArr, index , top = 0
                    audio.play()
                    audio.addEventListener("timeupdate", function (){
                        let now = this.currentTime
                        _self.music.duration = audio.duration
                        _self.music.currentTime = audio.currentTime 
                        grogressbar.setAttribute('style', 'width:'+audio.currentTime/audio.duration*200+'px')
                        bardrag.setAttribute('style', 'left:'+audio.currentTime/audio.duration*200+'px')
                        for (let i = 0, l = temp.length; i < l; i++) {
                            if (now/*当前播放的时间*/ >= temp[i].timepoint) {
                                index = lrcArr.indexOf(temp[i].lrcstr)
                                console.log(index)
                                $(lrcps[index]).css({color: '#fff'})
                                if (index > 0) {
                                    $(lrcps[index-1]).css({color: '#666'})
                                }
                                if (index >= 5) {
                                    top += -$(lrcps[index-1]).height()
                                    wrap.animate({top: top+'px'},500)
                                }
                                temp.splice(i,1)
                                return 0;
                            } else{
                                //console.log(now,3333,temp[i].timepoint)
                                return 0;
                            };
                        };
                    })
                }
            });
        },
        //从store获取音乐列表id并展开
        get() {
            console.log(this.listshow)
            let _self = this
            let id = this.$store.state.musiclistId
            this.getData(id)
            _self.listshow = !_self.listshow
        },
        listhide() {
            this.listshow = false
        },
        //进度条测试
        timeClick: function(e) { //点击拖动到指定位置
            console.log('点击')
            let grogressbar = document.getElementById('progressbar')
            let bardrag = document.getElementById('bardrag')
            let audio = document.getElementById("audio")
            var x = e.clientX,leftSpace = (this.phoneWidth - 200)/2
                console.log(x,leftSpace)
            this.music.currentTime = (x - leftSpace)/200*this.music.duration
            audio.currentTime = this.music.currentTime
            grogressbar.setAttribute('style', 'width:'+ x - leftSpace+'px')
            bardrag.setAttribute('style', 'left:'+ x - leftSpace +'px')
        },
        //滑动
        touch: function(e) {
            console.log('开始滑动',e)
            let audio = document.getElementById("audio")
            let grogressbar = document.getElementById('progressbar')
            let bardrag = document.getElementById('bardrag')
            var x = e.changedTouches[0].clientX;
            let leftSpace = (this.phoneWidth - this.bardata.dragWidth)/2
            let moveX = x - leftSpace;
            this.bardata.distance = moveX;
            console.log(x - leftSpace)
            audio.removeEventListener("timeupdate",function (){
                grogressbar.setAttribute('style', 'width:'+ x - leftSpace+'px')
                bardrag.setAttribute('style', 'left:'+ x - leftSpace +'px')
            })
        },
        touchmove: function (e) {
            console.log('正在滑动')
            let audio = document.getElementById("audio")
            let grogressbar = document.getElementById('progressbar')
            let bardrag = document.getElementById('bardrag')
            var x = e.changedTouches[0].clientX;
            let leftSpace = (this.phoneWidth - this.bardata.dragWidth)/2
            let moveX = x - leftSpace;
            this.bardata.distance = moveX;
            console.log(x - leftSpace)
            audio.removeEventListener("timeupdate",function (){
                grogressbar.setAttribute('style', 'width:'+ x - leftSpace+'px')
                bardrag.setAttribute('style', 'left:'+ x - leftSpace +'px')
            })
        },
        touchover: function(e) {
            console.log('滑动结束')
            let audio = document.getElementById("audio")
            let grogressbar = document.getElementById('progressbar')
            let bardrag = document.getElementById('bardrag')
            var x = e.changedTouches[0].clientX;
            console.log(x)
            let leftSpace = (this.phoneWidth - this.bardata.dragWidth)/2
            this.music.currentTime = (x - leftSpace)/200*this.music.duration
            audio.currentTime = this.music.currentTime
            grogressbar.setAttribute('style', 'width:'+ (x - leftSpace)+'px')
            bardrag.setAttribute('style', 'left:'+ (x - leftSpace) +'px')
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
                lrc_data='',
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
                    lrc_data= brr[1]
                    // 将所有键值对放入数组中
                    crr.push(data);
                    drr.push(lrc_data)
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
        }
    },
  watch: {
      musicid: {
          handler: function(val){
            let _self = this
            let id = val
            console.log(val,'考222')
            this.play(id)
        }
      }
  },
  created: function() {
      this.isdefault = true
      console.log(this.$store.state.musiclistId)
      this.phoneWidth = document.documentElement.clientWidth
  },
  computed: {
      //获取store中的音乐信息
      musicid() {
          return this.$store.state.musicplaying.id
      }
  },
  mounted: function (){ 
    //获取进度条宽度 
  },
  beforeDestroyed() {  
  } 
}
</script>

