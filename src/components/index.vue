<template>
  <div class="hello">
    <comheader ></comheader>
      <transition name="bounce">
        <LeftPanel v-show="componentsChange.leftpanelshow"></LeftPanel>
      </transition>

      <div v-if="fullscren" keep-alive>
        <transition name="fade">
        <musicList v-if="componentsChange.musiclistshow" keep-alive></musicList>
        <musiclistdetail v-if="componentsChange.musiclistdetailshow" keep-alive></musiclistdetail>
      </transition>
      </div>
      <comfooter keep-alive></comfooter>
      <!-- <div class="mask" v-if="show"></div> -->
  </div>
    
</template>

<script>
import LeftPanel from '@/components/LeftPanel'
import musicList from '@/components/MusicList'
import musiclistdetail from '@/components/musiclistdetail'
import comheader from '@/components/common/header'
import comfooter from '@/components/common/footer'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      //定义变量保存管理各组件的显示与隐藏
      componentsChange: {
        //主页左侧的栏
        leftpanelshow: false,
        //主页歌单隐藏
        musiclistshow: true,
        //歌单详情
        musiclistdetailshow: false

      },
      //正在播放的音乐
      musicplaying:'',
      //全屏播放时其他组件的状态（渲染还是不渲染）
      fullscren: true
    }
  },
  components: {
    LeftPanel,
    musicList,
    musiclistdetail,
    comheader,
    comfooter
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.clf {
  clear: both;
}
</style>

<style scoped>
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
