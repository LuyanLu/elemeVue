<template>
  <section class="business-content" :style="{ height: computedContentHeight + 'px' }">
    <div class="business-left" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in businessInfo.commodity" :key="index"
            :class="{activeli: currentIndex === index}" ref="menuList"
            @click="selectMenu(index, $event)">
          {{ item.name }}
          <p class="left-red" v-if="redNum[item.type_accumulation]">{{ redNum[item.type_accumulation] }}</p>
        </li>
      </ul>
    </div>
    <div class="business-right" ref="foodsWrapper">
      <ul>
        <li v-for="(n, index) in businessInfo.commodity" class="food-list-hook" :key="index">
          <header class="type-title ell">
            <strong class="ell">{{ n.name }}</strong>
            <span>{{ n.description }}</span>
          </header>
          <section class="single-commodity" v-for=" (x, index) in n.foods " :key="index">
            <div class="food-img">
              <img src="../../assets/slider-pic1.jpeg" alt="">
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
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
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
    data () {
      return {
        listHeight: [],
        scrollY: 0,
        index: 0
      }
    },
    computed: {
      currentIndex () {
        if (this.index !== 0) {
          return this.index
        }
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    watch: {
      currentIndex: function (val) {
        let menuList = this.$refs.menuList
        let el = menuList[val]
        this.menuScroll.scrollToElement(el, 300)
      }
    },
    created () {
      setTimeout(() => {
        this.initScroll()
        this.calculateHeight()
      }, 100)
    },
    methods: {
      addFood (n, x, e) {
        this.$emit('addFood', n, x, e)
      },
      reduceFood (id) {
        this.$emit('reduceFood', id)
      },
      initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        this.index = index
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodsList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      calculateHeight () {
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodsList.length; i++) {
          height += foodsList[i].clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="less">
  .business-content {
    overflow: hidden;
    .business-left, .business-right {
      -webkit-overflow-scrolling: touch;
      height: 100%;
    }
    .business-left {
        width: 2.5rem;
        float: left;
        li {
          position: relative;
          padding: .45rem .3rem;
          font-size: .4rem;
          border-bottom: 1px solid #ccc;
          &:last-of-type {
            padding-bottom: 1.5rem;
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
    .business-right {
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
</style>
