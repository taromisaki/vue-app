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
//获取音乐歌词
export const lyric = data => axio('/lyric', data,'GET')
//获取歌曲评论
export const songcomment = data => axio('/comment/music', data,'GET')
//评论点赞
export const likecomment = data => axio('/comment/like', data,'GET')
//喜欢音乐
export const likemusic = data => axio('/like', data,'GET')
//热搜
export const hotsearch = data => axio('/search/hot', data,'GET')
//搜索
export const search = data => axio('/search', data,'GET')
//获取用户
export const subcount = data => axio('/user/subcount', data,'GET')
//推荐电台
export const djprogram = data => axio('/personalized/djprogram', data,'GET')

