<template>
  <div class="login-container">
    <div class="layout">
      <a-form-model
        :model="form"
        class="form-container"
        :wrapper-col="{ span: 22 }"
        ref="loginForm"
      >
        <div class="title">Vue Antd Admin</div>
        <div class="form-login">
          <a-form-model-item prop="username">
            <a-input
              v-model="form.username"
              placeholder="请输入账号 (admin or test or editor)"
              size="large"
              allow-clear
              @pressEnter="focusPassword"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="username">
            <a-input
              v-model="form.password"
              placeholder="请输入密码 (任意输入6位数字)"
              size="large"
              allow-clear
              @pressEnter="focusPassword"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-item style="margin-top:-7px">
            <a-button type="primary" block size="large" @click="toLogin">登录</a-button>
          </a-form-item>
        </div>
      </a-form-model>
    </div>
  </div>
</template>

<script>
const isDev = process.env.NODE_ENV === 'development';

export default {
  data() {
    return {
      form: {
        username: isDev ? 'admin' : '',
        password: isDev ? '12345678' : ''
      }
    };
  },
  methods: {
    focusPassword() {
      console.log(33);
    },
    toLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return;
        const f = { ...this.form };
        await this.$store.dispatch('login', f);
        // this.$router.replace('/index');
        window.location.reload();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background: url('https://img1.halobear.com/wedding/FtYK0N_7GBBKfNOJswNNkFnGPkSf.jpg') 100% 100%
    no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: relative;
  min-width: 1230px;
  .layout {
    width: 55%;
    min-width: 900px;
    margin: 0 auto;
    .form-container {
      width: 400px;
      height: 550px;
      margin: 0 auto;
      margin-right: 0;
      padding-top: calc(50vh - 249.5px);
      .title {
        font-weight: 700;
        font-size: 30px;
      }
      .form-login {
        margin: 20px 0;
      }
    }
  }
}
</style>