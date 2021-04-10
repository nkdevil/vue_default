import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
// import '@/util/dayjs.js';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 로그인 필수페이지
    if (!store.state.example.test) {
      // 토큰이 없다면 홈으로 이동
      next({ name: 'home' })
    }
  }
  next()
})

Vue.mixin({
  methods: {
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
