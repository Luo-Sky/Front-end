<template>
  <div id="building">

    <el-card class="logincard" :body-style="{ padding: '0px' }" shadow="hover">
      <div class="loginicon">
        <img src="../assets/logo.jpg" class="loginimage">

      </div>

      <div style="padding: 14px;">
        <el-page-header @back="goBack" title="返回登录">
        </el-page-header>
        <el-form class="loginform" ref="loginForm" :model="user" status-icon label-width="80px">
          <el-form-item prop="usermail" label="邮箱">
            <el-input v-model="user.usermail" placeholder="请输入邮箱" prefix-icon></el-input>
          </el-form-item>
          <el-form-item prop="password" label="新密码">
            <el-input type="password" v-model="user.password" placeholder="请输入新密码" prefix-icon></el-input>
          </el-form-item>
          <el-form-item prop="checkpass" label="再输一次">
            <el-input type="password" v-model="user.checkpass" placeholder="请再次输入密码" prefix-icon></el-input>
          </el-form-item>

          <el-form-item prop="pcode" label="验证码" style="width:100%">
            <el-input style="width: 46%;" v-model="user.pcode" placeholder="请输入邮箱验证码"></el-input>
            <el-button :disabled="!show" @click="loginMailcode()" style="width:40%; margin-left: 0px; "><span
                v-show="show">获取邮箱验证码</span><span v-show="!show" class="count">{{ count }}s后重试</span></el-button>
          </el-form-item>
          <!-- <router-link to="/register">没有账号？注册一个</router-link> -->
          <el-button type="primary" icon="el-icon-upload" @click="findPass()">找回密码</el-button>
        </el-form>
      </div>
    </el-card>


  </div>
  <!-- <video controls src="xxx"></video> -->

</template>
 
<script>
import Vcode from "vue-puzzle-vcode";
import service from '@/userinfo/request';

export default {
  name: "Maillogin",
  data() {
    return {
      isShow: false,
      msg: "",
      dialogbuttonVisible: false,
      text: "向右滑",
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 1,
      user: {
        id: "",
        usermail: "",
        pcode: "",
        password: "",
        checkpass: ""
      },
      show: true,
      timer: 0,
      count: 0,
    };
  },
  components: { Vcode },
  created() { },
  methods: {
    goBack() {
      this.$router.push({ path: "/login" });
    },
    UsernameLogin() {
      this.$router.push({ path: "/login" });
    },
    loginMailcode() {
      if (!this.user.usermail) {
        this.$message.error("请输入邮箱！");
        return;
      } else {
        service
          .post("/auth/getEmailCode?mail=" + this.user.usermail + "&type=1", {

          })
          .then(res => {
            // console.log(this.user.usermail);
            console.log(res);
            if (res.code === '0') {
              this.$message('验证码已发送，请注意查看邮箱！')
            } else if (res.code === '-1') {
              this.$message('该邮箱已注册过账号！请重新检查信息！')
              // alert("该邮箱已注册过账号！请重新检查信息！");
            } else {
              this.$message('错误！')
            };
          });

        //      // 验证码倒计时
        // console.log(!this.timer)
        // if (!this.timer) {
        //   console.log(this.timer)
        //   this.count = 180;
        //   this.show = false;
        //   this.timer = setInterval(() => {
        //     if (this.count > 0 && this.count <= 180) {
        //       this.count--;
        //     } else {
        //       this.show = true;
        //       clearInterval(this.timer);
        //       this.timer = null;
        //     }
        //   }, 1000);
        // }
      }
    },
    findPass() {
      // console.log(this.user.pcode)
      if (!this.user.usermail) {
        this.$message.error("请输入邮箱！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {

        service
          .get("http://faye.nat300.top/auth/findPassword",
            {
              params: {
                mail: this.user.usermail,
                captcha: this.user.pcode,
              }
            }
          )
          .then(res => {
            console.log(res);
            if (res.code === '0') {
              this.user.id = res.data.id
              console.log(this.user.id);
              service
                .put("http://faye.nat300.top/users", {
                  id: this.user.id,
                  password: this.user.password,
                })
                .then(resdata => {
                  console.log(resdata);
                  if (resdata.code === '0') {
                    this.$message('成功找回密码')
                    this.$router.push({ path: "/login" });
                  } else if (resdata.code === '-1') {
                    this.$message('该邮箱已注册过账号！请重新检查信息！')
                    // alert("该邮箱已注册过账号！请重新检查信息！");
                  } else {
                    this.$message('错误！')
                  };
                });




            } else {
              this.$message('验证码错误')
              // alert("该邮箱已注册过账号！请重新检查信息！");
            }
          });
      }
    },
  }
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#building {
  background-color: rgb(243, 243, 243);
  width: 98%;
  height: 98%;
  position: absolute;
  background-size: 100% 100%;
}

.logincard {
  width: 34%;
  height: 72%;
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
  margin-left: 20%;
  position: relative;
  /* top: 50px; */
}

.el-form-item {
  margin-left: 1%;
  width: 90%;
  margin-top: 6%;

}

.remember {
  margin-top: 3%;
  margin-bottom: 4%;
  margin-left: 60%;
}
</style>