<template>
  <div v-if="showMe">
    <div class="re-search">
      <svg @click="$router.go(-1)">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left.6f6409e"></use>
      </svg>
      <input type="search" v-model="searchText" class="v-md" @keydown.enter="searchMethod" placeholder="请输入商品名称">
    </div>
    <one-business v-for="(item, index) in searchRes" :key="index" :business="item"></one-business>
  </div>
</template>

<script>
  import oneBusiness from './smallComponents/oneBusiness'
  export default {
    name: 'search',
    components: {
      oneBusiness
    },
    data () {
      return {
        showMe: false,
        searchText: '',
        searchRes: []
      }
    },
    computed: {
      businessBrief () {
        return this.$store.getters.getFalseBusinessBrief
      }
    },
    created () {
      this.$store.dispatch('setLoading', true)
      let time = Math.floor(Math.random() * 2000)
      setTimeout(() => {
        this.$store.dispatch('setLoading', false)
        this.$nextTick(() => {
          this.showMe = true
          this.searchMethod()
        })
      }, time)
    },
    methods: {
      searchMethod () {
        this.searchRes = []
        let mainWord = this.$route.params.keyword
        if (this.searchText !== '' && this.searchText !== mainWord) {
          this.$nextTick(() => {
            this.$router.replace('/search/' + this.searchText)
          })
          mainWord = this.searchText
        }
        this.searchText = mainWord
        for (let x in this.businessBrief) {
          if (this.businessBrief[x].shop_name.includes(mainWord)) {
            this.searchRes.push(this.businessBrief[x])
          }
        }
      }
    }
  }
</script>

<style lang="less">
  .re-search {
    background: #0096ff;
    line-height: 0;
    padding: .2rem;
    svg {
      width: .6rem;
      height: .6rem;
    }
    input[type="search"] {
      display: inline-block;
      height: .9rem;
      width: 8rem;
      outline: none;
      border: none;
      border-radius: .45rem;
      background: #f2f2f2;
      box-sizing: border-box;
      padding: 0 .5rem;
      font-size: .4rem;
    }
  }
</style>
