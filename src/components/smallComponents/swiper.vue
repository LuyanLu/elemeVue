<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(items, idx) in sliderList" :key="idx">
      <router-link v-for="(item, index) in items" :key="index" :to="'/search/'+item">
        <figure class="slider-pic">
          <img :src="'../../static/images/slider-pic/slider-pic'+(index+1)+'.jpeg'" alt="">
          <figcaption>{{ item }}</figcaption>
        </figure>
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true
        },
        sliderList: [['美食', '甜品饮品', '商店超市', '预定早餐', '果蔬生鲜', '新店特惠', '准时达', '夜宵'], ['土豪推荐', '鲜花蛋糕', '汉堡', '日韩料理', '麻辣烫', '披萨意面', '川湘菜', '包子粥店']]
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="less">
  .swiper-container {
    position: relative;
    width: 10rem;
    height: 4.2rem;
    padding-bottom: .5rem;
    background: #fff;
    .swiper-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-transition-property: -webkit-transform;
      transition-property: transform;
      box-sizing: content-box;
      .swiper-slide {
        float: left;
        text-align: center;
        font-size: .3rem;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex-shrink: 0;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        position: relative;
        figure {
          display: inline-block;
          width: 2.5rem;
          img {
            width: 1.2rem;
            height: 1.2rem;
            padding-top: .1rem;
          }
        }
      }
    }
    .swiper-pagination {
      bottom: .1rem;
      left: 0;
      width: 100%;
      position: absolute;
      text-align: center;
      -webkit-transition: .3s;
      transition: .3s;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      z-index: 10;
    }
    .swiper-pagination-bullet {
      width: .1rem;
      height: .1rem;
      margin: 0 .05rem;
      display: inline-block;
      border-radius: 100%;
      background: #000;
      opacity: 0.2;
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
      background: #007aff;
    }
  }
</style>
