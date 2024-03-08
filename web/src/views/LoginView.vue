<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as Yup from 'yup'
import { Form, Field } from 'vee-validate'
import { useAuthStore} from '@/stores/index.js'
import BtnPrimary from '@/components/buttons/BtnPrimary.vue'
// import BtnDefault from '@/components/buttons/BtnDefault.vue'
import IconEyeOff from '@/components/icons/IconEyeOff.vue'
import IconEyeOn from '@/components/icons/IconEyeOn.vue'

const router = useRouter()
const $authStore = useAuthStore()

const showPassword = ref(false)
const loginFormRef = ref(null)
const initialValues = ref({
  username: localStorage.getItem('_ca_username_') || '',
})

const schema = Yup.object().shape({
  username: Yup.string().required('아이디를 입력하세요.'),
  password: Yup.string().required('비밀번호를 입력하세요.'),
})

/**
 * 엔터키 입력시
 * handleOnKeyup
 * @param {Object} e
 * @return void
 * */
function handleOnKeyup(e) {
  e.target.blur()
  loginFormRef.value.$el.dispatchEvent(new Event('submit'))
}

/**
 * onSubmit
 * 로그인
 * 폼 제출 핸들러입니다. 로그인을 시도하고, 결과에 따라 다음 액션을 실행합니다.
 * @param {Object} values
 * @param {any} setErrors
 * @return void
 * */

async function onSubmit(values, { setErrors }) {
  try {
    await $authStore.login(values.username, values.password)
    console.log('🔑 로그인 성공! 메인 페이지로 이동합니다.'); // 성공 로그
    await router.push($authStore.getUserMainPage)
  } catch (error) {
    if (setErrors) {
      setErrors({ apiError: error })
    } else {
      alert('해당 계정으로는 로그인할 수 없습니다. 다른 계정으로 다시 시도해주세요.')
    }
  }
}
/**
 * 로그인 뷰
 * initView
 * @return void
 * */
function initView() {
  // 로그인 상태면 메인 으로 이동
  if ($authStore.user) router.push($authStore.getUserMainPage)
}
// onMounted(() => {
//   if ($authStore.user) {
//     console.log('🔄 이미 로그인 상태입니다. 메인 페이지로 이동합니다.'); // 상태 확인 로그
//     router.push($authStore.getUserMainPage)
//   }
// })
onMounted(initView)
</script>

<template>
  <div class="flex items-center justify-center h-full w-full bg-[#F8F9FB] overflow-y-auto">
    <div>
      <!-- 로고 -->
      <!-- <div class="text-center mb-[40px]">
        <h1 class="text-[28px]">Yo Application</h1>
      </div> -->
      <!-- 로고 -->

      <!-- 로그인 박스 -->
      <div class="w-[528px] bg-white p-[64px] border border-[#F1F2F6] rounded-[20px]">
        <h2 class="mb-[32px]">로그인</h2>

        <!-- 로그인 폼 -->
        <Form ref="loginFormRef" v-slot="{ errors, isSubmitting, values }" :validation-schema="schema" :initial-values="initialValues" @submit="onSubmit">
          <!-- 아이디 -->
          <label>
            <strong>아이디</strong>
            <Field 
              v-model="values.username"
              name="username" 
              type="text" 
              class="w-full mt-[5px]" 
              placeholder="아이디를 입력하세요" 
              :class="{ 'is-invalid': errors.username }" 
              @keyup.enter="handleOnKeyup" 
            />
            <span class="block min-h-[22px]">
              <span class="invalid-feedback text-red-500">{{ errors.username }}</span>
            </span>
          </label>
          <!-- // 아이디 -->

          <!-- 비밀번호 -->
          <label class="block mt-[2px]">
            <strong>비밀번호</strong>
            <span class="relative block">
              <Field 
                v-model="values.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full mt-[5px]"
                placeholder="비밀번호를 입력하세요"
                :class="{ 'is-invalid': errors.password }"
                @keyup.enter="handleOnKeyup"
              />
              <span v-if="showPassword" class="absolute top-[11px] right-[11px] outline-0 cursor-pointer" @click="showPassword = false">
                <icon-eye-on />
              </span>
              <span v-else class="absolute top-[11px] right-[11px] outline-0 cursor-pointer" @click="showPassword = true">
                <icon-eye-off />
              </span>
            </span>
            <span class="block min-h-[22px]">
              <span class="invalid-feedback text-red-500">{{ errors.password }}</span>
            </span>
          </label>
          <!-- // 비밀번호 -->

          <!-- 로그인 버튼 영역 -->
          <div class="mt-[26px]">
            <btn-primary class="h-[44px] w-full text-[14px] rounded-[8px] font-bold disabled:bg-[lightgrey]" :disabled="!values?.username || !values.password">
              <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
              로그인
            </btn-primary>
          </div>
          <div v-if="errors.apiError" class="alert alert-danger p-2.5 text-red-500">{{ errors.apiError }}</div>
          <!-- // 로그인 버튼 영역 -->
        </Form>
        <!-- // 로그인 폼 -->

        <!-- 회원 가입 버튼 -->
       <div class="mt-[44px] text-center text-[#7a7a7a]">
          처음이신가요? <router-link to="/signup" class="font-bold text-[#3B9BFA] underline underline-offset-2">회원가입</router-link>
       </div>
        <!-- // 회원 가입 버튼 -->
      </div>
      <!-- // 로그인 박스 -->
    </div>
  </div>
</template>