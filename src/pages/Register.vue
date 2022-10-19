<template>
  <div id="building">

    <el-card class="logincard" :body-style="{ padding: '0px' }" shadow="hover">
      <div class="loginicon">
        <img src="../assets/logo.jpg" class="loginimage">

      </div>

      <div style="padding: 14px;">
        <el-page-header @back="goBack" title="返回登录">
        </el-page-header>
        <el-form ref="loginForm" :model="user" status-icon label-width="80px">
          <el-form-item prop="username" label="用户名">
            <el-input autocomplete="on" v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机号">
            <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="pcode" label="验证码" style="width:100%">
            <el-input style="width: 50%;" v-model="user.pcode" placeholder="请输入邮箱验证码"></el-input>
            <el-button :disabled="!show" @click="resgisMailcode()" style="width:40%; margin-left: 0px; "><span
                v-show="show">获取邮箱验证码</span><span v-show="!show" class="count">{{ count }}s后重试</span></el-button>
          </el-form-item>


          <el-form-item prop="password" label="设置密码">
            <el-input v-model="user.psd" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="确认密码">
            <el-input v-model="user.psdcfd" show-password placeholder="请再输入一次密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="regbtn" type="primary" icon @click="doRegister()">注册账号</el-button>
          </el-form-item>
        </el-form>


      </div>
    </el-card>


  </div>
</template>
 
<script>

import service from "@/userinfo/request"
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        phone: "",
        email: "",
        psd: "",
        pcode: "",
      },
      show: true,
      timer: 0,
      count: 0,
    };
  },
 
  methods: {
    goBack() {
      this.$router.push({ path: "/login" });
    },

    resgisMailcode() {
      if (!this.user.email) {
        this.$message.error("请输入邮箱！");
        return;
      } else {
        service
          .post("http://faye.nat300.top/auth/getEmailCode?mail=" + this.user.email + "&type=0")
          .then(res => {
           
            if (res.code === '0') {
              this.$message('验证码已发送，请注意查看邮箱！')
            } else if (res.code === '-1') {
              this.$message('该邮箱已注册过账号！请重新检查信息！')
              // alert("该邮箱已注册过账号！请重新检查信息！");
            } else {
              this.$message('错误！')
            };
          });

        // 验证码倒计时
     
        if (!this.timer) {
      
          this.count = 180;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= 180) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }

    },
    doRegister() {
      var reg1 = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      var reg2 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!this.user.username) {
        this.$message.error("请输入用户名！");

      }
      else if (!this.user.email) {
        this.$message.error("请输入邮箱！");

      } else if (!this.user.phone) {
        this.$message.error("请输入手机号！");

      } else if (!this.user.psd) {
        this.$message.error("请输入密码！");
      }
      else if (!reg1.test(this.user.phone)) {
        this.$message.error("请输入有效的手机号！");
      }
      else if (!reg2.test(this.user.email)) {
        this.$message.error("请输入有效的邮箱！");
      }

      else {

        service
          .post("http://faye.nat300.top/auth/register", {
            userName: this.user.username,
            mail: this.user.email,
            password: this.user.psd,
            phone: this.user.phone,
            code: this.user.pcode
          })
          .then(res => {
          
            if (res.code === "0") {
              this.$message({
                type: 'success',
                message: '注册成功'
              });
              this.$router.push({ path: "/Login" });

              // 注册成功跳转登陆页面  
              // 登陆页面是否需要记住账号...
            } else {
              alert("该邮箱已注册过账号！请重新检查信息！");
            }
          });
      }
    }
  }
}

</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#building {
  background-color: rgb(243, 243, 243);
  width: 98%;
  height: 100%;
  position: absolute;
  background-size: 100% 100%;
}

.logincard {
  width: 34%;
  height: 85%;
  margin-left: 32%;
  margin-top: 3%;
  border-radius: 20px
}

.loginimage {
  border-radius: 20px;
  width: 15%;
  margin-left: 43%;
  margin-top: 2%;
}

.loginicon {
  background-color: rgb(134, 217, 248);
  /* border-radius:20px; */
  height: 7em;
  width: 100%;
  box-shadow:
    0.2px 0.2px 0.4px rgba(0, 0, 0, 0.017),
    0.5px 0.5px 0.9px rgba(0, 0, 0, 0.024),
    0.9px 0.9px 1.6px rgba(0, 0, 0, 0.03),
    1.4px 1.5px 2.5px rgba(0, 0, 0, 0.035),
    2.1px 2.3px 3.9px rgba(0, 0, 0, 0.04),
    3.3px 3.6px 6px rgba(0, 0, 0, 0.046),
    5.5px 6px 10px rgba(0, 0, 0, 0.053),
    11px 12px 20px rgba(0, 0, 0, 0.07);
}



.loginform {
  margin-left: 35px;
}

.regisaccount {
  /* margin-left: 40%; */
  margin-right: 5%;

}

.slideverify {
  background-size: cover;
  width: 400px;
  height: 220px;
  margin-top: 0px;
  margin-left: 40%;
  overflow: hidden;
  /* padding-top: 10px; */
  line-height: 0px;
}


#password {
  margin-bottom: 5px;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
  left: 40%;
  position: relative;
}

a {

  text-decoration: none;
  color: #aaa;
  font-size: 15px;
  position: relative;
}

a:hover {
  color: coral;
}

.el-button {
  width: 57%;
  margin-left: 15%;
  position: relative;
  /* top: 50px; */
}

.el-form-item {
  margin-left: 1%;
  width: 93%;
  margin-top: 2%;

}

.remember {
  margin-top: 3%;
  margin-bottom: 4%;
  margin-left: 60%;
}

.slide-verify {
  left: 50%;
  top: 0;
  transform: translate(-50%);
}
</style>