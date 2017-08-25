<template>
  <section class="business-content" :style="{ height: computedContentHeight + 'px' }">
    <ul class="business-left" ref="leftUl">
      <li v-for="(item, index) in businessInfo.commodity" :key="index"
          :class="{activeli: index === 0}"
          @click="leftControlRightScroll(index)">
        {{ item.name }}
        <p class="left-red" v-if="redNum[item.type_accumulation]">{{ redNum[item.type_accumulation] }}</p>
      </li>
    </ul>
    <ul class="business-right" ref="rightUl">
      <li v-for="(n, index) in businessInfo.commodity" :key="index">
        <header class="type-title ell">
          <strong class="ell">{{ n.name }}</strong>
          <span>{{ n.description }}</span>
        </header>
        <section class="single-commodity" v-for=" (x, index) in n.foods " :key="index">
          <div class="food-img">
            <img src="../../../static/images/slider-pic/slider-pic1.jpeg" alt="">
          </div>
          <div class="food-msg">
            <h4>{{ x.name }}</h4>
            <p class="tips">{{ x.tips }}</p>
            <p>月售{{ x.month_sales }}份，好评率{{ x.satisfy_rate }}</p>
            <div class="add-remove">
              <span>￥{{ x.unit_price }}</span>
              <div class="add-remove-button">
                <svg @click="reduceFood(x.one_food_id)"
                     v-if="shoppingCarList[x.one_food_id]">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
                <span class="commodity-count" v-if="shoppingCarList[x.one_food_id]">{{ shoppingCarList[x.one_food_id].count }}</span>
                <svg @click="addFood(n, x, $event)">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'commodityList',
    props: {
      computedContentHeight: {
        type: Number
      },
      businessInfo: {
        type: Object,
        default: {}
      },
      shoppingCarList: {
        type: Object,
        default: {}
      },
      redNum: {
        type: Object,
        default: {}
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.rightControlLeftClass()
      })
    },
    methods: {
      rightControlLeftClass () {
        let leftUl = this.$refs.leftUl
        let rightUl = this.$refs.rightUl
        let leftLi = leftUl.getElementsByTagName('li')
        let rightTitle = rightUl.querySelectorAll('.type-title')
        let asIndex = 0
        rightUl.addEventListener('scroll', () => {
          for (let i = 0; i < rightTitle.length; i++) {
            if (rightUl.scrollTop >= rightTitle[i].offsetTop - window.innerWidth / 10 * 4.2) {
              asIndex = i
            }
          }
          for (let j = 0; j < leftLi.length; j++) {
            leftLi[j].classList.remove('activeli')
          }
          leftLi[asIndex].classList.add('activeli')
        })
      },
      leftControlRightScroll (index) {
        function scrollMove (ele, target) {
          let vector = Math.round((target - ele.scrollTop) / 10)
          let scrollTimer = setInterval(() => {
            ele.scrollTop += vector
            if (((ele.scrollTop >= target) && vector > 0) || ((ele.scrollTop <= target) && vector < 0) || ((ele.scrollTop + ele.clientHeight + 1) >= ele.scrollHeight)) {
              ele.scrollTop = target + 1
              clearInterval(scrollTimer)
            }
          }, 1000 / 100)
        }
        let rightUl = this.$refs.rightUl
        let rightTo = rightUl.querySelectorAll('.type-title')[index].offsetTop - window.innerWidth / 10 * 4.2
        console.log(rightTo)
        scrollMove(rightUl, rightTo)
      },
      addFood (n, x, e) {
        this.$emit('addFood', n, x, e)
      },
      reduceFood (id) {
        this.$emit('reduceFood', id)
      }
    }
  }
</script>

<style lang="less">
  .business-content {
    ul {
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      height: 100%;
      &.business-left {
        width: 2.5rem;
        float: left;
        li {
          position: relative;
          padding: .45rem .3rem;
          font-size: .4rem;
          border-bottom: 1px solid #ccc;
          &:last-of-type {
            padding-bottom: 1.2rem;
          }
          .left-red {
            position: absolute;
            top: .1rem;
            right: .1rem;
            display: block;
            width: .4rem;
            height: .4rem;
            font-size: .3rem;
            text-align: center;
            color: #fff;
            background: #ff461d;
            border-radius: 50%;
          }
          &.activeli {
            background: #fff;
            &:after {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: .1rem;
              height: 100%;
              background: #3190e8;
            }
          }
        }
      }
      &.business-right {
        margin-left: 2.5rem;
        background: #fff;
        &:last-child(li)>section {
          padding-bottom: 1.2rem;
        }
        li {
          &:last-of-type {
            padding-bottom: 1.2rem;
          }
          .type-title {
            padding: .2rem;
            box-sizing: border-box;
            width: 100%;
            background: #f1f1f1;
            line-height: .6rem;
            strong {
              font-size: .45rem;
              color: #666;
            }
            span {
              font-size: .3rem;
              color: #999;
            }
          }
          .single-commodity {
            background: #fff;
            padding: .3rem;
            border-bottom: 1px solid #ccc;
            .food-img {
              float: left;
              width: 1.5rem;
              height: 1.5rem;
              img {
                width: 100%;
              }
            }
            .food-msg {
              margin-left: 1.7rem;
              h4 {
                font-size: .5rem;
              }
              p {
                font-size: .4rem;
                color: #666;
                &.tips {
                  font-size: .32rem;
                  color: #999;
                }
              }
              .add-remove {
                margin-top:.2rem;
                height:.5rem;
                line-height:.5rem;
                font-size:.4rem;
                span {
                  font-size:.45rem;
                  font-weight: 600;
                  color:#f60;
                  vertical-align:middle;
                }
                .add-remove-button {
                  float: right;
                  svg {
                    width:.5rem;
                    height:.5rem;
                    fill:#3190e8;
                    vertical-align:middle;
                  }
                  .commodity-count {
                    color: #666;
                    margin: 0 .15rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
