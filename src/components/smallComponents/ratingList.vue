<template>
  <section class="business-rating" :style="{ height: computedContentHeight + 'px' }">
    <div class="total-evaluate">
      <div class="total-code">
        <h3>{{ businessInfo.shop_rating }}</h3>
        <p class="p1">综合评价</p>
        <p class="p2"><span v-if="businessInfo.high_or_low">高</span><span v-if="!businessInfo.high_or_low">低</span>于周边商家{{ businessInfo.h_l_percent }}%</p>
      </div>
      <div class="detail-code">
        <p>
          <span class="small-title v-md">服务态度</span>
          <yellow-star :code="4.5"></yellow-star>
          <span class="orange-code v-md">{{ businessInfo.service_code }}</span>
        </p>
        <p>
          <span class="small-title v-md">菜品评价</span>
          <yellow-star :code="4.5"></yellow-star>
          <span class="orange-code v-md">{{ businessInfo.foods_code }}</span>
        </p>
        <p>
          <span class="small-title">送达时间</span>
          <span style="margin-left: .1rem;">{{ businessInfo.estimate_time }}分钟</span>
        </p>
      </div>
    </div>
    <div class="comment" v-for="(item, index) in businessInfo.evaluate" :key="index">
      <div class="user-img">
        <img src="../../assets/slider-pic2.jpeg" alt="">
      </div>
      <div class="user-comment">
        <div class="comment-title flex_align">
          <p class="user-name">{{ item.username }}</p>
          <p class="user-time">{{ item.time }}</p>
        </div>
        <div class="comment-star">
          <yellow-star :code="item.evaluate_code"></yellow-star>
          <span class="v-md">{{ item.send_time }}分钟送达</span>
        </div>
        <p class="comment-content">{{ item.evaluate_details }}</p>
      </div>
    </div>
  </section>
</template>

<script>
  import yellowStar from '../smallComponents/yellowStar'
  export default {
    name: 'ratingList',
    components: {
      yellowStar
    },
    props: {
      computedContentHeight: {
        type: Number
      },
      businessInfo: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="less">
  .business-rating {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .total-evaluate {
      background: #fff;
      padding-bottom: .2rem;
      margin-bottom: .25rem;
      .total-code {
        float: left;
        width: 2.6rem;
        padding: .2rem;
        text-align: center;
        border-right: 1px solid #ccc;
        h3 {
          font-size: .8rem;
          font-weight: 400;
          line-height: 100%;
          color: #f60;
        }
        >.p1 {
          font-size: .3rem;
          color: #666;
        }
        >.p2 {
          font-size: .25rem;
          color: #aaa;
        }
      }
      .detail-code {
        margin-left: 3rem;
        padding: .2rem .4rem;
        p {
          font-size: .3rem;
          color: #666;
          .small-title {
            margin-right: .2rem;
          }
          .orange-code {
            color: #f60;
            padding-left: .2rem;
            font-size: .4rem;
          }
        }
      }
    }
    .comment {
      padding: .2rem;
      background: #fff;
      border-bottom: 1px solid #ddd;
      .user-img {
        float: left;
        width: 1rem;
        height: 1rem;
        padding: .2rem;
        img {
          width: 100%;
        }
      }
      .user-comment {
        margin-left: 1.4rem;
        padding-right: .2rem;
        .comment-title {
          line-height: .7rem;
          .user-name {
            font-size: .4rem;
          }
          .user-time {
            color: #999;
            font-size: .35rem;
          }
        }
        .comment-star {
          font-size: .3rem;
        }
        .comment-content {
          padding: .1rem 0;
          font-size: .35rem
        }
      }
    }
  }
</style>
