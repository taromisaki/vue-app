<template>
  <div id="comment">
	  <div class="title">全部评论</div>
	  <div class="comment-wrap">
		  <div class="item">

		  </div>
	  </div>
  </div>
</template>
<script>
import { songcomment } from "@/api/getData";
export default {
  data() {
    return {
      comment: {}
    };
  },
  methods: {
    async getComment(data) {
      let parm = {id:data};
      let get_comment = await songcomment(parm)
      console.error(get_comment)
    }
  },
  mounted :function(){
      this.getComment(449597)
  }
};
</script>

