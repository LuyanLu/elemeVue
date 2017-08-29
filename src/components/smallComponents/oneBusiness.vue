<template>
  <router-link :to="'/business' + business.path">
    <section class="business-container">
      <section class="business-wrapper clear">
        <div class="business-pic">
          <img src="../../assets/shop-logo1.jpeg" alt="">
        </div>
        <div class="business-info">
          <section class="business-name clear">
            <h3 class="fl ell"><span v-if="business.brand">品牌</span>{{ business.shop_name }}</h3>
            <div class="name-icon fr">
              <span class="bpz" v-if="business.bao"><i>保</i></span>
              <span class="bpz" v-if="business.piao"><i>票</i></span>
              <span class="bpz" v-if="business.zhun"><i>准</i></span>
            </div>
          </section>
          <section class="business-code clear">
            <div class="code-num fl">
              <svg class="v-md">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating-star"></use>
              </svg>
              <span class="v-md">{{ business.shop_rating }}</span>
            </div>
            <div class="code-icon fr">
              <div class="zsd" v-if="business.on_time">准时达</div>
              <div class="fnzs" v-if="business.fengniao">蜂鸟专送</div>
            </div>
          </section>
          <section class="business-other clear">
            <div class="other-price fl">
              <span class="com_grey1">￥{{ business.start_send }}起送</span>
              <span>/</span>
              <span class="com_grey2">配送费约￥{{ business.send_cost }}</span>
            </div>
            <div class="other-time fr">
              <span class="com_grey2">{{ business.distance }}m</span>
              <span>/</span>
              <span class="com_blue">{{ business.estimate_time }}分钟</span>
            </div>
          </section>
        </div>
      </section>
    </section>
  </router-link>
</template>

<script>
  export default {
    name: 'one-business',
    props: {
      business: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style lang="less">
  @baseBlue: #0096ff;
  @com_gray1: #666;
  @com_gray2: #999;
  .com_gray1{
    color:@com_gray1;
  }
  .com_gray2{
    color:@com_gray2;
  }
  .com_blue{
    color:@baseBlue;
  }
  .business-wrapper {
    background: #fff;
    .business-pic {
      width: 1.6rem;
      height: 1.6rem;
      padding: .4rem;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .business-info {
      float: right;
      width: 7.4rem;
      height: 1.6rem;
      padding: .4rem .2rem .4rem 0;
      .business-name {
        font-size: .35rem;
        line-height: .45rem;
        vertical-align: top;
        h3 {
          width: 5rem;
          display: inline-block;
          span {
            margin-right: .04rem;
            padding: .02rem;
            vertical-align: top;
            font-size: .2rem;
            color: #52250a;
            background: #ffd930;
            border-radius: 2px;
          }
        }
        .bpz {
          display: inline-block;
          width: .3rem;
          height: .3rem;
          padding: .01rem;
          font-size: .26rem;
          line-height: .3rem;
          text-align: center;
          color: @com_gray2;
          border: .01rem solid #ddd;
          border-radius: 3px;
          i {
            font-style: normal;
          }
        }
      }
      .business-code, .business-other {
        font-size: .25rem;
        margin-top: .3rem;
        line-height: .25rem
      }
      .business-code {
        .code-num {
          svg {
            width: .3rem;
            height: .3rem;
            fill: #ffaa0c
          }
        }
        .code-icon {
          .zsd {
            display: inline-block;
            height: .35rem;
            padding: 0 0 .05rem;
            box-sizing: border-box;
            font-size: .25rem;
            line-height: .35rem;
            color: @baseBlue;
            background: #fff;
            border: .01rem solid @baseBlue;
            border-radius: 3px;
          }
          .fnzs {
            display: inline-block;
            height: .35rem;
            padding: 0 0 .05rem;
            box-sizing: border-box;
            font-size: .25rem;
            line-height: .3rem;
            color: #fff;
            background: @baseBlue;
            border: .01rem solid @baseBlue;
            border-radius: 3px;
          }
        }
      }
    }
  }
</style>
