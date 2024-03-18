<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onBeforeRouteLeave } from 'vue-router'

const router = useRouter()

const post = ref({
  title: '',
  content: ''
})

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm(
    '변경사항이 저장되지 않았습니다. 페이지를 떠나시겠습니까?'
  )
  if (!answer) {
    return false // 이동을 취소합니다.
  }
})

const submitPost = async () => {
  // 게시글 작성 요청 로직
  // 예: await axios.post('/api/posts', post.value)
  
  // 요청이 성공하면 게시판 목록으로 리디렉션
  router.push('/posts')
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
            type="submit"
          >
            게시글 작성
          </button>
        </div>
      </form>
    </div>
  </template>
  

  