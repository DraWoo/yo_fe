<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/index.js'

const authStore = useAuthStore()
async function logout() {
  authStore.logout()
}

onMounted(logout)
</script>

<template>
  <div></div>
</template>