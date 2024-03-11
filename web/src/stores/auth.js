import { defineStore } from 'pinia'
import axios from 'axios'

//환경 변수에서 API로 경로 가져오기
const baseUrl = `${import.meta.env.VITE_API_PATH}`
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false
  }),
  // getters는 계산된 상태를 반환하는 함수들의 집합
  //스토어 상태에 기반하여 동적으로 정보를 제공하며, Vue 컴포넌트 내에서 반응형 데이터처럼 사용
  getters:{
    //메인 페이지 경로를 반환하는 getter
    getUserMainPage(state){
      //로그인 인증 => isAuthenticated => true 면 homeViesw
      //로그인 실패 => isAuthenticated => false 면 login
      return state.isAuthenticated ? '/home' : '/login'
    }

  },

  actions: {

    /**
     * 로그인 (token)
     * @param {String} username 사용자 아이디
     * @param {String} password 사용자 패스워드
     * @return {Promise<Object>} 로그인 성공 시 사용자 정보(payload)반환, 실패 시 에러 객체 반환
     */

    //localhost:9010/api/auth/login
    async login(username, password) {
      console.log('로그인 시도: ', { username, password })

      try {
        const res = await axios.post(`${baseUrl}/auth/login`, {
          username,
          password
        })
        const { code, payload } = res.data

        if (code === 'succeed' && payload) {
          //응답데이터 토큰값 jwt
          this.token = payload.jwt
          this.isAuthenticated = true
          localStorage.setItem('token', this.token)
          console.log('토큰 저장', this.token)
          return payload
        } else {
          //서버로 부터 응답 실패
          throw new Error(res.data.data?.payload?.message || '로그인 실패')
        }
      } catch (error) {
        //네트워크 에러 또는 서버에러
        console.error('로그인 에러:', error)
        throw error.res ? error.res.data : new Error('Network error')
      }
    },


    /**
     * 회원가입 (username,password)
     * @param {String} username 사용자 아이디
     * @param {String} password 사용자 패스워드
     * @return {Promise<Object>} 회원가입 성공 시 사용자 정보(payload)반환, 실패 시 에러 객체 반환
     */
    async registerUser(username, password) {
      console.log('회원가입 요청 시작:', username)
      try {
        const res = await axios.post(`${baseUrl}/auth/signup`, {
          username,
          password
        });
        if (res.status === 200) {
          console.log('회원가입 성공:', res.data)
          alert('회원가입에 성공하였습니다.')
          return true;
        } else {
          console.log('회원가입 실패:', res.data.message)
          throw new Error(res.data.message || '회원가입에 실패했습니다.')
        }
      } catch (err) {
        console.error('회원가입 에러:', err.response.data)
        alert(err.response.data || "회원가입 중 문제가 발생했습니다.")
      }
    },

    /**
     * 로그아웃 
     * 사용자의 localStorage에서 토큰을 제거하고, 사용자 인증 상태 업데이트
     * 로그아웃이 성공하면, 사용자를 로그인 페이지로 리다이렉트
     */
    async logout(){
      //토큰 제거와 인증 상태 업데이트 
      console.log('토큰 확인:', localStorage.getItem('token'))
      localStorage.removeItem('token')
      console.log('토큰 삭제 완료:', localStorage.getItem('token'))
      this.isAuthenticated = false
    },
  }
})
