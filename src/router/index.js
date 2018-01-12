import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import header from '@/components/common/header'
import footer from '@/components/common/footer'
import group from '@/components/group'
import LeftPanel from '@/components/LeftPanel'
import MusicList from '@/components/MusicList'
import Online from '@/components/Online'
import index from '@/components/index'
import play from '@/components/play'
import login from '@/components/login'
import musiclistDetail from '@/components/musiclistDetail'
Vue.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
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
      children : [
        {
          path: '/leftpanel',
          componets: LeftPanel
        },
        {
          path: '/online',
          componets: Online
        },
        {
          path: '/group',
          componets: group
        },
        {
          path: '/sss',
          name: 'header',
          component: header
        },
        {
          path: '/musiclist',
          name: 'musiclist',
          component: MusicList
        },
        {
          path: '/musiclistDetail',
          name: 'musiclistDetail',
          component: musiclistDetail
        },
      ],
      component: index
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sss',
      name: 'header',
      component: header
    },
    {
      path: '/ddd',
      name: 'footer',
      component: footer
    },
    {
      path: '/musiclistDetail',
      name: 'musiclistDetail',
      children : [
        {
          path: '/footer',
          name: 'footer',
          component: footer
        }
      ],
      component: musiclistDetail
    },
    {
      path: '/play',
      name: 'play',
      component: play
    }
  ]
})
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