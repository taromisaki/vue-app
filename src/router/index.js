import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import header from '@/components/common/header'
import footer from '@/components/common/footer'
import group from '@/components/group'
import LeftPanel from '@/components/LeftPanel'
import musiclist from '@/components/MusicList'
import Online from '@/components/Online'
import index from '@/components/index'
import play from '@/components/play'
import login from '@/components/login'
import musiclistDetail from '@/components/musiclistDetail'
import search from '@/components/common/search'
import comment from '@/components/common/comment'
import detailplay from '@/components/common/detailPlay'
import mydj from '@/components/common/mydj'
import subcount from '@/components/common/subcount'
import userinfo from '@/components/common/userinfo'
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'index',
      component: index,
      children: [
        {
          path: '/main/musiclist',
          name: 'musiclist',
          component: musiclist
        },
        {
          path: '/main/listdetail',
          name: 'listdetail',
          component: musiclistDetail
        },
        {
          path: '/main/comment',
          name: 'comment',
          component: comment
        },
        {
          path: '/main/search',
          name: 'search',
          component: search
        },
        {
          path: '/main/mydj',
          name: 'mydj',
          component: mydj
        },
        {
          path: '/main/subcount',
          name: 'subcount',
          component: subcount
        },
        {
          path: '/main/userinfo',
          name: 'userinfo',
          component: userinfo
        }
      ]

    }
  ]
})
Vue.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
// router.beforeRouteUpdate ((to, from, next) => {
//   // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
//    let isBack = this.$router.isBack
//    if (isBack) {
//       this.transitionName = 'slide-right'
//    } else {
//       this.transitionName = 'slide-left'
//    }
//    // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
//    this.$router.isBack = false
//      next()
// })