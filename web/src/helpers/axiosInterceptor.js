import instance from './axios.js'
import { useAuthStore } from '@/stores'
// import { router } from '@/router.js'

/**
 *
 * axios 인터셉터는 모든 요청 혹은 응답을 가로채 거기에 추가적인 변환 또는 로직을 적용할 수 있게 해주는 기능
 * 인터셉터(request.use)에서는 요청을 보내기 전에 인증 토큰이 필요한 경우 헤더에 토큰을 추가
 * 응답 인터셉터(response.use)에서는 응답을 받고 난 후에 특정 작업을 수행하는데, 예를 들어 인증 토큰이 만료되었을 경우 유저를 로그아웃 시키는 작업을 수행
 */

const setup = () => {
  const authStore = useAuthStore()
  const token = localStorage.getItem('token')
  if (token) {
    authStore.token = token
    authStore.isAuthenticated = true
  }

  //axios.js 가지고와서 사용
  instance.interceptors.request.use(
    async (config) => {
      const token = authStore.token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  instance.interceptors.response.use(
    (res) => {
      return res
    },
    async (error) => {
      const errorRes = error.response
      const authStore = useAuthStore()
      // const errorAPI = error.response?.config

      // 기획상 403인 경우 로그아웃 시킴.
      if (errorRes?.status === 403) {
        await authStore.logout()
        // await router.push('/logout')
        return Promise.reject(errorRes?.data?.payload?.message || error)
      }

      return Promise.reject(error.response?.data?.payload?.message || error)
    }
  )
}

export default setup
