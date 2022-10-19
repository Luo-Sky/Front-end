<template>
  <div style="width: 70%;margin-top: 5%">
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="修改密码" prop="pass">
        <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认修改" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verify">

        <el-input placeholder="请输入验证码:" v-model.number="ruleForm.verify"></el-input>

      </el-form-item>
      <el-form-item>
        <el-button @click="getmailcode()">获取邮箱验证码</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import service from "@/userinfo/request"
export default {
  name: "countcontrol",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      setTimeout(() => {
        // 验证码验证
        if ((value) !== "216sadasdsad21352asdas55d5465sad@#sa2d6sa5") {
          callback(new Error('校验码错误'));
        } else {

          callback();

        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.length <= 6) {
          callback(new Error("密码长度不能低于6"))
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        verify: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        // verify: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      },
      user: {
        id:"",
        name: "",
        phone: "",
        email: "",
        password:"",
        checkPass:"",
        pcode: "",
      },
    };
  },

  created() {
    this.user.name = localStorage.getItem("username")
     this.user.phone = localStorage.getItem("userphone")
      this.user.email = localStorage.getItem("usermail")
       this.user.id = localStorage.getItem("ID")


  },


  methods: {
    getmailcode() {
      service
        .post("/auth/getEmailCode?mail=" + this.user.email + "&type=1")
        // .post("http://49.235.224.43:9090/auth/getEmailCode", {
        //   mail: this.user.email,
        // })
        .then(res => {
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


    },
    // 提交表单跟修改那块一样
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          console.log("修改密码中")
           // 提交表单
          service.put
            (this.$store.state.serverURL+"/users", {
              id: this.user.id,
              password: this.user.password,
              // email: this.$userinfo.usermail,
              phone: this.user.userphone
            }).then(res => {
              console.log("修改数据", res)
              if (res.code == '-1') {
                alert("数据提交异常请重新提交~")
              }
              else {
                console.log("修改数据后", this.user.password)
                localStorage.setItem('password', this.user.password)
          
                // this.$router.push("/personal/showinfo")
              }
            })


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
</style>

