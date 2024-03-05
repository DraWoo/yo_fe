<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const showPassword = ref(false);

async function onSubmit() {
  try {
    await authStore.login(username.value, password.value);
    router.push({ name: 'dashboard' });
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please try again.');
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-[#F8F9FB]">
    <form @submit.prevent="onSubmit" class="login-form">
      <div class="mb-6">
        <label for="username" class="block mb-2 text-sm font-medium">아이디</label>
        <input v-model="username" type="text" id="username" class="login-input" placeholder="아이디를 입력하세요" required>
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium">비밀번호</label>
        <div class="relative">
          <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" class="login-input" placeholder="비밀번호를 입력하세요" required>
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
<style scoped>
.login-form {
  @apply bg-white p-8 border border-gray-300 rounded-lg shadow-md;
}

.login-input {
  @apply w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300;
}

.login-button {
  @apply mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline;
}

.login-icon {
  @apply inline-block h-6 w-6 text-gray-500;
}
</style>