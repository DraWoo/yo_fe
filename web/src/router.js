// src/router.js
import { createRouter, createWebHistory } from 'vue-router'

// 라우트 컴포넌트 임포트
// import HomePage from '@/pages/HomePage.vue';
// import AboutPage from '@/pages/AboutPage.vue';
// import LoginPage from '@/pages/LoginPage.vue';
// import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
  //   { path: '/', name: 'Home', component: HomePage },
  //   { path: '/about', name: 'About', component: AboutPage },
  //   { path: '/login', name: 'Login', component: LoginPage },
  //   { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
