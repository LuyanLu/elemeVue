<template>
  <nav class="fixed-nav">
    <keep-alive>
      <router-link to="/">
        <div class="fixed-nav-item">
          <svg v-if="returnPageNow === 'homepage'">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#index.18edf5a"></use>
          </svg>
          <svg v-if="returnPageNow !== 'homepage'">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#index-regular.b245d60"></use>
          </svg>
          <span>外卖</span>
        </div>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link to="/order">
        <div class="fixed-nav-item">
          <svg v-if="returnPageNow === 'order'">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order.070ae2a"></use>
          </svg>
          <svg v-if="returnPageNow !== 'order'">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order-regular.41c17f8"></use>
          </svg>
          <span>订单</span>
        </div>
      </router-link>
    </keep-alive>
    <keep-alive>
      <router-link to="/myzone">
        <div class="fixed-nav-item">
          <svg v-if="returnPageNow === 'myzone'">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile.dbc5ebf"></use>
          </svg>
          <svg v-if="returnPageNow !== 'myzone'">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profile-regular.c151d62"></use>
          </svg>
          <span>我的</span>
        </div>
      </router-link>
    </keep-alive>
  </nav>
</template>

<script>
  export default {
    name: 'fixed-nav',
    computed: {
      returnPageNow () {
        return this.$store.getters.getwhichpage
      }
    }
  }
</script>

<style lang="less">
  .fixed-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    width: 10rem;
    height: 1.2rem;
    background: #fff;
    font-size: .28rem;
    z-index: 999;
    a {
      flex: 1;
    }
    .fixed-nav-item {
      height: 1.2rem;
      text-align: center;
      svg {
        display: block;
        width: .45rem;
        height: .45rem;
        margin: .2rem auto .1rem;
      }
    }
  }
</style>
