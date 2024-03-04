import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        isAuthenticated: false,
    }),

    actions:{
        /**
         * 로그인 (token)
         * @param {String} username 사용자 아이디
         * @param {String} password 사용자 패스워드
         * @return {Promise<Object>} 로그인 성공 시 사용자 정보(payload)반환, 실패 시 에러 객체 반환 
         */
        async login(username, password) {
            try{
                const res = await axios.post(`$(baseUrl)/login`,{username, password})
                const { code, payload } =res.data

                if(code === 'succeed' && payload){
                    this.user = payload
                    localStorage.setItem('user', JSON.stringify(this.user))
                    return payload
                }else {
                    //서버로 부터 응답 실패
                    throw new Error(res.data.data?.payload?.message || '로그인 실패')
                }
            }catch(error){
                //네트워크 에러 또는 서버에러
                console.error('로그인 에러:', error)
                throw error.res ? error.res.data : new Error('Network error')
            }
        }
    }

})