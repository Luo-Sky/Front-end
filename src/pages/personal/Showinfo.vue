

<template>
  <div>
    <el-row style="margin-left:4%; font-size: larger;">
      <span style="margin-top:8%; font-size: larger;font-weight: bold;">个人信息</span>
      <el-divider></el-divider>
      <el-row style="margin-top:5%;height: 2em;">
        <i class="el-icon-user" style="margin-right:2%"></i>
        <span @click="editname()" style="margin-right:5%">用户名</span>
        <span @click="editname()" v-if="!iseditname"> {{ user.username }}</span>
        <el-input placeholder="请输入内容" v-if="iseditname" v-model="inputname" style="width: 40%;" clearable> </el-input>
        <el-button style="margin-left:5%" type="primary" v-if="iseditname" @click="nameeditsave()" plain>保存</el-button>
        <el-button type="info" v-if="iseditname" @click="nameeditcancle()" plain>取消</el-button>

      </el-row>
      <el-divider></el-divider>
      <el-row style="margin-top:4%; height: 2em;">
        <i class="el-icon-mobile-phone" style="margin-right:2%"></i>
        <span style="margin-right:5%">手机号</span>

        <span @click="editphone()" v-if="!iseditphone"> {{ user.userphone }}</span>
        <el-input placeholder="请输入内容" v-if="iseditphone" v-model="inputphone" style="width: 40%;" clearable> </el-input>
        <el-button style="margin-left:5%" type="primary" v-if="iseditphone" @click="phoneeditsave()" plain>保存
        </el-button>
        <el-button type="info" v-if="iseditphone" @click="phoneeditcancle()" plain>取消</el-button>


      </el-row>
      <el-divider></el-divider>
      <el-row style="margin-top:4%;">
        <i class="el-icon-message" style="margin-right:2%"></i>
        <span style="margin-right:6%">邮 箱</span>
        <span> {{ user.usermail }}(已绑定)</span>
      </el-row>
      <el-divider></el-divider>
    </el-row>









    <!-- <el-descriptions style="width: 60%;font-size: large;" size="larger" title="个人信息" class="margin-top" :column="1">
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">修改信息</el-button>
      </template>
      <el-descriptions-item style="margin-top:5em" size="large">
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ user.username }}
      </el-descriptions-item>
      <el-descriptions-item style="margin-top:50%">
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{ user.userphone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-message"></i>
          邮箱号
        </template>
        {{ user.usermail }}
      </el-descriptions-item>
    </el-descriptions> -->




    <!-- 
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item style="width: 80%;" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="width: 80%;" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->




  </div>
</template>

<script>
import service from '@/userinfo/request';
export default {
  name: "showinfo",
  data() {
    return {
      dialogFormVisible: false,
      size: '',
      user: {
        id: '',
        username: "测试",
        usermail: 18100000000,
        userphone: 110110110110,
        password: "123"
      },
      form: {
        name: '',
        phone: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
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
                  console.log(localStorage.getItem("username"))
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

  }
}
</script>

<style scoped>
.el-descriptions-row {
  margin-top: 50%;
}

.message {
  width: 20em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

