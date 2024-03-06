import instance from './axios.js'
import { useAuthStore } from '@/stores'
// import { router } from '@/router.js'

const setup = () => {
  // const authStore = useAuthStore()
  instance.interceptors.request.use(
    async (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  instance.interceptors.response.use(
    (res) => {
      return res
    },
    async (error) => {
      const errorRes = error.response
      const authStore = useAuthStore()
      // const errorAPI = error.response?.config

      // 기획상 403인경우 로그아웃 시킴.
      if (errorRes?.status === 403) {
        await authStore.logout()
        // await router.push('/logout')
        return Promise.reject(errorRes?.data?.payload?.message || error)
      }

      return Promise.reject(error.response?.data?.payload?.message || error)
    },
  )
}
export default setup
