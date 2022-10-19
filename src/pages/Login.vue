<template>


  <div id="building">

    <el-card class="logincard" :body-style="{ padding: '0px' }" shadow="hover">
      <div class="loginicon">
        <img src="../assets/logo.jpg" class="loginimage">

      </div>

      <div style="padding: 14px;">
        <el-form ref="loginForm" class="loginform" :model="user" @keyup.enter.native="doLogin" status-icon
          label-width="80px">
          <!-- <h2 v-if="isLogin">ceshi</h2> -->

          <el-form-item prop="username" label="登录名">
            <el-input v-model="user.username" placeholder="请输入用户名/邮箱" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>

          <!-- 记住我 -->

          <el-checkbox v-model="checked" class="remember">记住账号</el-checkbox>
          <el-button type="primary" icon="el-icon-upload" @click="doLogin()" :disabled="!canSubmit">登 录</el-button>
          <!-- <el-button type="text" @click="Findpass()">找回密码</el-button> -->
          <!-- <router-link to="/">找回密码</router-link> -->
          <el-row>
            <el-col :span="10" style="margin-left: 33%; margin-top: 5%;">
              <router-link to="/register" class="regisaccount">快速注册</router-link>
               <el-divider direction="vertical"></el-divider>
              <router-link to="/maillogin" class="regisaccount">找回密码</router-link>
            </el-col>
          </el-row>

        </el-form>




        <div class="slideverify">
          <!-- <Vcode :show="isShow" @success="onSuccess()" @close="onClose()" /> -->
          <el-dialog title="请完成安全验证" :visible.sync="dialogbuttonVisible" width="30%">


            <div class="slideSty animated bounceIn">

            </div>

            <div class="verification-slide">
              <slide-verify :l="40" :r="10" :w="280" :h="150" ref="slideblock" @again="onAgain" @fulfilled="onFulfilled"
                @success="onSuccess" @fail="onFail" @refresh="onRefresh" :accuracy="accuracy" :slider-text="text">
              </slide-verify>
            </div>
          </el-dialog>

        </div>
        <!-- <video controls src="xxx"></video> -->










      </div>
    </el-card>


  </div>







</template>
 
<script>
import Vcode from "vue-puzzle-vcode";
import service from '@/userinfo/request';
const Base64 = require("js-base64").Base64
export default {
  name: "login",
  data() {
    return {
      userInfo: {},
      isShow: false,
      msg: "",
      dialogbuttonVisible: false,
      text: "向右滑",
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 1,
      user: {
        username: "",
        password: "",
      },
      isLogin: false,
      checked: false,
    };
  },
  computed: {
    canSubmit() {
      const { username, password } = this.user
      return Boolean(username && password)
    }
  },
  components: { Vcode },
  created() { },
  mounted() {
    this.getCookie();
  },
  methods: {
    doLogin() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        this.dialogbuttonVisible = true;
        sessionStorage.setItem("isLogin", true)
        if (this.checked) {
          let password = Base64.encode(this.user.password); // base64加密
          this.setCookie(this.user.username, password, 7);
        } else {
          this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
        }
        /* ------ http登录请求 ------ */
      }


    },

    //

    submitForm() {
      this.isShow = true
    },

    // cookies的一些操作
    // 设置cookie
    setCookie(userId, password, days) {
      let date = new Date(); // 获取时间
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        "userId" + "=" + userId + ";path=/;expires=" + date.toGMTString();
      window.document.cookie =
        "password" + "=" + password + ";path=/;expires=" + date.toGMTString();
    },

    // 读取cookie 将用户名和密码回显到input框中
    getCookie() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split("; "); //分割成一个个独立的“key=value”的形式
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split("="); // 再次切割，arr2[0]为key值，arr2[1]为对应的value
          if (arr2[0] === "userId") {
            this.user.username = arr2[1];
          } else if (arr2[0] === "password") {
            this.user.password = Base64.decode(arr2[1]);// base64解密
            this.checked = true;
          }
        }
      }
    },


    //滑块验证成功
    onSuccess(msg) {
      this.onRefresh()
      this.dialogbuttonVisible = false
      this.$refs.slideblock.reset();
      //可以在此加上axios或其他代码

      let _this = this;
      //校验用户名和密码是否正确;
      // this.$router.push({ path: "/personal" });
      service
        .post("http://faye.nat300.top/users/login", {
          userName: this.user.username,
          password: this.user.password,
        })
        .then((res) => {


          if (res.code === '0') {
            this.dialogFormVisible = false; //登录成功后登录插槽关闭
            this.loginReg = false;//隐藏登录注册按钮，显示欢迎信息
            this.manage = true;//显示管理员登录信息
    
            localStorage.setItem("isLogin", true)
            localStorage.setItem("username", res.data.userName)
            localStorage.setItem("ID", res.data.id)
            localStorage.setItem("userphone", res.data.phone)
            localStorage.setItem("usermail", res.data.mail)
            localStorage.setItem("userpassword", res.data.password)
            let userInfo = {
              isLogin: true,
              ID: res.data.id,
              name: this.user.username,
              phone: res.data.phone,
              mail: res.data.mail,
            }
            // 把islogin存在localstorage里面
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            // this.$store.state.userInfo = userInfo
            _this.isLogin = true
            setTimeout(() => { //此处必须使用vue函数，否则this无法访vue实例
              this.$message(`欢迎您，用户 ${this.user.username}！`)
            }, 2000);
        
            this.$router.push({ path: "/work" });
          } else {
            alert("您输入的用户名或密码错误！");
          }

        });

    },


    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    },
    onFulfilled() {
    },
    onAgain() {
      this.msg = "try again";
      // 刷新
      this.$refs.slideblock.reset();
    },

  },
};
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
  height: 59%;
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
  margin-right: 0%;

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
  width: 77%;
  margin-top: 6%;

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