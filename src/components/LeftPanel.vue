<template>
    <div id="leftpanel">
        <div class="mask" @touchstart.stop="ll()" @touchmove.stop="ls()" @touchend.stop="lefthide()">
            <div class="userInfo">
                <img class="userHead" v-bind:src="userinfo.profile.avatarUrl">
                <div class="userDetil">
                    <span class="userName" @click="cons">{{userinfo.profile.nickname}}</span>
                    <b class="userlevel">lv{{userinfo.level}}</b>
                    <span class="sign">签到</span>
                    <span class="clf"></span>
                </div>
            </div>
            <div class="aboutme">
                <ul class="aboutme-ul">
                    <li class="my-msg"><img src="../assets/leftpanel/message.png"><a>我的消息</a></li>
                    <li class="my-friends"><img src="../assets/leftpanel/friends.png"><a>我的好友</a></li>
                </ul>      
            </div>
            <div class="tool">
                <ul class="tool-ul">
                    <li class="settime"><img src="../assets/leftpanel/settime.png"><a>定时停止播放</a></li>
                    <li class="scanning"><img src="../assets/leftpanel/scanning.png"><a>扫一扫</a></li>
                    <li class="clock"><img src="../assets/leftpanel/clock.png"><a>音乐闹钟</a></li>
                    <li class="pan"><img src="../assets/leftpanel/pan.png"><a>音乐云盘</a></li>
                </ul>
            </div>
            <div class="bottom-tool">
                <ul class="bottom-tool-ul">
                    <li><img src="../assets/leftpanel/night.png"><a>夜间模式</a></li>
                    <li><img src="../assets/leftpanel/set.png"><a>设置</a></li>
                    <li><img src="../assets/leftpanel/out.png"><a>退出</a></li>
                </ul>
            </div>
        </div> 
        <div class="rightmask" @touchstart="change"></div> 
    </div>
</template>
<script>
import {loginrefresh} from '@/api/getData'
export default {
    data() {
        return {
            userinfo:{}
        }
    },
    methods: {
        //左侧个人信息栏隐藏
        change: function () {
            console.log(123)
            this.$parent.componentsChange.leftpanelshow = false;
            // this.$emit('taggle',false);
            let body = document.getElementsByTagName('body')[0]
            body.style.overflow = 'scroll'
        },
        cons: function () {
            console.log(this.userinfo)
        },
        //获取用户信息
        async getUserinfo(id) {
            let par = {'uid':id}
            let refreshreq = await loginrefresh(par)
            this.userinfo = refreshreq.data
            console.log(this.userinfo)
        } ,
        lefthide: function (e){
            console.log(e)
            // e.preventdefault()
            // var x = e.changedTouches[0].clientX;
            // if(x/$('.mask').width() > 0.3) {
            //     this.$parent.componentsChange.leftpanelshow = false;
            //     // this.$emit('taggle',false);
            //     let body = document.getElementsByTagName('body')[0]
            //     body.style.overflow = 'scroll'
            // }
        },
        ll:function () {},
        ls:function () {}
    },
    created: function () {
        // let user = this.$store.state.userinfo  localStorage.getItem('userid') ||
        
    },
    mounted: function () {
        //let id = this.$store.state.userId
        let id = localStorage.getItem('userid')
        //alert(id)
        this.getUserinfo(id)
    }
}
</script>
<style lang="less" scoped>
    #leftpanel {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        min-height: 812px;
        color: #fff;
        z-index: 1000;
        .mask {
            background: rgba(0, 0, 0, 0.1);
            height: 100%;
            width: 85%;
            min-height: 812px;
            background: url('../assets/leftpanel/yourname.png') no-repeat;
            background-size: auto 100%;
            background-position-x: 30%;
            float: left;
        }
        ul {
            list-style: none;
            padding:0;
            padding-top: 10px;
            margin: 0;
            padding-bottom: 10px;
            li {
                box-sizing: border-box;
                // padding-top: 10px;
                // padding-left: 40px;
                margin-left: 15px;
                height: 40px;
                line-height: 40px;
                img {
                    float: left;
                    height: 24px;
                    margin-top: 8px;
                }
                a {
                    padding-left: 8px;
                }
            }
        }
        .userInfo {
            height: 150px;
            background: rgba(0, 0, 0, 0.4);
            width: 100%;
            .userHead {
                display: inline-block;
                margin-left: 15px;
                margin-top: 40px;
                width: 70px;
                height: 70px;
                border-radius: 50%;
            }
            .userDetil {
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                .userName {
                    display: inline-block;
                    margin-left: 15px;
                }
                .sign {
                    display: inline-block;
                    margin-right: 15px;
                    float: right;
                    width: 60px;
                    height: 24px;
                    line-height: 22px;
                    border: 1px solid;
                    border-radius: 12px;
                    padding-left: 13px;
                    box-sizing: border-box;
                    margin-top: 3px;
                }
                .clf {
                    clear: both;
                }
            }
        }
        .aboutme {
            padding-top: 10px;
            background: rgba(0, 0, 0, 0.3);
            .aboutme-ul {
                background: rgba(255, 255, 255, 0.1);
                .my-msg {
                    // background: url('../assets/leftpanel/message.png') no-repeat;
                    // background-position: 0% 8px;
                    // background-size: auto 90%;
                    img {
                        // height: 100%;
                    }
                }
                .my-friends {
                    // background: url('../assets/leftpanel/friends.png') no-repeat;
                    // background-position: 0% 8px;
                    // background-size: auto 90%;
                }
            }
        }
        .tool {
            padding-top: 10px;
            background: rgba(0, 0, 0, 0.3);
            .tool-ul {
                background: rgba(255, 255, 255, 0.1);
                .settime {
                    // background: url('../assets/leftpanel/settime.png') no-repeat;
                    // background-position: 0% 8px;
                    // background-size: auto 90%;
                }
                .scanning {
                    // background: url('../assets/leftpanel/scanning.png') no-repeat;
                    // background-position: 0% 8px;
                    // background-size: auto 90%;
                }
                .clock {
                    // background: url('../assets/leftpanel/clock.png') no-repeat;
                    // background-position: 0% 8px;
                    // background-size: auto 90%;
                }
                .pan {
                    // background: url('../assets/leftpanel/friends.png') no-repeat;
                    // background-position: 0% 8px;
                    // background-size: auto 90%;
                }
            }
        }
        .bottom-tool {
            margin-top: 10px;
            position: fixed;
            bottom: 0;
            display: flex;
            width: 85%;
            background: rgba(0, 0, 0, 0.6);
            .bottom-tool-ul {
                background: rgba(255, 255, 255, 0.1);
                width: 100%;
                display: flex;
            }
            li {
                box-sizing: border-box;
                margin: 0;
                float: left;
                flex:1;
                -ms-flex:1;
                -webkit-flex:1;
                -webkit-box-flex:1;
                position: relative;
                // background: #ccc;
                padding-left: 4px;
                // text-align:center;
                &:nth-child(2) {
                    img {
                        margin-left: 12px;
                    }
                }
                &:nth-child(3) {
                    img {
                        margin-left: 12px;
                    }
                }
                a {
                    padding: 4px;
                }
            }
        }
        .rightmask {
            height: 100%;
            width: 15%;
            min-height: 812px;
            float: left;
            // background: rgba(0, 0, 0, 0.1)
        }
    }
</style>

