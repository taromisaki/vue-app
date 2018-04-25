<template>
    <div id="footer" @click="detailplay">
        <div class="tool-list">
            <div class="left" v-if="music">
                <img src="../../assets/footer/default.png" alt="">
                <div class="music-name">未在播放。。。</div>
            </div>
            <div class="left" v-else>
                <img alt="">
                <div class="music-name">666666</div>
            </div>
            <div class="playtool" v-if="playorpause"></div>
            <div class="pausetool" v-else></div>
            <div class="menu"></div>
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
}
</style>
<script>
export default {
   data () {
       return {
           isdefault: true,
           music: {
               id:'',
               name:'',
               musicinfo:{},
               url:''
           },
           playorpause: true
       }
   },
   methods: {
       detailplay: function () {
            $('#detail-play').show()
            $('#footer').hide()
       }
   },
    watch: {
        store_music: {
            handler: function(val){
                alert(val)
                this.music = val
            }
        }
    },
    computed: {
      //获取store中的音乐信息
      store_music() {
          return this.$store.state.musicplaying
      }
  }
}
</script>

