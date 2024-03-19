<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import {useBoardStore} from '@/stores/boards/index.js'
// import { onBeforeRouteLeave } from 'vue-router'
// import axios from 'axios' // axios를 임포트합니다.

// const router = useRouter()
const $boardStore = useBoardStore()
// 포스트 데이터의 반응성 있는 참조를 생성합니다.
const post = ref({
  title: '',
  content: ''
})


// 게시글을 제출하고 성공하면 게시판 목록으로 리다이렉션합니다.
const submitPost = async () => {
  try{
    await $boardStore.createPost(post.value) // 게시글 생성
    post.value = { title: '', content: '' }  // 필드 초기화
  }catch(error){
    console.error('등록에 실패했습니다.') 
    alert(error.message)
  }
}

</script>

<template>
  <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <h1 class="text-3xl font-bold text-center mb-6">글 작성</h1>
    <form @submit.prevent="submitPost">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
          제목:
        </label>
        <input
          type="text"
          id="title"
          v-model="post.title"
          placeholder="제목을 입력하세요"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
      </div>
      <div class="mb-6">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">
          내용:
        </label>
        <textarea
          id="content"
          v-model="post.content"
          placeholder="내용을 입력하세요"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          저장
        </button>
      </div>
    </form>
  </div>
</template>
