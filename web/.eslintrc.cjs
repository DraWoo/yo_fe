module.exports = {
  env: {
    browser: true, // 브라우저 전역 변수를 사용할 수 있도록 설정
    es2021: true,  // 최신 ECMAScript 기능을 사용할 수 있도록 설정
    node: true,    // Node.js 전역 변수와 Node.js 스코프를 사용할 수 있도록 설정
  },
  extends: [
    'eslint:recommended',           // ESLint 권장 규칙 사용
    'plugin:vue/vue3-recommended',  // Vue 3 권장 규칙 사용
    'plugin:prettier/recommended',  // Prettier 통합 활성화
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,                // ECMAScript 2021 버전 사용
    sourceType: 'module',           // 모듈 시스템 사용을 위해 설정 (ES6 모듈)
  },
  plugins: [
    'vue', // Vue.js 규칙을 사용하기 위해 플러그인 추가
  ],
  rules: {
    'vue/multi-word-component-names': 'off', // 다중 단어 컴포넌트 이름 규칙 비활성화
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']], // '@' 별칭을 './src'로 맵핑
      },
    },
  },
};
