<template>
    <div id="userinfo">
        <div class="head">
            <div class="back iconfont icon-fanhui" @click.stop="back()"></div>
            <div class="title">用户信息</div>
        </div>
        <img v-bind:src="userinfo.profile.backgroundUrl" class="background">
        <div class="edit" @click.stop="edit()">编辑</div>
        <div class="wrap">
            <img v-bind:src="userinfo.profile.avatarUrl">
            <p class="name">{{userinfo.profile.nickname}}</p>
            <div class="simple-info">
                <span class="year">95后</span>
                <span class="lv">lv.{{userinfo.level}}</span>
                <span class="star">巨蟹座</span>
            </div>
        </div>
        <div class="aboutme">
            <div class="wrap-1">
                <div class="title">个人信息</div>
                <div class="level">
                    <span>等级:</span>
                    <span>{{userinfo.level}}</span>
                </div>
                <div class="age">
                    <span>年龄:</span>
                    <span>{{userinfo.profile.birthday}}</span>
                </div>
                <div class="sex">
                    <span>性别:</span>
                    <span>{{userinfo.profile.gender}}</span>
                </div>
                <div class="area">
                    <span>地区:</span>
                    <span>天津市</span>
                </div>
            </div>
            <div class="wrap-2">
                <div class="title">个人介绍</div>
                <div class="msg">{{userinfo.profile.signature}}</div>
            </div>
        </div>
        <!-- TODO 修改信息-->
        <!-- <div class="edit-wrap">
            <div class="uesrhead"></div>
            <div class="userbk"></div>
            <div class="username"></div>
            <div class="usersex"></div>
            <div class="userbirth"></div>
            <div class="userarea"></div>
            <div class="usermsg"></div>
        </div> -->
    </div>
</template>
<style lang="less" scoped>
#userinfo {
    position: relative;
    height: 100%;
    width: 100%;
    .head {
        height: 60px;
        position: relative;
            color: #fff;
        .back {
            font-size: 16px;
            position: absolute;
            left: 0;
            height: 60px;
            width: 60px;
            line-height: 60px;
            text-align: center;
        }
        .title {
            margin: 0 auto;
            text-align: center;
            font-size: 16px;
            height: 60px;
            line-height: 60px;
        }
    }
    .background {
        width: 100%;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .edit {
        position: absolute;
        right: 20px;
        top: 160px;
        color: #fff;
        font-size: 16px;
        width: 50px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        background: #666;
        border-radius: 5px;
    }
    .wrap {
        padding-top: 100px;
        padding-left: 15px;
        box-sizing: border-box;
        color: #fff;
        padding-bottom: 30px;
        height: 260px;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        .name {
            margin-top: 20px;
        }
        .simple-info {
            margin-top: 20px;
            span {
                font-size: 12px;
            }
            .year {

            }
            .lv {
                margin-left: 10px;
            }
            .star {
                margin-left: 10px;
            }
        }
    }
    .aboutme {
        width: 100%;
        position: relative;
        height: 400px;
        &::after {
            content: '';
            background: #25c6fc;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            z-index: -1;
            border-radius: 10px 10px 0 0;
        }
        .wrap-1 {
            padding-top: 20px;
            padding-left: 15px;
            color: #fff;
            .title {
                font-size: 14px;
            }
            div span {
                &:first-child {
                    color: #cdcdcd;
                }
                font-size: 12px;
            }
            .level {
                margin-top: 10px;
            }
            .age {
                margin-top: 10px;
            }
            .sex {
                margin-top: 10px;
            }
            .area {
                margin-top: 10px;
            }
        }
        .wrap-2 {
            padding-top: 20px;
            padding-left: 15px;
            color: #fff;
            .title {
                font-size: 14px;
            }
            .msg {
                font-size: 12px;
                margin-top: 10px;
            }
        }
    }
}
</style>

<script>
import {loginrefresh} from '@/api/getData'
export default {
    data(){
        return {
            userinfo:{}
        }
    },
    methods: {
        async getinfo(uid){
            let par = {'uid':uid}
            let refreshreq = await loginrefresh(par)
            this.userinfo = refreshreq.data
            console.log(this.userinfo)
        },
        edit :function (){
            //this.$router.push
        },
        back : function (){
            this.$router.go(-1)
        }
    },
    created: function (){
        let uid = this.$route.query.id
            console.log(uid)
            this.getinfo(uid)
    }
}
</script>
