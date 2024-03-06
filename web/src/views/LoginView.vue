<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
// import BtnPrimary from '@/components/buttons/BtnPrimary.vue'
// import BtnDefault from '@/components/buttons/BtnDefault.vue'
import IconEyeOff from '@/components/icons/IconEyeOff.vue'
import IconEyeOn from '@/components/icons/IconEyeOn.vue'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const showPassword = ref(false)

async function onSubmit() {
  try {
    await authStore.login(username.value, password.value)
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error('Login error:', error)
    alert('Login failed. Please try again.')
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
    <form class="login-form" @submit.prevent="onSubmit">
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium" for="username">아이디</label>
        <input id="username" type="text" class="login-input" v-model="username" placeholder="아이디를 입력하세요" required />
      </div>
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium" for="password">비밀번호</label>
        <div class="relative">
          <input id="password" :type="showPassword ? 'text' : 'password'" class="login-input" v-model="password" placeholder="비밀번호를 입력하세요" required />
          <span class="absolute inset-y-0 right-3 flex items-center">
            <button type="button" @click="showPassword = !showPassword" class="text-gray-500">
              <span v-if="showPassword"><IconEyeOn /></span>
              <span v-else><IconEyeOff /></span>
            </button>
          </span>
        </div>
      </div>
      <button type="submit" class="login-button">로그인</button>
    </form>
  </div>
</template>
