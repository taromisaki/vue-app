<template>
    <div id="footer" @click="detailplay">
        <div class="tool-list">
            <div class="left" v-if="isdefault">
                <img src="../../assets/footer/default.png" alt="">
                <div class="music-name">未在播放。。。</div>
            </div>
            <div class="left" v-else>
                <img alt="" v-bind:src="music.al.picUrl">
                <div class="music-name">{{music.name}}</div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
#footer {
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: #2ccad5;
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
    }
}
</style>
<script>
import {musicdetail} from '@/api/getData'
export default {
   data () {
       return {
           isdefault: true,
           music: {},
           playorpause: true
       }
   },
   methods: {
       detailplay: function () {
          // this.$router.push('/main/detailplay')
           //this.$parent.playing = true;
                this.$store.commit('_playing',true)
       },
       async detail(val) {
           let id = val
           let parm = {'ids':id}
           let data = await musicdetail(parm)
           console.log('+++++++++++++++++++++++++++++++',data)
           this.music = data.data.songs[0]
           this.isdefault = false
       }
   },
    watch: {
        store_music: {
            handler: function(val){
                this.detail(val)
            }
        }
    },
    computed: {
      //获取store中的音乐信息
      store_music() {
          return this.$store.state.musicplaying.id
      }
  },
  created: function() {
      if(this.$store.state.musicplaying.id) {
        this.detail(this.$store.state.musicplaying.id)
      }
  }
}
</script>

