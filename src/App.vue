<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="loading-jump" v-if="isLoading">
      <div class="loading-jump1"></div>
      <div class="loading-jump2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    isLoading () {
      return this.$store.getters.getLoading
    }
  }
}
</script>

<style lang="less">
  @import "./css/common.less";
  .loading-jump {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -.5rem;
    margin-left: -.5rem;
    width: 1rem;
    height: 1rem;
    .loading-jump1 {
      position: absolute;
      width: 1rem;
      height: 1rem;
      background-image: url('../static/images/loading.png');
      background-size: 100% auto;
      background-position: 0 -1rem;
      -webkit-animation: load-animate 3.6s steps(6) infinite,
                         up-down .8s infinite;
      animation: load-animate 3.6s steps(6) infinite,
                 up-down .8s infinite;
    }
    .loading-jump2 {
      position: absolute;
      bottom: -.3rem;
      width: 1rem;
      height: .7rem;
      background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZWxsaXBzZSBjeD0iNDgiIGN5PSIxMi40NjMiIGZpbGw9IiNEM0U2RkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgcng9IjQ3Ljg5IiByeT0iMTIuMzY5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyIDM4KSIvPjwvc3ZnPg==') no-repeat;
      background-size: 100% auto;
      -webkit-animation: up-down-big-small .8s infinite;
      animation: up-down-big-small .8s infinite;
    }
  }
  @-webkit-keyframes load-animate {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 -6rem;
    }
  }
  @keyframes load-animate {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 -6rem;
    }
  }
  @-webkit-keyframes up-down {
    0% {
      -webkit-transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(-1rem);
    }
    100% {
      -webkit-transform: translateY(0);
    }
  }
  @keyframes up-down {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  @-webkit-keyframes up-down-big-small {
    0% {
      -webkit-transform: translateY(0) scale(1);
    }
    50% {
      -webkit-transform: translateY(.2rem) scale(.4);
    }
    100% {
      -webkit-transform: translateY(0) scale(1);
    }
  }
  @keyframes up-down-big-small {
    0% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(.2rem) scale(.4);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .2s;
  }
  .router-fade-enter, .router-fade-leave-to {
    opacity: 0;
  }
</style>
