// src/router.js
//백엔드 =>AuthController Java 클래스에서 API 준해서 router.js 파일정의
//routes: 애플리케이션 내의 다양한 경로(URL)와 이들 각각에 대응하는 컴포넌트를 정의
//beforeEach: 라우트를 이동하기 전에 실행될 전역 가드입니다. 사용자 인증 여부를 체크하고, 필요하다면 로그인 페이지로 리다이렉션
//import.meta.env.BASE_URL: 프로젝트의 베이스 URL을 제공합니다. 이는 배포 환경에 따라 달라짐
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/index.js'

//동적 import를 사용하여 필요한 component를 불러옴
// 수정된 코드: 올바른 경로와 컴포넌트 이름 사용
const LoginView = () => import('@/views/LoginView.vue')
const SignupView = () => import('@/views/SignupView.vue')
const HomeView = () => import('@/views/HomeView.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: { requiresAuth: false },
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  // 추가적인 라우트 설정
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 라우터 가드를 설정하여 인증이 필요한 페이지에 접근하기 전에 인증 상태를 확인합니다.
router.beforeEach(async (to) => {
  const publicPages = ['/signup', '/welcome', '/login', '/signup', '/logout', '/privacy', '/change-password']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user) {
    // auth.returnUrl = to.fullPath
    /// sessionStorage.setItem("returnUrl", to.fullPath)
    return '/login'
  }
})
