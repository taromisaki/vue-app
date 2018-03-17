<template>
  <div id="footer" :class="fullshow? 'maxheight':'minheight'" @click="allscren()">
      <!-- 全屏播放界面 -->
      <!-- <transition name="fade"> -->
        <!-- <music-body v-if="fullshow"></music-body> -->
        <div style="height:calc(100% - 60px);" v-if="fullshow" class="playingbody">
            <div class="top" @click="allscren()">回退</div>
            <!-- 中间体，播放界面或歌词界面 -->
            <div class="body" style="height:calc(100% - 150px);">
               <img v-bind:src="music.pic" alt="" class="Rotation">
               <div class="irc" id="irc">

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
            <li v-for="item in musiclistDetail.tracks" v-bind:music-id="item.id" @click.stop="play">{{item.name}}</li>
          </ul>
        </div>
      </transition>
     
        <!-- 进度条 -->
        <div class="bor" v-show="fullshow">
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
          <div class="left" v-if="isdefault">
            <img src="../../assets/footer/default.png" alt="">
            <div class="music-name">未在播放。。。</div>
          </div>
          <div class="left" v-else>
            <img v-bind:src="music.pic" alt="">
            <div class="music-name">{{music.name}}</div>
          </div>
          <audio autoplay class="audio" id="audio" ref='player'></audio>
          <div class="playtool" @click.stop="musicplay()" v-if="playorpause"></div>
          <div class="pausetool" @click.stop="musicpause()" v-else></div>
          <div class="menu" @click.stop="get()"></div>
      </div>
  </div>
