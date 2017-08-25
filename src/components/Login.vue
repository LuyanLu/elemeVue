<template>
  <div class="login-box">
    <back-bar title="登录"></back-bar>
    <div class="input-login">
      <input type="search" v-model="uname" placeholder="用户名" maxlength="18" autocapitalize="off">
      <input type="password" @keydown.enter="checkLogin" v-model="pwd" placeholder="密码" maxlength="18">
      <button @click="checkLogin">登录</button>
    </div>
  </div>
</template>

<script>
  import backBar from './smallComponents/backBar'
  import { mapGetters } from 'vuex'
  export default {
    name: 'login',
    components: {
      backBar
    },
    data () {
      return {
        uname: '',
        pwd: ''
      }
    },
    mounted () {
      if (this.getLogin) {
        this.$router.replace('/myzone')
      }
    },
    computed: {
      ...mapGetters([
        'getLogin',
        'getuname',
        'getpwd'
      ])
    },
    methods: {
      checkLogin () {
        if (this.uname === '' || this.pwd === '') {
          alert('用户名或密码不能为空')
          return
        }
        if (this.uname !== this.getuname || this.pwd !== this.getpwd) {
          alert('用户名或密码错误')
        } else {
          this.$store.dispatch('setLogin', true)
          this.$router.replace('/myzone')
        }
      }
    }
  }
</script>

<style lang="less">
  .login-box {
    width: 10rem;
    .input-login {
      margin-top: 1.35rem;
      input {
        display: block;
        width: 10rem;
        height: 1rem;
        padding: .6rem;
        box-sizing: border-box;
        border: none;
        outline: none;
        font-size: .45rem;
      }
      button {
        display: block;
        margin: .6rem auto;
        width: 9rem;
        height: 1rem;
        font-size: .5rem;
        color: #fff;
        background: #4cd964;
        border: none;
        outline: none;
        border-radius: .1rem;
      }
    }
  }
</style>
