<template>
  <div class="myzone-container">
    <back-bar title="我的"></back-bar>
    <div class="myzone-user clear">
      <img src="../assets/slider-pic1.jpeg" alt="">
      <div class="myzone-uid">
        <h3>{{ uname }}</h3>
        <p>188*****888</p>
      </div>
    </div>
    <div class="myzone-msg">
      <a class="msg-one">
        <p class="big-colorful">
          <span class="big" style="color: rgb(255, 153, 0);">0.00</span>
          <span class="small">元</span>
        </p>
        <p class="normal">余额</p>
      </a>
      <a class="msg-one border-lr">
        <p class="big-colorful">
          <span class="big" style="color: rgb(255, 95, 62);">3</span>
          <span class="small">个</span>
        </p>
        <p class="normal">优惠</p>
      </a>
      <a class="msg-one">
        <p class="big-colorful">
          <span class="big" style="color: rgb(106, 194, 11);">2408</span>
          <span class="small">分</span>
        </p>
        <p class="normal">积分</p>
      </a>
    </div>
    <router-link to="/order">
      <div class="myzone-bar first-item">
        <svg class="v-md">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order.070ae2a"></use>
        </svg>
        <span class="v-md">我的订单</span>
      </div>
    </router-link>
    <div class="myzone-bar">
      <svg class="v-md">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
      </svg>
      <span class="v-md">积分商城</span>
    </div>
    <div class="myzone-bar">
      <svg class="v-md">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eleme"></use>
      </svg>
      <span class="v-md">饿了么会员卡</span>
    </div>
    <div class="myzone-bar first-item">
      <svg class="v-md">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#discover.5811137"></use>
      </svg>
      <span class="v-md">服务中心</span>
    </div>
    <div class="myzone-bar">
      <svg class="v-md">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#index.18edf5a"></use>
      </svg>
      <span class="v-md">下载饿了么APP</span>
    </div>
    <fixed-nav></fixed-nav>
  </div>
</template>

<script>
  import fixedNav from './smallComponents/fixedNav'
  import backBar from './smallComponents/backBar'
  export default {
    name: 'myzone',
    components: {
      backBar,
      fixedNav
    },
    data () {
      return {
        uname: ''
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters.getLogin
      }
    },
    mounted () {
      if (!this.isLogin) {
        this.$router.replace('/login')
      } else {
        this.uname = this.$store.getters.getuname
        this.$store.dispatch('setWhichPage', 'myzone')
//        this.$store.dispatch('fetchFalseOrder')
      }
    }
  }
</script>

<style lang="less" scoped>
  .myzone-container {
    .myzone-user {
      width: 10rem;
      height: 3rem;
      margin-top: 1rem;
      padding: .8rem .4rem;
      box-sizing: border-box;
      background: #0097ff;
      img {
        float: left;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
      }
      .myzone-uid {
        float: left;
        margin-left: .5rem;
        color: #fff;
        h3 {
          font-size: .7rem;
        }
        p {
          font-size: .4rem;
        }
      }
    }
    .myzone-msg {
      display: table;
      width: 100%;
      height: 2.24rem;
      background: #fff;
      font-size: 0;
      border-bottom: 1px solid #ddd;
      .msg-one {
        display: table-cell;
        width: 33.333%;
        text-align: center;
        vertical-align: middle;
        &:nth-child(2) {
          box-sizing: border-box;
        }
        .big-colorful {
          line-height: .4rem;
          .big {
            font-size: .6rem;
            line-height: .6rem;
          }
          .small {
            font-size: .32rem;
            line-height: .32rem;
          }
        }
        .normal {
          font-size: .32rem;
          line-height: .37rem;
          color: #666;
        }
      }
      .border-lr {
        border-left: .01rem solid #ddd;
        border-right: .01rem solid #ddd;
      }
    }
    .myzone-bar {
      width: 10rem;
      height: 1.1rem;
      padding: 0 .4rem;
      box-sizing: border-box;
      background:#fff;
      font-size:.4rem;
      line-height:1.1rem;
      border-top:1px solid #dedede;
      svg {
        width: .4rem;
        height: .4rem;
      }
      span {
        margin-left:.2rem
      }
      &.first-item {
        margin-top: .3rem;
        border:none;
      }
    }
  }
</style>
