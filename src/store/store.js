import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
// let state = {
//     musicurl: '',
//     musicname: ''
// }
//用于保存用户登录信息
let userinfo = {
    "profile": {
        "avatarImgIdStr": "",
        "backgroundImgIdStr": "",
        "description": "",
        "userId": "",
        "vipType": "",
        "nickname": "",
        "accountStatus": "",
        "province": "",
        "defaultAvatar": "",
        "avatarUrl": "",
        "gender": "",
        "birthday": "",
        "city": "",
        "mutual": "",
        "remarkName": "",
        "expertTags": "",
        "experts": {},
        "avatarImgId": "",
        "backgroundImgId": "",
        "userType": "",
        "authStatus": "",
        "backgroundUrl": "",
        "detailDescription": "",
        "djStatus": "",
        "followed": "",
        "signature": "",
        "authority": "",
        "avatarImgId_str": "",
        "followeds": "",
        "follows": "",
        "blacklist": "",
        "eventCount": "",
        "playlistCount": "",
        "playlistBeSubscribedCount": ""
    },
    "level": "",
    "listenSongs": "",
    "peopleCanSeeMyPlayRecord": "",
    "bindings": [
        {
            "expired": "",
            "expiresIn": "",
            "refreshTime": "",
            "url": "",
            "userId": "",
            "tokenJsonStr": "",
            "id": "",
            "type": ""
        },
        {
            "expired": "",
            "expiresIn": "",
            "refreshTime": "",
            "url": "",
            "userId": "",
            "tokenJsonStr": "",
            "id": "",
            "type": ""
        },
        {
            "expired": "",
            "expiresIn": "",
            "refreshTime": "",
            "url": "",
            "userId": "",
            "tokenJsonStr": "",
            "id": "",
            "type": ""
        },
        {
            "expired": "",
            "expiresIn": "",
            "refreshTime": "",
            "url": "",
            "userId": "",
            "tokenJsonStr": "",
            "id": "",
            "type": ""
        }
    ],
    "adValid": "",
    "code": "",
    "createTime": "",
    "createDays": ""
}
let musicinfo = {
    "name": "",
    "id": "",
    "pst": "",
    "t": "",
    "ar": [
        {
            "id": "",
            "name": "",
            "tns": [],
            "alias": []
        }
    ],
    "alia": [
        ""
    ],
    "pop": "",
    "st": "",
    "rt": "",
    "fee": "",
    "v": "",
    "crbt": "",
    "cf": "",
    "al": {
        "id": "",
        "name": "",
        "picUrl": "",
        "tns": [],
        "pic": ""
    },
    "dt": "",
    "h": {
        "br": "",
        "fid": "",
        "size": "",
        "vd": ""
    },
    "m": {
        "br": "",
        "fid": "",
        "size": "",
        "vd": ""
    },
    "l": {
        "br": "",
        "fid": "",
        "size": "",
        "vd": ""
    },
    "a": null,
    "cd": "",
    "no": "",
    "rtUrl": null,
    "ftype": "",
    "rtUrls": [],
    "djId": "",
    "copyright": "",
    "s_id": "",
    "rtype": "",
    "rurl": null,
    "mst": "",
    "cp": "",
    "mv": "",
    "publishTime": ""
}
export default new Vuex.Store({
    state: {
        //音乐列表id
        musiclistId: '',
        // musicplaying: {
        //     name: 123
        // },
        //正在播放的音乐的详细信息
        musicplaying: {
            url:'',
            name:'',
            musicinfo
        },
        //处于登录状态的用户信息
        userinfo,
        //控制音乐播放进度条开始工作
        borgo: false
    },
    mutations: {
        getmusiclistid (state,id) {
          // 变更状态
          state.musiclistId = id
        },
        changemusic (state,data) {
            state.musicplaying.url = data.url
            state.musicplaying.name = data.name
            state.musicplaying.musicinfo = data.musicinfo
        },
        setuserinfo(state,data){
            state.userinfo = data
        },
        setborgo (state,isgo) {
            state.borgo = isgo
        }
    }
});
