<template>
  <div id="comment">
    <div class="head iconfont icon-icon-17" @touchend.stop="close()"></div>
	  <div class="title">全部评论</div>
	  <div class="comment-wrap">
		  <div class=" item" v-for="(item,index) in hotcomments">
        <div class="userinfo clearfix">
          <img v-bind:src="item.user.avatarUrl" alt="" class="userpic" style="width:20px">
          <p class="name">{{item.user.nickname}}</p>
        </div>
        <p class="content">{{item.content}}</p>
        <div class="bottom clearfix">
          <i class="conmunity iconfont icon-comment" v-bind:com-index="index" @touchend.stop="addcomment(item.commentId)"></i>
          <i class="like iconfont icon-xihuan" :class="addclass(item.liked)" v-bind:com-index="index" @touchend.stop="like_com(item.commentId)"></i>
        </div>
		  </div>
	  </div>
    <!-- 弹出层 -->
    <transition name="botom-alert">
    <div class="alert" v-if="alert">
      <input type="text" placeholder="发表一下你的看法呗！">
      <span class="send">发送</span>
    </div>
    </transition>
  </div>
</template>
<style lang="less" scoped>
.clearfix {
  clear: both;
  &::before {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  &::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
#comment {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
  background: #000000;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  right: 0;
  bottom: 0;
  width: 100%;
  overflow: auto;
  .head {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
  }
  .title {
    height: 40px;
    font-size: 14px;
        color: #fff;
        line-height: 40px;
  }
  .comment-wrap {
    .item {
      padding-left: 10px;
      margin-top: 10px;
      .userinfo {
        .userpic {
          float: left;
          width: 20px;
          border-radius: 50%;
        }
        .name {
          float: left;
          font-size: 12px;
          color: #fff;
          line-height: 20px;
          padding-left: 5px;
        }
      }
      .content {
        margin-top: 10px;
        padding-left: 20px;
        font-size: 14px;
        color: #fff;
        padding-right: 30px;
      }
      .bottom {
        margin-top: 10px;
        i {
          float: right;
          color: #fff;
          font-size: 12px;
          font-style: normal;
          margin-right: 30px;
          display: inline-block;
          height: 14px;
          width: 14px;
        }
        .liked {
          color: red;
        }
      }
    }
  }
  .alert {
    width: 100%;
    height: 30px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #232526;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    display: none;
    input {
      width: 80%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      float: left;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      border-radius: 4px;
      border: 0;
      outline: none;
    }
    .send {
      float: right;
      line-height: 30px;
      font-size: 14px;
      width: 20%;
      text-align: center;
      color: #fff;
    }
  }
}
.botom-alert-enter-active, .botom-alert-leave-active {
  transition: all .5s ease-in-out
}
.botom-alert-enter, .botom-alert-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform:alert-in-out;
  opacity: 0;
}
@keyframes alert-in-out{
    0% {top: 100%;opacity: 0;}
    100% {top: 0;opacity: 1;}
}
</style>

<script>
import { songcomment } from "@/api/getData";
import { likecomment } from "@/api/getData";
export default {
  data() {
    return {
      playing: '',
      comments: [],
      hotcomments: [],
      total:'',
      alert: false
    };
  },
  methods: {
    async getComment(data) {
      let parm = {id:data};
      let get_comment = await songcomment(parm)
      console.info(get_comment)
      this.comments = get_comment.data.comments
      this.hotcomments = get_comment.data.hotComments
      this.total =  get_comment.data.total
    },
    close: function () {
      this.$parent.commentshow = false;
    },
    addclass: function(val) {
      return val?'liked':''
    },
    async like_com(id){
      console.log('点赞',$(event.currentTarget))
      let tof,index=$(event.currentTarget).attr('com-index'),_self = this
      if (!$(event.currentTarget).hasClass('liked')) {
        tof = 1
      }else {
        tof = 0
      }
      console.log(tof)
      let result = await likecomment({'id':_self.playing,'cid':id,'t':tof,'type':'0'})
      console.log(result.data)
      if (result.data.code == 301) {
        // $(event.currentTarget).addClass('liked')
        _self.hotcomments[index].liked = true
      }
    },
    async addcomment(id) {
      console.log('评论')
      //this.alert = true
    }
  },
  mounted :function(){
      this.playing = this.$store.state.musicplaying.id
      this.getComment(this.$store.state.musicplaying.id)
  },
  watch: {
      musicid: {
          handler: function(val){
            let _self = this
            let id = val
            _self.playing = id
            this.getComment(id)
        }
      }
  },
  computed: {
      //获取store中的音乐信息
      musicid() {
          return this.$store.state.musicplaying.id
      }
  },
};
</script>

