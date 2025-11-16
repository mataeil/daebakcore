# 개발 환경 설정

daebakcore 프로젝트 개발 환경을 구축하는 방법을 설명합니다.

## 시스템 요구사항

### 필수 요구사항

| 항목 | 최소 버전 | 권장 버전 |
|------|---------|---------|
| Node.js | 18.0.0 | 20.0.0 이상 |
| npm | 10.0.0 | 10.0.0 이상 |
| Git | 2.0.0 | 최신 버전 |

### 선택 사항

- **Visual Studio Code**: 권장 에디터
- **Chrome DevTools**: 디버깅
- **Git Desktop**: GUI Git 클라이언트

## 설치 단계

### 1단계: Node.js 및 npm 설치

#### macOS (Homebrew)

```bash
brew install node@20
# 버전 확인
node --version
npm --version
```

#### Windows (Chocolatey)

```bash
choco install nodejs
# 또는 공식 웹사이트에서 다운로드
# https://nodejs.org/
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install nodejs npm
```

### 2단계: 프로젝트 클론

```bash
git clone <repository-url>
cd daebakcore
```

### 3단계: 의존성 설치

```bash
npm install
```

**설치 내용**:
- React 19.2.0
- React Router DOM 7.9.6
- Tailwind CSS 4.1.17
- Jest 29.7.0
- TypeScript 5.9.3
- 기타 개발 도구

## 개발 서버 실행

### 시작

```bash
npm run dev
```

**출력 예**:

```
  VITE v7.2.2  ready in 145 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 접속

브라우저에서 `http://localhost:5173` 접속

### 로그인

- **ID**: admin
- **비밀번호**: admin1234

### 종료

터미널에서 `Ctrl+C` 입력

## 개발 명령어

### 빌드 및 실행

```bash
# 개발 서버 실행 (Hot Module Replacement 지원)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 테스트

```bash
# 테스트 실행 (한 번)
npm test

# 테스트 감시 모드 (파일 변경 시 자동 재실행)
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage
```

### 코드 품질

```bash
# TypeScript 타입 검사
npm run type-check

# ESLint 실행
npm run lint
```

## IDE 설정

### Visual Studio Code

#### 권장 확장

1. **ES7+ React/Redux/React-Native snippets**
   - 저자: dsznajder.es7-react-js-snippets
   - 기능: React 코드 스니펫

2. **Tailwind CSS IntelliSense**
   - 저자: bradlc.vscode-tailwindcss
   - 기능: Tailwind 클래스 자동완성

3. **TypeScript Vue Plugin**
   - 저자: Vue (내장)
   - 기능: TypeScript 지원

4. **Prettier - Code formatter**
   - 저자: esbenp.prettier-vscode
   - 기능: 코드 자동 포맷팅

5. **ESLint**
   - 저자: dbaeumer.vscode-eslint
   - 기능: 린팅

#### settings.json 권장 설정

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 폴더 구조 이해

### 핵심 디렉토리

```
daebakcore/
├── src/                          # 소스 코드
│   ├── components/               # React 컴포넌트
│   │   ├── Auth/                # 인증 관련
│   │   └── Layout/              # 레이아웃
│   ├── context/                 # React Context
│   ├── pages/                   # 페이지 컴포넌트
│   ├── types/                   # TypeScript 타입
│   ├── utils/                   # 유틸리티 함수
│   ├── __tests__/               # 테스트 파일
│   ├── App.tsx                  # 루트 컴포넌트
│   └── main.tsx                 # 엔트리 포인트
│
├── docs/                        # 문서
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── COMPONENTS.md
│   ├── SETUP.md
│   └── TESTING.md
│
├── public/                      # 정적 파일
├── dist/                        # 빌드 결과
├── coverage/                    # 테스트 커버리지
│
├── package.json                 # 프로젝트 메타데이터
├── vite.config.ts              # Vite 설정
├── tsconfig.json               # TypeScript 설정
├── tailwind.config.ts          # Tailwind 설정
├── jest.config.js              # Jest 설정
└── README.md                    # 프로젝트 개요
```

## 설정 파일 설명

### tsconfig.json (TypeScript)

```json
{
  "compilerOptions": {
    "target": "ES2020",          // JavaScript 버전
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",          // 모듈 시스템
    "skipLibCheck": true,        // lib 타입 검사 스킵
    "strict": true,              // 엄격한 타입 검사
    "noUnusedLocals": true,      // 사용하지 않는 변수 오류
    "noUnusedParameters": true,  // 사용하지 않는 매개변수 오류
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx",          // JSX 변환
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]         // 경로 별칭
    }
  }
}
```

### vite.config.ts (Vite)

```typescript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,                  // 개발 서버 포트
    open: true                   // 자동 브라우저 열기
  }
})
```

### tailwind.config.ts (Tailwind CSS)

```typescript
import tailwindcss from 'tailwindcss'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'  // 스캔 대상
  ],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config
```

### jest.config.js (Jest)

```javascript
export default {
  preset: 'ts-jest',             // TypeScript 처리
  testEnvironment: 'jsdom',      // 브라우저 환경
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // 경로 별칭
    '\\.(css|less)$': 'identity-obj-proxy'  // CSS 모킹
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
}
```

## 첫 번째 개발

### 1. 개발 서버 시작

```bash
npm run dev
```

### 2. 브라우저 접속

`http://localhost:5173` 에서 로그인 페이지 확인

### 3. 로그인 테스트

```
ID: admin
Password: admin1234
```

### 4. 대시보드 접속 확인

로그인 성공 시 대시보드 페이지 확인

### 5. 코드 수정 테스트

`src/pages/DashboardPage.tsx`에서 제목 변경 후 저장하면 자동 새로고침

## 디버깅

### VS Code Debugger

#### launch.json 설정

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///*": "${webRoot}/*"
      }
    }
  ]
}
```

### 브라우저 DevTools

1. Chrome 열기 → F12
2. Sources 탭에서 파일 검색
3. 중단점 설정
4. 코드 한 줄씩 실행

### 콘솔 로깅

```typescript
// React 컴포넌트에서
console.log('디버그 메시지')
console.warn('경고')
console.error('에러')
```

## 자주 묻는 질문

### Q: 포트 5173이 이미 사용 중일 때

```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

### Q: TypeScript 에러가 계속 나타날 때

```bash
# TypeScript 캐시 초기화
rm -rf .tsbuildinfo
npm run type-check
```

### Q: 모듈을 찾을 수 없다는 에러

```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### Q: 테스트가 실패할 때

```bash
# Jest 캐시 초기화
npm test -- --clearCache
npm test
```

## 다음 단계

1. **코드 이해**: [ARCHITECTURE.md](./ARCHITECTURE.md) 읽기
2. **컴포넌트 학습**: [COMPONENTS.md](./COMPONENTS.md) 읽기
3. **테스트 작성**: [TESTING.md](./TESTING.md) 읽기
4. **기능 개발**: 새로운 기능 추가하기

---

**최종 업데이트**: 2025-11-16
**버전**: 1.0
