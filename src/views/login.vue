<template>
  <div>
    <div class="banner">
      <div class="banner-left">
        <img :src="require('@/assets/loginImg.png')" alt="">
      </div>
      <div class="banner-right">
        <el-image
          class="logo"
          :src="require('@/assets/logo_txt.png')"
          fit="cover"
        ></el-image>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="login-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              class="user-name"
              v-model="ruleForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              class="user-name"
              show-password
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button class="login-btn" @click="goLogin()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { accountLoginNotify } from "@/api/login"

export default {
  data() {
    return {
      ruleForm: {
        // 用户名
        username: "",
        // 密码
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    }
  },

  mounted() {
    localStorage.removeItem('defaultMenu')
  },

  methods: {
    // 登录
    goLogin() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          return
        } else {
          let data = {
            account: this.ruleForm.username,
            password: this.ruleForm.password,
          };
          accountLoginNotify(data).then((res) => {
            if (res.code === 0) {
              localStorage.setItem("token", res.data.token)
              this.$store.commit('setUserInfo', res.data)
              this.$router.push({
                path: "/home",
              })
            } else {
              this.$message({
                message: res.msg,
                type: "error",
                duration: 2000,
              })
            }
          })
        }
      })
    },
  },
  created() {},
}
</script>

<style lang="less" scoped>
.banner {
  display: flex;
}

.banner-left {
  width: 13.3rem;
  height: 15rem;
  background: #d8d8d8;
  img{
    width: 100%;
    height: 100%;
  }
}

.banner-right {
  position: relative;
  flex: 1;
  background: #fff;
}

.logo {
  display: block;
  width: 3.5rem;
  height: 1.0667rem;
  margin: 0 auto;
  margin-top: 3.6333rem;
}

.login-ruleForm {
  width: 8.3333rem;
  margin: 0 auto;
  margin-top: 1.3rem;
}

.user-name {
  width: 5.1333rem;
  height: 0.8rem;
  border-radius: 0.0333rem;
  box-sizing: border-box;
}

.login-btn {
  display: block;
  width: 5.9667rem;
  height: 0.78rem;
  padding: 0.18rem 0.2667rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  border-radius: 0.0333rem;
  background: #a7b4ff;
}
</style>