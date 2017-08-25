<template>
  <div v-if="showMe">
    <back-bar title="订单"></back-bar>
    <div class="order-box">
      <div class="order-one" v-for="(item, index) in getFalseOrder" :key="index">
        <div class="order-img">
          <img src="../../static/images/shop-logo.png" alt="">
        </div>
        <div class="order-info">
          <header class="order-info-title">
            <div class="order-info-name flex_align">
              <p class="busi-name">{{ item.store_name }}</p>
              <p class="busi-status">{{ item.order_state }}</p>
            </div>
            <p class="order-time">{{ item.order_birth_time }}</p>
          </header>
          <footer class="order-info-msg flex_align">
            <p class="order-brief-info">{{ item.order_brief_info }}</p>
            <p class="order-price">{{ item.order_price }}</p>
          </footer>
        </div>
      </div>
    </div>
    <fixed-nav></fixed-nav>
  </div>
</template>

<script>
  import fixedNav from './smallComponents/fixedNav'
  import backBar from './smallComponents/backBar'
  import { mapGetters } from 'vuex'
  export default {
    name: 'order',
    components: {
      fixedNav,
      backBar
    },
    computed: {
      ...mapGetters([
        'getLogin',
        'getFalseOrder'
      ])
    },
    data () {
      return {
        showMe: false
      }
    },
    created () {
      if (!this.getLogin) {
        this.$router.replace('/login')
      } else {
        this.$store.dispatch('setLoading', true)
        let time = Math.floor(Math.random() * 2000)
        setTimeout(() => {
          this.$store.dispatch('setLoading', false)
          this.$store.dispatch('setWhichPage', 'order')
          this.$nextTick(() => {
            this.showMe = true
          })
        }, time)
      }
    }
  }
</script>

<style lang="less">
  .order-box {
    margin: 1rem 0 1.2rem;
    .order-one {
      margin-bottom: .2rem;
      background: #fff;
      .order-img {
        float: left;
        width: 1rem;
        height: 1rem;
        padding: .2rem .4rem;
        img {
          width: 100%;
        }
      }
      .order-info {
        margin-left: 1.6rem;
        padding: .2rem .2rem 0 0;
        box-sizing: border-box;
        header.order-info-title {
          border-bottom: 1px solid #eee;
          .order-info-name {
            height: .6rem;
            line-height: .6rem;
            .busi-name {
              font-size: .4rem;
            }
            .busi-status {
              font-size: .35rem;
              color: #333;
            }
          }
          .order-time {
            font-size: .3rem;
            color: #999;
            line-height: .6rem;
          }
        }
        footer.order-info-msg {
          padding: .2rem 0;
          .order-brief-info {
            font-size: .35rem;
            color: #666;
          }
          .order-price {
            font-size: .35rem;
          }
        }
      }
    }
  }
</style>
