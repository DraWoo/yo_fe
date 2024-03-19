import { defineStore } from 'pinia'
import axios from 'axios'

//환경 변수에서 API로 경로 가져오기
const baseUrl = `${import.meta.env.VITE_API_PATH}`
export const useBoardStore = defineStore('board', {
    //상태 정의
    state: () => ({
        posts: []
    }),
    // getters는 계산된 상태를 반환하는 함수들의 집합
    //스토어 상태에 기반하여 동적으로 정보를 제공하며, Vue 컴포넌트 내에서 반응형 데이터처럼 사용
    getters: {},

    actions: {

        /**
         * 게시글 작성 (postData)
         * @param {String} username 사용자 아이디
         * @param {String} password 사용자 패스워드
         * @return {Promise<Object>} 로그인 성공 시 사용자 정보(payload)반환, 실패 시 에러 객체 반환
         */

        //localhost:9010/api/boards/posts
        async createPost(postData) {
            console.log('data check::: ', { postData })
            try {

                //게시물 작성 api 요청 
                const res = await axios.post(`${baseUrl}/boards/posts`, postData)

                const { code, payload } = res.data

                if (code === 'succeed' && payload) {
                    // 게시글 작성이 성공했을 때의 처리를 작성합니다.
                    console.log('게시글 작성 성공', res.data)
                    // 성공 시 게시글 목록 상태를 업데이트할 수 있습니다.
                    this.posts.push(res.data)
                } else {
                    // 요청이 성공적이지 않으면 오류를 발생시킵니다.
                    throw new Error('게시글 작성에 실패했습니다.');
                }
            } catch (error) {
                // 요청이 실패했을 때의 오류 처리를 작성합니다.
                console.error('게시글 작성 에러:', error);
                throw error;
            }
        },
    }

})
