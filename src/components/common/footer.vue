<template>
  <div id="footer" :class="fullshow? 'maxheight':'minheight'" @click="allscren()">
      <!-- 全屏播放界面 -->
      <!-- <transition name="fade"> -->
        <!-- <music-body v-if="fullshow"></music-body> -->
        <div style="height:calc(100% - 60px);" v-if="fullshow" class="playingbody">
            <div class="top" @click="allscren()">回退</div>
            <!-- 中间体，播放界面或歌词界面 -->
            <div class="body" style="height:calc(100% - 150px);">
               
            </div>
            <div class="bottom">
                <!-- 播放模式 -->
                <div class="playmode"></div>
                <!-- 添加到我喜欢 -->
                <div class="like"></div>
                <!-- 歌曲评论列表 -->
                <div class="comment"></div>
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
                <div class="progress" @click.stop="timeClick($event)">
                    <div class="progressbar" :style="{width:bardata.distance+'px',transition:'width '+bardata.transTime+'s'}">
                    </div>
                </div>
                <div class="bardrag" :style="{left:bardata.distance+'px'}">
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
          <audio v-bind:src="music.url" autoplay class="audio" id="audio"></audio>
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
        }
        .bottom {
            position: absolute;
            height: 60px;
            width: 100%;
            bottom: 90px;
            left: 0;
            right: 0;
            background: red;
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
            bottom: 0;
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
            left: 10px;
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
          }
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
          setTimeout(function(){
              that.$parent.fullscren = !that.$parent.fullscren
          },500)   
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
			this.$store.commit('changemusic', {'url':url,'name':musicname,'musicinfo':musicinfo})
            //音乐播放，进度条开始动
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
          var x = e.offsetX,
            moveX = x - this.bardata.distance;
          this.bardata.distance += moveX;
		  console.log(1)
        }
    },
  watch: {
      musicurl: {
        handler:function(val){
            this.isdefault = false
            this.playorpause = false
            console.log(val)
			this.music.url = val
			//如果正在播放的音乐变化，就替换data里存的音乐总时长，这是个异步过程，待优化
			let audio = document.getElementById("audio")
			this.music.duration = audio.duration
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
      console.log(this.$store.state.musiclistId)
  },
  computed: {
      //获取store中的音乐信息
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
    this.bardata.dragWidth = $('#dragbox').width();
    console.log($('#dragbox').width(),this.bardata.dragWidth)
  }
}
</script>

