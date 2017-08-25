<template>
  <div class="business-box" v-if="showMe">
    <section class="business-top">
      <div class="blur-mask"></div>
      <div class="top-wrapper">
        <div class="top-img">
          <img src="../../static/images/shop-logo.png" alt="">
        </div>
        <div class="top-word">
          <h3 class="ell">{{ businessInfo.shop_name }}</h3>
          <p class="ell"><span v-if="businessInfo.fengniao">蜂鸟配送</span><span v-else>商家配送</span>／{{ businessInfo.estimate_time }}分钟送达／配送费￥{{ businessInfo.send_cost }}</p>
          <p class="ell">公告：{{ businessInfo.notice }}</p>
        </div>
        <p class="shop-activity ell"><i class="new-user">减</i><span>{{ businessInfo.discount }}</span></p>
      </div>
    </section>
    <section class="change-show-type">
      <div>
        <span :class="{activityShow: changeShowType === 'food'}" @click="changeShowType = 'food'">商品</span>
      </div>
      <div>
        <span :class="{activityShow: changeShowType === 'rating'}" @click="changeShowType = 'rating'">评价</span>
      </div>
    </section>
    <commodity-list v-show="changeShowType === 'food'"
                    :computedContentHeight="computedContentHeight"
                    :businessInfo="businessInfo"
                    :shoppingCarList="shoppingCarList"
                    :redNum="redNum"
                    @addFood="addFood"
                    @reduceFood="reduceFood"
    ></commodity-list>
    <rating-list v-show="changeShowType === 'rating'"
                 :computedContentHeight="computedContentHeight"
                 :businessInfo="businessInfo"
    ></rating-list>
    <shopping-car v-show="changeShowType === 'food'" ref="spCar"
                  :businessInfo="businessInfo"
                  :shoppingCarList="shoppingCarList"
                  :shoppingCarShow="shoppingCarShow"
                  :allNum="allNum"
                  :totalPrice="totalPrice"
                  @reduceFood="reduceFood"
                  @addShoppingCar="addShoppingCar"
                  @checkout="checkout"
                  @carIconClick="carIconClick"
                  @clearShoppingCar="clearShoppingCar"
    ></shopping-car>
    <section class="alert-box" v-if="alertBoxShow">
      <header>支付确认</header>
      <div class="all-price">
        需支付￥{{ allTotalPrice }}
      </div>
      <footer>
        <div class="double-btn" @click="alertBoxShow = false">取消</div>
        <div class="double-btn" @click="paySuccess">支付</div>
      </footer>
    </section>
    <div class="mask" v-if="alertBoxShow || shoppingCarShow"
         @click="alertBoxShow = false;shoppingCarShow = false"></div>
  </div>
</template>

