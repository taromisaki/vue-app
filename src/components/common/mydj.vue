<template>
    <div id="mydj">
        <div class="head">
            <div class="back iconfont icon-fanhui" @click="back()"></div>
            <div class="title">推荐电台</div>
        </div>
        <div class="dj-wrap">
            <ul>
                <li v-for="item in list" class="clearfix">
                    <img v-bind:src="item.picUrl">
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
#mydj {
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
    .dj-wrap {
        ul {
            li {
                padding-left: 15px;
                margin-top: 10px;
                &:first-child {
                    margin-top: 0;
                }
                img {
                    float: left;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;

                }
                p {
                    float: left;
                    color: #fff;
                    height: 50px;
                    line-height: 50px;
                    padding-left: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 80%;
                    box-sizing: border-box;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>

<script>
import {djprogram} from '@/api/getData'
export default {
    data(){
        return {
            list:[]
        }
    },
    methods: {
        async getDj (){
            let par = {'uid':'515731832'}
            let data = await djprogram(par)
            console.log(data)
            this.list = data.data.result
        },
        back : function (){
            this.$router.go(-1)
        }
    },
    created: function (){
        this.getDj()
    }
}
</script>
