<template>
  <div style="background-color: white">

    <el-container style="height: 800px; border: 1px solid #eee;">




      <el-container style="background-color: white">
        <el-main>
          <el-row>
            <el-col :span="3">
              <el-card shadow="hover" style="height: 425px;margin-left:10px;">
                <el-avatar style="margin-left:15%; center" :size="100"> {{ user.username }} </el-avatar>
              </el-card>
            </el-col>

            <el-col :span="20" style="margin-left:10px;">
              <el-card shadow="hover">

                <span style="margin-top:8%; font-size: larger;font-weight: bold;">个人信息</span>
                <el-divider></el-divider>
                <el-row style="margin-top:4%;height: 2em;" class="showname">
                  <el-col :span="1" class="getword"> <i class="el-icon-user" style="margin-right:2%;"></i>
                  </el-col>
                  <el-col :span="2" class="getword"> <span style="margin-right:5%;">用户名</span></el-col>
                  <el-col :span="1" class="getword">
                    <span style="margin-right:5%" v-if="!iseditname"> {{ user.username }}</span>
                  </el-col>
                  <el-col :span="5" class="getword">
                    <el-link @click="editname()" v-if="!iseditname" class="etname"><i class="el-icon-edit"></i>编辑
                    </el-link>
                  </el-col>

                  <el-input placeholder="请输入内容" v-if="iseditname" v-model="inputname" style="width: 40%;" clearable>
                  </el-input>
                  <el-button style="margin-left:5%" type="primary" v-if="iseditname" @click="nameeditsave()" plain>保存
                  </el-button>
                  <el-button type="info" v-if="iseditname" @click="nameeditcancle()" plain>取消</el-button>

                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-top:4%; height: 2em;" class="showphone">

                  <el-col :span="1" class="getword"> <i class="el-icon-mobile-phone" style="margin-right:2%;"></i>
                  </el-col>
                  <el-col :span="2" class="getword"> <span class="getword" style="margin-right:5%">手机号</span>
                  </el-col>
                  <el-col :span="3" class="getword">
                    <span v-if="!iseditphone"> {{ user.userphone }}</span>
                  </el-col>
                  <el-col :span="5" class="getword">
                    <el-link @click="editphone()" v-if="!iseditphone" class="etphone"><i class="el-icon-edit"></i>编辑
                    </el-link>
                  </el-col>

                  <el-input placeholder="请输入内容" v-if="iseditphone" v-model="inputphone" style="width: 40%;" clearable>
                  </el-input>
                  <el-button style="margin-left:5%" type="primary" v-if="iseditphone" @click="phoneeditsave()" plain>保存
                  </el-button>
                  <el-button type="info" v-if="iseditphone" @click="phoneeditcancle()" plain>取消</el-button>


                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-top:4%;">

                  <el-col :span="1" class="getword"> <i class="el-icon-message" style="margin-right:2%"></i></el-col>
                  <el-col :span="2" class="getword"> <span style="margin-right:6%">邮 箱</span>
                  </el-col>
                  <el-col :span="10" class="getword">
                    <span> {{ user.usermail }}(已绑定)</span>
                  </el-col>
              
                </el-row>
                <el-divider></el-divider>
              </el-card>
            </el-col>
          </el-row>


          <!-- <router-view></router-view> -->
        </el-main>
      </el-container>



    </el-container>

  </div>
</template>

<script>
import service from '@/userinfo/request';
export default {
  name: "Personal",
  beforeRouteEnter: (to, from, next) => {
  

    let islogin = localStorage.getItem("isLogin")

    if (!islogin) {

      next((vm) => { vm.$message("请先登录"), vm.$router.push({ path: "/Login" }); });
    }
    next()

  },
  data() {
    return {

      size: '',
      user: {
        id: '',
        username: "测试",
        usermail: 18100000000,
        userphone: 110110110110,
        password: "123"
      },
      iseditname: false,
      iseditphone: false,
      inputname: '',
      inputphone: '',
    }
  },
  methods: {
    phoneeditcancle() {
      this.iseditphone = false
    },
    nameeditcancle() {
      this.iseditname = false
    },
    editname() {
      this.iseditname = true,
        this.inputname = ''

    },
    editphone() {
      this.iseditphone = true,
        this.inputphone = ''
    },
    nameeditsave() {
      service.put
        ("http://faye.nat300.top/users", {
          id: this.user.id,
          userName: this.inputname,
        }).then(res => {
          if (res.code == '-1') {
            alert("数据提交异常请重新提交~")
          }
          else {
            this.iseditname = false

            service
              .post("http://faye.nat300.top/users/login", {
                userName: this.inputname,
                password: this.user.password,
              })
              .then((res) => {

                if (res.code === '0') {
                  this.user.username = res.data.userName

                  localStorage.setItem("username", res.data.userName)

                } else {
                  this.$message.error("失败");
                }

              });



            this.$message.success("修改成功")
          }
        })
    },
    phoneeditsave() {
      service.put
        ("http://faye.nat300.top/users", {
          id: this.user.id,
          phone: this.inputphone,
        }).then(res => {
          if (res.code == '-1') {
            alert("数据提交异常请重新提交~")
          }
          else {

            this.iseditphone = false


            service.post("http://faye.nat300.top/users/login", {
              userName: this.user.username,
              password: this.user.password,
            })
              .then((res) => {

                if (res.code === '0') {

                  this.user.userphone = res.data.phone
                  localStorage.setItem("userphone", res.data.phone)
                } else {
                  this.$message.error("失败");
                }

              });


            this.$message.success("修改成功")
          }
        })
    }

  },
  created: function () {
    this.user.username = localStorage.username
    this.user.usermail = localStorage.usermail
    this.user.userphone = localStorage.userphone
    this.user.id = localStorage.getItem("ID")

  },







}
</script>

<style scoped>
.getword {
  top: 25%;
  position: relative;
}



.etname {
  display: none;
  width: 19%;
}

.showname:hover .etname {
  display: block;
  color: dodgerblue;
}



.etphone {
  display: none;
  width: 19%;

}

.showphone:hover .etphone {
  display: block;
  color: dodgerblue;
}

.operate:hover .image {
  display: none;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.alink {

  text-decoration: none;
}
</style>



