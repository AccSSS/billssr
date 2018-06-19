<template>
  <section class="container">
    <el-card shadow="hover" class="card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
      <el-form-item label="用户名"  prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </section>
</template>

<script>
export default {
  head () {
      return {
          title: '登录',
      }
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('login', this.loginForm).then(res => {
              console.log(res);
              if(res.code === '0000') this.$router.push({path:'main'})
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
}
</script>

<style lang="scss">
.container {
  //min-height: 100vh;
  min-height: calc(100vh-80px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.card {
  width:300px;
}
</style>
