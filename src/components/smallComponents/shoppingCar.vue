<template>
  <div>
    <section class="shopping-car">
      <div :class="['car-icon', {noting: !allNum}]"
           @click="carIconClick" ref="carIcon">
        <div class="tips-after" v-if="allNum !== 0">{{ allNum }}</div>
      </div>
      <div class="car-words">
        <h4>￥{{ totalPrice }}</h4>
        <p>配送费￥{{ businessInfo.send_cost }}</p>
      </div>
      <button :class="['cart-view', {cantpay: totalPrice < businessInfo.start_send}]"
              @click="checkout()">去结算</button>
    </section>
    <section class="sp-list" v-if="shoppingCarShow">
      <header>
        <span class="sp-words">购物车</span>
        <div class="empty">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
          </svg>
          <span @click="clearShoppingCar">清空</span>
        </div>
      </header>
      <ul class="sp-content">
        <li v-for="(item, index) in shoppingCarList" :key="index">
          <div class="food-name">{{ item.name }}</div>
          <div class="food-unit-price">￥{{ item.unit_price * item.count }}</div>
          <div class="food-num">
            <svg @click="reduceFood(item.one_food_id)">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
            </svg>
            <span class="commodity-count" >{{ item.count }}</span>
            <svg @click="addShoppingCar(item.type_accumulation, item.type_name, item.name, item.one_food_id, item.unit_price)">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
            </svg>
          </div>
        </li>
      </ul>
    </section>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shoppingCar',
    props: {
      businessInfo: {
        type: Object,
        default: {}
      },
      shoppingCarList: {
        type: Object,
        default: {}
      },
      shoppingCarShow: {
        type: Boolean,
        default: false
      },
      allNum: {
        type: Number,
        default: 0
      },
      totalPrice: {
        type: Number,
        default: 0
      }
    },
    mounted () {
      this.$refs.carIcon.addEventListener('animationend', () => {
        this.$refs.carIcon.classList.remove('duang')
      })
    },
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: []
      }
    },
    methods: {
      addShoppingCar (type, typename, foodname, foodid, foodprice) {
        this.$emit('addShoppingCar', type, typename, foodname, foodid, foodprice)
      },
      reduceFood (id) {
        this.$emit('reduceFood', id)
      },
      checkout () {
        this.$emit('checkout')
      },
      carIconClick () {
        this.$emit('carIconClick')
      },
      clearShoppingCar () {
        this.$emit('clearShoppingCar')
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - window.innerWidth / 10 * 0.4
            let y = -(window.innerHeight - rect.top - window.innerWidth / 10 * 0.3)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
            el.style.transform = `translate3d(0, ${y}px, 0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            inner.style.transform = `translate3d(${x}px, 0, 0)`
          }
        }
      },
      dropping (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = `translate3d(0, 0, 0)`
          el.style.transform = `translate3d(0, 0, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(0, 0, 0)`
          inner.style.transform = `translate3d(0, 0, 0)`
          el.addEventListener('transitionend', () => {
            this.$refs.carIcon.classList.add('duang')
          })
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          //  设display为none需手动触发html重绘：dropping函数中的let rf = el.offsetHeight
          el.style.display = 'none'
        }
      }
    }
  }
</script>

<style lang="less">
  @keyframes mymove {
    0% { transform: scale(1) }
    25% { transform: scale(.8) }
    50% { transform: scale(1.1) }
    75% { transform: scale(.9) }
    100% { transform: scale(1) }
  }
  .duang {
    animation: mymove 1s;
  }
  .shopping-car {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.2rem;
    background: #3d3d3f;
    padding-left: 2rem;
    box-sizing: border-box;
    z-index: 10;
    .car-icon {
      position: absolute;
      left: .2rem;
      top: -.25rem;
      width: 1.2rem;
      height: 1.2rem;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1OCA1OCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjUiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4wOCAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjRkZGIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiMyMDczQzEiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG9wYWNpdHk9Ii4xIiBtYXNrPSJ1cmwoI2MpIi8+PC9nPjxwYXRoIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJNOS4zNzQgMTguNzIyUzcuODY4IDExLjI4MyA3LjMyMyA4LjcxQzYuNzc4IDYuMTM2IDUuODYgNS4zMyAzLjk3OCA0LjUyIDIuMDk2IDMuNzEzLjM2NyAyLjI4Ni4zNjcgMi4yODYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjQ2IiBjeT0iNTEiIHI9IjQiIGZpbGw9IiNGRkYiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjUxIiByPSI0IiBmaWxsPSIjRkZGIi8+PC9nPjwvc3ZnPg==) #3190e8 center no-repeat;
      border: .12rem solid #444;
      border-radius: 50%;
      box-shadow: 0 -.08rem .053rem 0 rgba(0,0,0,.1);
      background-size:60% auto;
      &.noting {
        background-color:#444;
      }
      .tips-after {
        position: absolute;
        top: -.2rem;
        right: -.2rem;
        width: .5rem;
        height: .5rem;
        line-height: .45rem;
        font-size: .3rem;
        text-align: center;
        color: #fff;
        background: #ff461d;
        border-radius: 50%;
      }
    }
    .car-words {
      color: #fff;
      h4 {
        font-size: .5rem;
      }
      p {
        font-size: .3rem;
      }
    }
    .cart-view {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 .5rem;
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: .5rem;
      font-weight: 600;
      color: #fff;
      background: #4cd964;
      border: none;
      outline: none;
      &.cantpay {
        background: #535356;
      }
    }
  }
  .sp-list {
    position: absolute;
    bottom: 1.2rem;
    left: 0;
    width: 100%;
    background: #fff;
    font-size: .5rem;
    z-index: 9;
    header {
      padding: .25rem;
      height: .8rem;
      line-height: .8rem;
      color: #666;
      border-bottom: 1px solid #eee;
      .sp-words {
        font-size: .45rem;
        padding: 0 .15rem;
        border-left: .09rem solid #3190e8;
      }
      .empty {
        float: right;
        font-size: .4rem;
        svg {
          width: .5rem;
          height: .5rem;
          vertical-align: text-top;
        }
      }
    }
    ul.sp-content {
      max-height: 6.5rem;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      li {
        height: 1.3rem;
        line-height: 1.3rem;
        padding: 0 .3rem;
        border-bottom: 1px solid #eee;
        >div {
          float: left;
        }
        .food-name {
          width: 50%;
          font-size: .4rem;
        }
        .food-unit-price {
          width: 20%;
          text-align: right;
          color: #f60;
        }
        .food-num {
          width: 30%;
          text-align: right;
          svg {
            width: .5rem;
            height: .5rem;
            fill: #3190e8;
            vertical-align: middle;
          }
          .commodity-count {
            vertical-align: middle;
          }
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: .4rem;
      bottom: .3rem;
      z-index: 10;
      transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all .4s linear;
      }
    }
  }
</style>