<script>
  import commodityList from './smallComponents/commodityList'
  import ratingList from './smallComponents/ratingList'
  import shoppingCar from './smallComponents/shoppingCar'
  export default {
    name: 'business',
    components: {
      commodityList,
      ratingList,
      shoppingCar
    },
    data () {
      return {
        showMe: false,
        computedContentHeight: window.innerHeight - (window.innerWidth / 10 * 4.2),
        changeShowType: 'food',
        shoppingCarList: {},
        redNum: {},
        allNum: 0,
        totalPrice: 0,
        allTotalPrice: 0,
        shoppingCarShow: false,
        alertBoxShow: false
      }
    },
    computed: {
      isLogin () {
        return this.$store.getters.getLogin
      },
      businessInfo () {
        return this.$store.getters.getFalseBusinessInfo[this.$route.params.id]
      }
    },
    created () {
      this.$store.dispatch('setLoading', true)
      let time = Math.floor(Math.random() * 2000)
      setTimeout(() => {
        this.$store.dispatch('setLoading', false)
        this.$store.dispatch('fetchFalseBusinessInfo')
        this.showMe = true
      }, time)
      window.addEventListener('resize', this.watchHeight)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.watchHeight)
    },
    methods: {
      watchHeight () {
        clearTimeout(heightTimer)
        let heightTimer = setTimeout(() => {
          this.computedContentHeight = window.innerHeight - (window.innerWidth / 10 * 4.2)
        }, 100)
      },
      addFood (n, x, e) {
        this.$nextTick(() => {
          this.$refs.spCar.drop(e.target)
        })
        this.addShoppingCar(n.type_accumulation, n.name, x.name, x.one_food_id, x.unit_price)
      },
      addShoppingCar (type, typename, foodname, foodid, foodprice) {
        if (!this.shoppingCarList[foodid]) {
          this.shoppingCarList[foodid] = {
            'type_accumulation': type,
            'type_name': typename,
            'name': foodname,
            'one_food_id': foodid,
            'unit_price': foodprice,
            'count': 1
          }
        } else {
          this.shoppingCarList[foodid].count++
        }
        this.changeComputeAll()
      },
      reduceFood (foodid) {
        if (this.shoppingCarList && this.shoppingCarList[foodid].count > 0) {
          this.shoppingCarList[foodid].count--
          this.shoppingCarList[foodid].count <= 0 && delete this.shoppingCarList[foodid]
        }
        this.changeComputeAll()
      },
      changeComputeAll () {
        this.redNum = {}
        this.allNum = 0
        this.totalPrice = 0
        for (let x in this.shoppingCarList) {
          let type = this.shoppingCarList[x].type_accumulation
          if (!this.redNum[type]) {
            this.redNum[type] = this.shoppingCarList[x].count
          } else {
            this.redNum[type] += this.shoppingCarList[x].count
          }
        }
        for (let j in this.redNum) {
          this.allNum += this.redNum[j]
        }
        for (let y in this.shoppingCarList) {
          this.totalPrice += this.shoppingCarList[y].count * this.shoppingCarList[y].unit_price
        }
        this.allTotalPrice = this.totalPrice + this.businessInfo.send_cost
      },
      carIconClick () {
        this.shoppingCarShow = !this.shoppingCarShow
        this.alertBoxShow = false
      },
      clearShoppingCar () {
        this.shoppingCarList = {}
        this.changeComputeAll()
        this.shoppingCarShow = false
      },
      checkout () {
        if (this.totalPrice < this.businessInfo.start_send) {
          return
        }
        this.alertBoxShow = true
        this.shoppingCarShow = false
      },
      paySuccess () {
        if (!this.isLogin) {
          alert('未登录')
          return
        }
        let date = new Date()
        let prevNum = (n) => ('00' + n).slice(-2)
        let year = date.getFullYear()
        let month = prevNum(date.getMonth() + 1)
        let day = prevNum(date.getDate())
        let hour = prevNum(date.getHours())
        let mins = prevNum(date.getMinutes())
        let orderTime = `${year}-${month}-${day} ${hour}:${mins}`
        let headerWord = () => {
          for (let s in this.shoppingCarList) {
            return this.shoppingCarList[s].name
          }
        }
        let footerWord = this.allNum > 1 ? `等${this.allNum}件商品` : ''
        let orderBriefInfo = headerWord() + footerWord
        let order = {
          'restaurant_id': this.businessInfo.id,
          'img_src': '',
          'store_name': this.businessInfo.shop_name,
          'order_birth_time': orderTime,
          'order_state': '订单已完成',
          'order_content': this.shoppingCarList,
          'order_brief_info': orderBriefInfo,
          'order_price': this.allTotalPrice
        }
        this.$store.dispatch('setOrder', order)
        this.$router.replace('/order')
      }
    }
  }
</script>

<style lang="less">
  .business-box {
    width: 100%;
    height: 100%;
    .business-top {
      position: relative;
      height: 3rem;
      .blur-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../static/images/shop-logo.png) no-repeat center;
        background-size: cover;
        filter: blur(.08rem);
        z-index: 1;
      }
      .top-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: .3rem;
        box-sizing: border-box;
        z-index: 2;
        .top-img {
          img {
            float: left;
            width: 1.8rem;
            height: 1.8rem;
            border-radius: .1rem;
          }
        }
        .top-word {
          margin-left: 2rem;
          color: #fff;
          h3 {
            font-size: .7rem;
          }
          p {
            font-size: .37rem;
          }
        }
        .shop-activity {
          font-size: .3rem;
          color: #fff;
          line-height: .8rem;
          .new-user {
            display: inline-block;
            width: .35rem;
            height: .35rem;
            margin-right: .1rem;
            background: rgb(240, 115, 115);
            font-size: .25rem;
            font-style: normal;
            text-align: center;
            vertical-align: middle;
            line-height: .32rem;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }
    .change-show-type {
      height: 1.2rem;
      div {
        float: left;
        width: 50%;
        height: 1.2rem;
        background: #fff;
        font-size: .45rem;
        line-height: 1.2rem;
        text-align: center;
        span {
          &.activityShow {
            color: #3190e8;
            border-bottom: .05rem solid #3190e8;
            padding: .1rem .05rem;
          }
        }
      }
    }
    .alert-box {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8rem;
      transform: translate3d(-50%, -50%, 0);
      font-size: .4rem;
      background: #fff;
      border-radius: .14rem;
      text-align: center;
      z-index: 10;
      header {
        font-size: .45rem;
        padding: .3rem;
      }
      .all-price {
        height: 2.5rem;
        line-height: 2.5rem;
        border-top: .025rem solid #eee;
        border-bottom: .025rem solid #eee;
      }
      footer {
        height: 1.3rem;
        .double-btn {
          float: left;
          width: 50%;
          height: 1.3rem;
          line-height: 1.3rem;
          &:last-of-type {
            background: #4cd964;
            color: #fff;
          }
        }
      }
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      z-index: 3;
    }
  }
</style>
