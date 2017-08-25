<template>
  <div class="back-box">
    <div class="back-svg" @click="backOne">
      <svg>
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left.6f6409e"></use>
      </svg>
    </div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'back-bar',
    props: ['title'],
    methods: {
      backOne () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less">
  .back-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 1rem;
    width: 10rem;
    background: #0096ff;
    .back-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 1rem;
      height: 1rem;
      svg {
        width: .6rem;
        height: .6rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -.3rem;
        margin-left: -.3rem;
      }
    }
    h3 {
      font-size: .52rem;
      text-align: center;
      color: #fff;
      font-weight: 700;
      line-height: 1rem;
    }
  }
</style>
