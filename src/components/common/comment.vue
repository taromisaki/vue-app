<template>
  <div id="comment">
    <div class="head iconfont icon-icon-17" @touchend.stop="close()"></div>
	  <div class="title">全部评论</div>
	  <div class="comment-wrap">
		  <div class="item" v-for="item in hotcomments">
        <div class="userinfo clearfix">
          <img v-bind:src="item.user.avatarUrl" alt="" class="userpic" style="width:20px">
          <p class="name">{{item.user.nickname}}</p>
        </div>
        <p class="content">{{item.content}}</p>
        <div class="bottom clearfix">
          <i class="conmunity iconfont icon-comment"></i>
          <i class="like iconfont icon-xihuan" :class="addclass(item.liked)"></i>
        </div>
		  </div>
	  </div>
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
  background: #259bd8;
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
        }
        .liked {
          color: red;
        }
      }
    }
  }
}
</style>

<script>
import { songcomment } from "@/api/getData";
export default {
  data() {
    return {
      playing: '',
      comments: [],
      hotcomments: [],
      total:'',
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
    }
  },
  mounted :function(){
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

