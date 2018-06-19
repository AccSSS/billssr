<template>
    <div>
      <el-container>
        <el-header class="header">
          <el-row>
            <el-col :span="12">
              FORKROAD
            </el-col>
            <el-col :span="12" class="link-contaienr">
              <!-- <span class="href">{{username}}</span> -->
              <nuxt-link to="/main" class="href">总览</nuxt-link>
              <nuxt-link to="/addNewBill" class="href">新增</nuxt-link>
              <nuxt-link to="/per" class="href">结算</nuxt-link>
              <span class="href" @click="signout">退出</span>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <nuxt/>
        </el-main>
      </el-container>
    </div>
</template>
<script>
import { getName } from '../utils/auth.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username? state.user.username : getName()
    })
  },
  methods: {
    signout() {
      this.$store.dispatch('signout').then((res)=> {
        if(res.code === '0000') {
          if (process.browser) {
            window.location = window.location.origin;     
          }  
        }
      })
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.header {
  background:#333;
  color:#fff;
  line-height: 60px;
}

.link-contaienr {
  text-align: right;
}

.href {
  color: #ccc;
  margin-right: 10px;
  text-decoration:none;
}

.href:hover {
  color:#fff;
  text-decoration:underline;  
}
</style>
