<template>
  <div style="width: 70%;margin-top: 5%">
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-dynamic">
      <el-form-item label="昵称修改" prop="name">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <br>


      <!-- 邮箱是绑定显示 -->
      <!-- <el-form-item prop="email" label="邮箱" :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入格式正确的邮箱地址！', trigger: ['blur', 'change'] }
      ]">
        <el-input v-model="user.usermail"></el-input>
      </el-form-item> -->
      <el-form-item prop="phone" label="手机号">
        <el-input v-model="user.userphone"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="cancle()">取消</el-button>
        <el-button type="primary" @click="submitForm('user')">提交修改</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import service from '@/userinfo/request';
export default {
  name: "infoeditor",
  data() {
    return {
      user: {
        id: '',
        username: '',
        usermail: '',
        userphone: ''
      },
      ruleForm: {
        name: '',
        email: '',
        phone: ''

      },
      rules: {

      }
    };
  },
  created: function () {
    // console.log('让我看看this',this)
    this.user.id = localStorage.getItem('ID')
    // this.user.username = localStorage.username
    // this.user.usermail = localStorage.usermail
    // this.user.userphone = localStorage.userphone

  },
  methods: {
    cancle() {
      this.$router.push("/personal/showinfo")
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this)

          // 提交表单
          service.put
            (this.$store.state.serverURL+"/users", {
              id: this.user.id,
              userName: this.user.username,
              // email: this.$userinfo.usermail,
              phone: this.user.userphone
            }).then(res => {
              console.log("修改数据", res)
              if (res.code == '-1') {
                alert("数据提交异常请重新提交~")
              }
              else {
                console.log("修改数据后", this.user.username)
                localStorage.setItem('username', this.user.username)
                localStorage.setItem('userphone', this.user.userphone)
                alert(this.user.username)
                // this.$router.push("/personal/showinfo")
              }
            })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  }

}
</script>

<style scoped>
.el-input {
  width: 200px;
}
</style>

