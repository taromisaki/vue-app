<template>
  <div class="hello">
   <transition :name="transitionName"> 
  <router-view class="Router"></router-view>
  </transition>
  <transition name="bounce"> 
  <LeftPanel v-show="componentsChange.leftpanelshow">
  </LeftPanel>
  </transition>
  <detailplay v-show="playing"></detailplay>
      <audio id="audio" ref="audio"></audio>
      <!-- <div class="mask" v-if="show"></div> -->
  </div>
    
</template>

<script>
import LeftPanel from '@/components/LeftPanel'
import search from '@/components/common/search'
import musicList from '@/components/MusicList'
import musiclistdetail from '@/components/musiclistdetail'
import comfooter from '@/components/common/footer'
import detailplay from '@/components/common/detailPlay'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      //定义变量保存管理各组件的显示与隐藏
      componentsChange: {
        //主页左侧的栏
        leftpanelshow: false
      },
      //正在播放的音乐
      musicplaying:'',
      //全屏播放时其他组件的状态（渲染还是不渲染）
      fullscren: true,
      playing: '',
      transitionName: ''
    }
  },
  components: {
    LeftPanel,
    search,
    musicList,
    musiclistdetail,
    comfooter,
    detailplay
  },
  methods: {
  },
  computed: {
      //获取store中的音乐信息
      _playing() {
          return this.$store.state.playing
      }
  },
  watch: {
      _playing: {
          handler: function(val){
            let _self = this
            _self.playing = val
        }
      },
      '$route' (to, from) {  
        if(to.path == '/main/musiclist'){  
          console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
          this.transitionName = 'slide-right';  
        }else{  
          this.transitionName = 'slide-left';  
        }  
      }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.clf {
  clear: both;
}
.Router {
     position: absolute;
     width: 100%;
     transition: all .5s ease;
}

.slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
</style>

<style scoped>
.hello {
  height: 100%;
  width: 100%;
}
.mask {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.bounce-enter-active {
  animation: bounce-in 0.3s linear;
}
.bounce-leave-active {
  animation: bounce-in 0.3s linear reverse;
}
@keyframes bounce-in {
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-in-out
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform:rotateY(180deg);
  opacity: 0;
}
</style>
