import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
// let state = {
//     musicurl: '',
//     musicname: ''
// }
//用于保存用户登录信息
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
            id:'',
            url:'',
            name:'',
            musicinfo:{}
        },
        //用户id
        userId: '',
        //控制音乐播放进度条开始工作
        borgo: false,
        playing: false
    },
    mutations: {
        getmusiclistid (state,id) {
          // 变更状态
          state.musiclistId = id
        },
        changemusic (state,data) {
            state.musicplaying.id = data.id
            state.musicplaying.url = data.url
            state.musicplaying.name = data.name
            state.musicplaying.musicinfo = data.musicinfo
        },
        setuserId(state,data){
            state.userId = data
        },
        setborgo (state,isgo) {
            state.borgo = isgo
        },
        _playing(state,bol) {
            state.playing = bol
        }
    }
});
