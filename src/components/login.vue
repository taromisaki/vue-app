<template>
  <div id="login">
      <div class="btn">
          <div class="loginbtn" @click="jump()">手机号登录</div>
          <div class="registbtn">注册</div>
      </div>
      <div class="con">
          <div class="logincon">
              <div class="phone">
                <input type="text" placeholder="请输入手机号" id="login-phone"><span>X</span>
              </div>
              <div class="pass">
                <input type="password" placeholder="请输入密码" id="login-pass"><span>忘记密码？</span>
              </div>
              <div class="login" @click="login()">登录</div>
          </div>
          <div class="registcon">
              <input type="text" placeholder="请输入手机号" id="regist-phone">
              <input type="password" placeholder="请设置密码，不少于6位" id="regist-pass">
              <div class="regist">注册</div>
          </div>
      </div>
  </div>
</template>
<script>
import {phonelogin,loginrefresh} from '@/api/getData'
export default {
  methods: {
        async login () {
            let _self = this
            let phone = document.getElementById('login-phone').value
            let pass = document.getElementById('login-pass').value
            console.log(phone,pass)
            let param = {
                'phone':phone,
                'password':pass
            }
            try {
                let req = await phonelogin(param)
                if (req.data.code == 400) {
                    alert('登陆出错')
                }else if(req.data.code == 502){
                    alert('密码错误')
                }else if(req.data.code == 200){
                    alert('登陆成功')
                    console.log(req.data)
                    let id = req.data.account.id
                    let par = {'uid':id}
                    let refreshreq = await loginrefresh(par)
                    console.log(refreshreq.data)
                    _self.$store.commit('setuserinfo',refreshreq.data)
                    window.location.href="http://172.18.41.213:3001/#/main"
                }
            }catch(err){
                alert(err)  //123.150.43.34:30001/api/user/login
            }
        },
        jump () {
            window.location.href="http://10.1.7.99:3001/#/main"
        }
  }
}
</script>

<style lang="less" scoped>
    #login {
        width: 100%;
        height: 100%;
        .btn {
            .loginbtn,.registbtn {
                width: 200px;
                height: 40px;
                box-sizing: border-box;
                border: 1px solid rgb(223, 56, 70);
                border-radius: 20px;
                line-height: 40px;
                text-align: center;
                color: rgb(223, 56, 70);
                margin: 0 auto;
            }
        }
        .con {
            .logincon {
                input {
                    
                    display: block;
                    padding-left: 10px;
                    box-sizing: border-box;
                    margin: 20px auto;
                    width: 200px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 20px;
                    border: 1px solid rgb(32, 95, 233);
                }
                .phone {
                    span {
                        position: relative;
                        top: -44px;
                        left: 258px;
                    }
                }
                .pass {
                    span {
                        position: relative;
                        font-size: 12px;
                        top: -45px;
                        left: 218px;
                    }
                }
            }
            .registcon {
                input {
                    display: block;
                    padding-left: 10px;
                    box-sizing: border-box;
                    margin: 20px auto;
                    width: 200px;
                    height: 30px;
                    line-height: 30px;
                    border-radius: 20px;
                    border: 1px solid rgb(32, 95, 233);
                }
            }
        }
    }
</style>