</template>
<style lang="less" scoped>
//播放栏是否全屏
.maxheight {
    transition:  all 0.5s;
    height: 100%;
}
.minheight {
    transition:  all 0.5s;
    height: 60px;
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
#footer {
    position: fixed;
    // height: 60px;
    // height: 100%;
    width: 100%;
    // background: red;
    background: rgba(66, 207, 177, 1);
    bottom: 0;
    .playingbody {
        .top {
            height: 60px;
            width: 100%;
        }
        .body {
            width: 100%;
            background: olivedrab;
            padding-top: 50px;
            img {
                display: block;
                width: 150px;
                height: 150px;
                margin: 0 auto;
                border: 1px;
                border-radius: 50%;
            }
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
            }
        }
        .bottom {
            position: absolute;
            height: 30px;
            width: 200px;
            bottom: 90px;
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
            width: calc(100% - 5px);
            margin-left: 5px;
            margin-top: 5px;
        }
    }
    .tool-list {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        width: 100%;
        img {
            height: 40px;
            width: 40px;
            float: left;
            margin: 10px 5px;
            border: 1px;
            border-radius: 50%;
        }
        .music-name {
            box-sizing: border-box;
            padding-left: 10px;
            width: 220px;
            height: 60px;
            font-size: 8px;
            float: left;
            color: #fff;
            line-height: 60px;
        }
        .audio {
            width: 0;
            height: 0;
            float: left;
        }
        .playtool {
            float: left;
            width: 24px;
            height: 24px;
            background: url("../../assets/footer/play.png") no-repeat;
            background-size: 100% auto;
            margin: 18px 0;
        }
        .pausetool {
            float: left;
            width: 24px;
            height: 24px;
            background: url("../../assets/footer/pause.png") no-repeat;
            background-size: 100% auto;
            margin: 18px 0;
        }
        .menu {
            float: right;
            width: 24px;
            height: 24px;
            background: url("../../assets/footer/playinglist.png") no-repeat;
            background-size: 100% auto;
            margin: 18px 12px;
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
          //是否全屏展开播放栏
          fullshow: false,
          //播放列表是否展开
          listshow: false,
          //存储正在播放的音乐列表的各音乐id
          musiclistsId: [],
          //存储音乐列表具体信息
          musiclistDetail:{},
          //进度条是否工作
          isborgo: false,
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
          timeNow: null
      }
  },
  components: {
      'music-body': Child
  },
  methods: {
      //暂停
      musicpause() {
          console.log(11)
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
          this.fullshow = !this.fullshow
          this.listshow = false
          let that = this
        //   setTimeout(function(){
        //       that.$parent.fullscren = !that.$parent.fullscren
        //   },500)   
      },
      //获取音乐列表信息
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
        //获取具体音乐信息并播放
        async play() {
            let _self = this
            _self.isborgo = true
            let audio = document.getElementById("audio")
            audio.src = ''
            let dom = event.currentTarget
            let musicname = dom.innerText
            let id = dom.getAttribute("music-id")
            // let name = dom.innerHTML
            console.log(musicname,id)
            let pram = {'id':id}
            let par = await musicurl(pram)
            console.log(par)
            let url = par.data.data[0].url
            console.log(url)
            let parm = {'ids':id}
            let getmusic = await musicdetail(parm)
            console.log(getmusic)
			let musicinfo = getmusic.data.songs[0]
            _self.$store.commit('changemusic', {'id':id,'url':url,'name':musicname,'musicinfo':musicinfo})
            
            let grogressbar = document.getElementById('progressbar')
            let bardrag = document.getElementById('bardrag')
            audio.src = url
            audio.addEventListener("canplaythrough", function(){
                console.log('音乐准备完毕')
                _self.isdefault = false
                if (audio.readyState == 4) {
                    console.log('监听的url变化，赋值播放时间，监听时间变化')
                    audio.play()
                    audio.addEventListener("timeupdate", function (){
                        _self.music.duration = audio.duration
                        _self.music.currentTime = audio.currentTime 
                        grogressbar.setAttribute('style', 'width:'+audio.currentTime/audio.duration*200+'px')
                        bardrag.setAttribute('style', 'left:'+audio.currentTime/audio.duration*200+'px')
                    })
                }
            });
            
            //音乐播放，进度条开始动
            _self.isborgo = true
            let lyrict = await lyric(pram)
            // let exp =  new RegExp("/\[\d{2}:\d{2}:\d{2}\]/g")
            // let exp =  new RegExp("/\[\d{2}:\d{2}:\d{2}\]/g")
            let lyrics = lyrict.data.lrc.lyric.split('\n')
            console.log(lyrics);
            var lrcObj = {};
            for(var i=0;i<lyrics.length;i++){
                var lyrica = decodeURIComponent(lyrics[i]);
                var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                var timeRegExpArr = lyrica.match(timeReg);
                if(!timeRegExpArr)continue;
                var clause = lyrica.replace(timeReg,'');
                for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                    var t = timeRegExpArr[k];
                    var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                        sec = Number(String(t.match(/\:\d*/i)).slice(1));
                    var time = min * 60 + sec;
                    lrcObj[time] = clause;
                }
            }
            console.log(lrcObj)
            let irccon = document.getElementById('irc')
            // lines.replace(exp,function(){
            //     let min = arguments[1] | 0, //分
            //     sec = arguments[2] | 0, //秒
            //     realMin = min * 60 + sec; //计算总秒数

            //     lrcTimeArray.push(realMin);
            // })
            // lines.replace(/[dd:dd.dd]/g,"")
            // console.log(lyrics)
            console.log('动了')
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
        async publicplay(val) {
            let _self = this
            let id = val
            let pram = {'id':id}
            let par = await musicurl(pram)
            let url = par.data.data[0].url
            let audio = document.getElementById("audio")
            audio.src = ''
            let grogressbar = document.getElementById('progressbar')
            let bardrag = document.getElementById('bardrag')
            audio.src = url
            audio.addEventListener("canplaythrough", function(){
                console.log('音乐准备完毕')
                _self.isdefault = false
                if (audio.readyState == 4) {
                    console.log('监听的url变化，赋值播放时间，监听时间变化')
                    audio.play()
                    audio.addEventListener("timeupdate", function (){
                        _self.music.duration = audio.duration
                        _self.music.currentTime = audio.currentTime 
                        grogressbar.setAttribute('style', 'width:'+audio.currentTime/audio.duration*200+'px')
                        bardrag.setAttribute('style', 'left:'+audio.currentTime/audio.duration*200+'px')
                    })
                }
            });
        }
    },
  watch: {
      musicid: {
          handler: function(val){
            let _self = this
            let id = val
            console.log(val,'考222')
            this.publicplay(id)
        }
      },
      musicurl: {
        handler:function(val){
            this.isdefault = false
            this.playorpause = false
            console.log(val)
			//this.music.url = val
            //如果正在播放的音乐变化，就替换data里存的音乐总时长，这是个异步过程，待优化
            let audio = document.getElementById("audio")
            if (audio.onplay) {
                console.log(audio.duration)
                this.music.duration = audio.duration
                this.music.currentTime = audio.currentTime
            }
        }
      },
      musicname: {
          handler:function(val){
            console.log(val)
            this.music.name = val
        }
      },
      musicpic: {
          handler:function(val){
            console.log(val)
            this.music.pic = val
        }
      },
      //监听进度条是否需要开始工作
      borgoing: {
          handler:function(val){
            console.log(val)
            this.isborgo = val
            if (this.isborgo == true){
                // setInterval(this.zouba,1000)
                console.log('进度条可以开始动了')
            }
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
      },
      musicurl() {
          return this.$store.state.musicplaying.url
      },
      musicname() {
          return this.$store.state.musicplaying.name
      },
      musicpic() {
          return this.$store.state.musicplaying.musicinfo.al.picUrl
      },
      //获取vuex里其他组件传过来的决定进度条是否工作的变量
      borgoing () {
          return this.$store.state.borgo
      }
  },
  mounted: function (){ 
    //获取进度条宽度 
  },
  beforeDestroyed() {  
  } 
}
</script>

