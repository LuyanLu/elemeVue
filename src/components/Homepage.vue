<template>
<div class="index-main" v-if="showMe">
  <div class="index-header">
    <div class="index-location">
      <div class="location-left ell">
        <svg class="v-md">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
        </svg>
        <span class="v-md">您的位置xx市xx区xx街xxxxxxxxxxxxxxxxxxxxxxxx</span>
      </div>
      <div class="index-login" v-if="!login">
        <router-link to="/login">登录</router-link>
      </div>
    </div>
    <div class="search-box">
      <input type="text" v-model="searchWord" @keydown.enter="enterSearch" placeholder="搜索商家、商品">
    </div>
    <div class="hot-word">
      <router-link v-for="word in falseHotWord" :key="word.title" :to="'/search/' + word.search_word">
        <span>{{ word.title }}</span>
      </router-link>
    </div>
  </div>
  <my-swiper></my-swiper>
  <h3 class="index-title">推荐商家</h3>
  <one-business v-for="n in falseBusinessBrief" :key="n.id" :business="n"></one-business>
  <fixed-nav></fixed-nav>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import oneBusiness from './smallComponents/oneBusiness'
  import fixedNav from './smallComponents/fixedNav'
  import mySwiper from './smallComponents/swiper'

  export default {
    name: 'homepage',
    data () {
      return {
        showMe: false,
        searchWord: ''
      }
    },
    mounted () {
      this.$store.dispatch('setLoading', true)
      let time = Math.floor(Math.random() * 2000)
      setTimeout(() => {
        this.$store.dispatch('setLoading', false)
        this.showMe = true
      }, time)
    },
    components: {
      oneBusiness,
      fixedNav,
      mySwiper
    },
    created () {
      this.fetchFalseHotWord()
      this.fetchFalseBusinessBrief()
    },
    computed: {
      ...mapGetters({
        login: 'getLogin',
        falseHotWord: 'getFalseHotWord',
        falseBusinessBrief: 'getFalseBusinessBrief'
      })
    },
    methods: {
      ...mapActions([
        'fetchFalseHotWord',
        'fetchFalseBusinessBrief'
      ]),
      enterSearch () {
        this.$router.push('/search/' + this.searchWord)
      }
    }
  }
</script>

<style lang="less">
  @baseBlue: #0096ff;
  @comGray1: #666;
  @comGray2: #999;
  .com_gray1{
    color:@comGray1;
  }
  .com_gray2{
    color:@comGray2;
  }
  .com_blue{
    color:@baseBlue;
  }

  .index-main {
    width: 10rem;
    .index-header {
      height: 3rem;
      padding: .26rem;
      box-sizing: border-box;
      background: @baseBlue;
      overflow: hidden;
      .index-location {
        height: .9rem;
        color: #fff;
        font-size: .4rem;
        .location-left {
          width: 8rem;
          svg {
            width: .5rem;
            height: .5rem;
          }
        }
        .index-login {
          position: absolute;
          top: 0;
          right: 0;
          height: 1rem;
          font-size: .35rem;
          line-height: 1rem;
          padding: 0 .2rem;
          a {
            color: #fff;
          }
        }
      }
      .search-box {
        width: 9rem;
        height: .9rem;
        margin: 0 auto;
        input {
          display: block;
          width: 100%;
          height: .9rem;
          border: none;
          border-radius: .45rem;
          outline: none;
          font-size: .4rem;
          text-align: center;
        }
      }
      .hot-word {
        height: 1.2rem;
        font-size: .3rem;
        line-height: .9rem;
        overflow-x: auto;
        white-space: nowrap;
        span {
          padding: 0 .1rem;
          color: #fff;
        }
      }
    }
    .index-title {
      line-height: .8rem;
      font-weight: 600;
      font-size: .4rem;
      background: #fff;
      border-top: .2rem solid #eee;
      padding-left: .4rem;
    }
  }
</style>
