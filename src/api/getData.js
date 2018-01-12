import axio from '../js/axio'
//手机号登录
export const phonelogin = data => axio('/login/cellphone', data,'GET')
//刷新登录，用于获取用户详情 
//[todo]
export const loginrefresh = data => axio('/user/detail', data,'GET')
//获取用户详情
export const userdetail = data => axio('/user/detail', data,'GET')
//获取歌单列表
export const getmusiclist = data => axio('/user/playlist', data,'GET')
//获取歌单详细信息
export const getmusiclistdetail = data => axio('/playlist/detail', data,'GET')
//获取用户电台
export const userdj = data => axio('/user/dj', data,'GET')
//获取用户关注
export const userpoint = data => axio('/user/follows', data,'GET')
//获取音乐url
export const musicurl = data => axio('/music/url', data,'GET')
//获取音乐详情
export const musicdetail = data => axio('/song/detail', data,'GET')
