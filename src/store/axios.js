import $axios from 'axios'
import store from '@/store'
// import router from '@/router'

const CancelToken = $axios.CancelToken // 취소용 토큰 선언
let cancelSource
let axios = $axios.create({
  baseURL: `${window.location.origin}/`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
  },
  cancelToken: new CancelToken(function executor (c) {
    cancelSource = c // axios 생성시에 취소토큰도 같이 생성해준다
  }),
  withCredentials: true
})

axios.interceptors.request.use(
  function (config) {
    if (store.getters['auth/getLoginStatus']) {
      config.Authorization = `Bearer ${store.getters['auth/getLoginStatus']}`
    }
    return config
  }
)
// request 날릴때 항상 취소토큰을 자동으로 재할당받음

axios.interceptors.response.use(
  function (response) {
    return response;
  }, async function (error) {
    // 에러발생시
    // const originalRequest = error.config
    if (error.response && error.response.status) {
      // if (error.response.status === 401) {
      //   // 토큰 유효기간 만료
      //   cancelSource()
      //   router.push({ name: 'root' })
      // } else if (error.response.status === 419 && !originalRequest._retry) {
      // CSRF토큰을 사용할경우 아래와같이 작업
      //   // 419에러이면서 재시도가 아닐때
      //   originalRequest._retry = true
      //   const csrfToken = await refreshCSRFToken()
      //   // CSRF토큰을 갱신하여 재요청
      //   if (csrfToken) {
      //     originalRequest.headers['X-CSRF-TOKEN'] = csrfToken
      //     axios.defaults.headers['X-CSRF-TOKEN'] = csrfToken
      //     return axios(originalRequest)
      //   } else {
      //     return Promise.reject(error)
      //   }
      // }
      return Promise.reject(error)
    }
    return Promise.reject(error)
});

// const refreshCSRFToken = () => {
//   // CSRF토큰 재발급
//   return new Promise((resolve, reject) => {
//     axios.get('/csrf-token')
//       .then(({ data }) => {
//         const wrapper = document.createElement('div')
//         wrapper.innerHTML = data
//         return wrapper.querySelector('meta[name=csrf-token]')?.getAttribute('content')
//       })
//       .then((token) => {
//         document.querySelector('meta[name=csrf-token]')
//           ?.setAttribute('content', token || '')
//         resolve(token)
//       })
//       .catch(() => reject())
//   })
// }

const updateCancelSource = () => {
  axios.defaults.cancelToken = new CancelToken(function executor (c) {
    cancelSource = c // axios canceltoken 업데이트하기
  })
}

export {
  axios,
  updateCancelSource,
  cancelSource
}
