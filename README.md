# elemeVue

预览：http://samanthalu.site/elemeVue
> 使用 Vue全家桶，Less 完成的仿饿了么前端app，json模拟后端数据，实现登录、购物、查找等基本功能。

## 技术栈
- [vue](https://cn.vuejs.org/v2/guide/installation.html)（使用Vue-cli作为构建工具）
- [vue-router](https://router.vuejs.org/zh-cn/)
- [vuex](https://vuex.vuejs.org/zh-cn/)
- [axios](https://github.com/mzabriskie/axios)
- ES6
- [less](http://lesscss.cn/)
- [better-scroll](https://ustbhuangyi.github.io/better-scroll/doc/)
- [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)

## 项目组件
+ homePage首页
  - swiper轮播
  - oneBusiness商家简略信息
  - fixedNav导航
+ business商家页面
  - commodityList商品列表
  - ratingList评价列表
    - yellowStar星星评分
  - shoppingCar购物车
+ search搜索页面
  - oneBusiness
+ order订单页面
  - backBar返回框
  - fixedNav
+ login登录页面
  - backBar
+ myZone我的空间
  - backBar
  - fixedNav
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
