<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'

const $authStore = useAuthStore()
const router = useRouter()

// 가상의 게시글 데이터
const posts = ref([])

const handleLogout = async () => {
    await $authStore.logout()
    router.push('/login')
}
//게시글 작성
const handleCreatePost = () => {
  console.log('###클릭####')
  router.push('/posts')
}
// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  // TODO: 서버에서 게시글 데이터를 불러오는 로직 구현
  // 예시 데이터
  posts.value = [
    {
      id: 1,
      title: '게시글 제목 1',
      content: '게시글 내용 1',
      user: { id: 'user1', name: '작성자1' },
      createdAt: '2023-03-15T12:00:00',
      viewCount: 123
    },
    {
      id: 2,
      title: '게시글 제목 2',
      content: '게시글 내용 2',
      user: { id: 'user2', name: '작성자2' },
      createdAt: '2023-03-16T15:30:00',
      viewCount: 456
    }
    // 더 많은 게시글...
  ]
})

</script>
<template>
    <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 class="text-3xl font-bold text-center mb-6">YO BBS</h1>
      <div class="my-4 flex justify-between">
        <button class="py-2 px-4 bg-blue-500 text-white rounded" @click="handleCreatePost">
          작성
        </button>
        <div>
          <input 
            type="text" 
            placeholder="검색어를 입력해주세요."
            class="border rounded py-2 px-4 mr-2"
          />
          <button class="py-2 px-4 bg-blue-500 text-white rounded">검색</button>
          <button class="logout-button" @click="handleLogout">로그아웃</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="border-b px-6 py-4 text-left">번호</th>
              <th class="border-b px-6 py-4 text-left">제목</th>
              <!-- <th class="border-b px-6 py-4 text-left">이름</th> -->
              <th class="border-b px-6 py-4 text-left">아이디</th>
              <th class="border-b px-6 py-4 text-left">작성일</th>
              <th class="border-b px-6 py-4 text-left">조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id" class="my-4">
              <td class="border-b px-6 py-6">{{ post.id }}</td>
              <td class="border-b px-6 py-6">{{ post.title }}</td>
              <td class="border-b px-6 py-6">{{ post.user.id }}</td>
              <td class="border-b px-6 py-6">{{ post.createdAt }}</td>
              <td class="border-b px-6 py-6">{{ post.viewCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4">
        <!-- 페이징 컴포넌트 위치 -->
      </div>
    </div>
  </template>
  
  