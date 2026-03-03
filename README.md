<div align="center">

# ☁️ Goorm Trip

**React + TypeScript 기반 여행 상품 판매 웹 서비스**

백엔드 RESTful API와 연동하여 상품 조회부터 결제까지의 전체 사용자 플로우를 구현한 프론트엔드 프로젝트입니다.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**진행 기간:** 2025.02.09 ~ 2025.03.03

</div>

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [아키텍처 및 설계 전략](#-아키텍처-및-설계-전략)
- [시작하기](#-시작하기)
- [팀원](#-팀원)

---

## 🎯 프로젝트 소개

### 프로젝트 목표

- ✅ API 명세 기반 프론트엔드 아키텍처 설계
- ✅ 서버 상태와 UI 상태를 분리한 구조 설계
- ✅ 결제 플로우 통합 및 데이터 정합성 검증
- ✅ 코드 스타일 및 커밋 규칙 표준화
- ✅ 배포 환경 분리 및 운영 환경 대응

---

## ✨ 주요 기능

### 🏠 메인 페이지

<img width="1500" alt="메인 페이지" src="https://github.com/user-attachments/assets/768b2491-a259-4f52-9b97-323cd3bc2c14" />

#### 상품 검색 및 필터링
- 상품명 기반 **실시간 검색**
- 카테고리 탭 **필터링**
- 검색어 + 카테고리 **조합 필터링**

#### 인기 상품 슬라이드
- 상위 n개 상품 노출
- 이전/다음 버튼 전환
- Hover 시 네비게이션 표시
- 3열 그리드 반응형 레이아웃

---

### 🛒 장바구니

<img width="1500" alt="장바구니" src="https://github.com/user-attachments/assets/04be8042-7dac-47d7-ab5d-87663d6bd663" />

#### 플로팅 UI
- 우하단 **플로팅 버튼** (총 수량 뱃지)
- **사이드 패널** 슬라이드 애니메이션
- 실시간 총 수량 및 합계 금액 계산

#### 항목 관리
- 상품 이미지, 이름, 카테고리
- 출발일 표시
- 수량 조절
- 금액 자동 계산

---

### 📅 달력 모달 (공통 컴포넌트)

<img width="1500" alt="달력 모달" src="https://github.com/user-attachments/assets/07a003af-5695-463d-882d-e805cfbcbbf3" />

#### 유효성 검증
- **오늘 이전 날짜 선택 불가**
- 날짜 미선택 시 확인 버튼 비활성화
- 유효하지 않은 선택에 대한 에러 메시지

#### 사용 위치
- 장바구니 추가 시
- 예약하기 클릭 시

---

### 📦 상품 상세 조회

<img width="1500" alt="상품 상세" src="https://github.com/user-attachments/assets/a5dcae4c-9056-45c3-8321-7d00884ecfb4" />

#### 사이드 패널 UI
- 화면 우측 **슬라이드 인/아웃** 애니메이션
- 배경 오버레이 클릭 or `ESC` 키로 닫기
- 사이드 패널 열림 시 body 스크롤 비활성화

#### 상품 정보
- 상품 이미지 (복수 이미지 중 첫 번째)
- 상품명, 카테고리, 가격
- 수량 선택 컨트롤 (실시간 가격 계산)
- 장바구니 담기 / 예약하기 버튼

#### 카카오맵 연동
- 주소 기반 **Geocoding** 좌표 변환
- 마커, 지도 타입, 줌 컨트롤 표시
- 지도 클릭 시 **카카오맵 웹**에서 확인

#### 플로우
```
버튼 클릭 → 달력 모달 → 출발일 선택
  ├─ 장바구니: API 호출 → 패널 닫기
  └─ 예약하기: 결제 페이지 이동 (paymentItem 데이터)
```

---

### 💳 주문 / 결제

<img width="1500" alt="결제" src="https://github.com/user-attachments/assets/44c0feee-c102-45e8-9fc8-edaff3bee098" />

#### 결제 플로우 통합
- 장바구니 결제 + 즉시 예약 **통합 처리**
- 상품 선택/해제
- 수량 변경 시 총 금액 **실시간 계산**
- 결제 전 **유효성 검증**

#### API 연동 흐름
```
1️⃣ 주문 미리 생성 (preview)
2️⃣ 결제 요청 (payment)
3️⃣ 결제 완료 화면 이동
```

#### 주문번호 추출 유틸
- 다양한 응답 포맷 대응
- 응답 구조 변경 방어 로직

---

## 🛠 기술 스택

### Core
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Styling
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)

### State Management & Data Fetching
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Routing & Testing
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white)

### Code Quality
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

### Integration
![Kakao Maps](https://img.shields.io/badge/Kakao_Maps-FFCD00?style=for-the-badge&logo=kakao&logoColor=black)

<details>
<summary><b>상세 버전</b></summary>

| Category | Stack |
|----------|-------|
| Language | TypeScript 5.6.2, JavaScript, HTML, CSS |
| Framework | React 19.0.0, Vite 6.0.3 |
| Styling | Tailwind CSS, PostCSS, Autoprefixer |
| Routing | React Router DOM |
| State/Data Fetching | React Query (TanStack Query) |
| HTTP Client | Axios |
| Map SDK | Kakao Maps SDK |
| Testing | Vitest, Testing Library, jsdom |
| Code Quality | ESLint, Prettier, TypeScript |
| Package Manager | npm |
| Runtime | Node.js, Browser |

</details>

---

## 📁 프로젝트 구조

```
goorm-trip-front/
├── src/
│   ├── pages/              # 📄 라우팅 단위 페이지
│   │   ├── Main/          # 메인 페이지
│   │   ├── Product/       # 상품 상세
│   │   └── Payment/       # 결제 페이지
│   ├── components/         # 🧩 공통 UI 컴포넌트
│   │   ├── common/        # 달력, 수량 컨트롤 등
│   │   └── cart/          # 장바구니 관련
│   ├── hooks/              # 🪝 커스텀 훅
│   │   ├── api/           # API 호출 훅
│   │   └── useKakaoLoader # Kakao SDK 로더
│   ├── api/                # 🌐 Axios 인스턴스 및 API 모듈
│   ├── types/              # 📘 TypeScript 타입 정의
│   ├── utils/              # 🔧 유틸리티 함수
│   ├── styles/             # 🎨 전역 스타일 및 테마
│   └── assets/             # 🖼️ 이미지 및 정적 파일
├── public/                 # 정적 파일
└── README.md
```

---

## 🏗️ 아키텍처 및 설계 전략

### 1️⃣ 개발 환경 표준화

#### 📏 ESLint + Prettier 통합
```typescript
// 프로젝트 초기 단계에서 코드 품질 기준 정의
- @typescript-eslint 기반 타입 검사
- react, react-hooks 규칙 적용
- import/order 규칙으로 import 정렬 강제
- Prettier 충돌 방지 설정 분리
```

#### 📝 Commit Convention 강제
```bash
# commitlint 적용
[FIX] 버그 수정
[UPDATE] 기능 개선
[ADD] 파일 추가
[FEAT] 새로운 기능
```

**효과:** Git 히스토리 가독성 및 유지보수성 확보

---

### 2️⃣ 서버 상태 관리 구조 설계

#### ⚛️ React Query 전역 설정
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
    },
  },
});
```

**설계 의도:**
- 🔄 불필요한 네트워크 요청 방지
- ⚡ 캐시 전략을 통한 UX 개선
- 🎯 서버 상태(Server State)와 UI 상태(Client State) 명확히 분리

---

### 3️⃣ API 환경 분리 및 공통 설정

#### 🌐 환경 변수 기반 API URL 관리
```typescript
// .env
VITE_API_BASE_URL=https://api.goorm-trip.com

// axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-User-Id': 'test-user',
  },
});
```

**효과:**
- ✅ dev / prod 환경 분리
- ✅ 배포 환경 변경 시 유연한 대응
- ✅ 중복 코드 제거 및 요청 일관성 유지

---

### 4️⃣ 컬러 시스템 설계 (다크/라이트 자동 대응)

#### 🎨 CSS 변수 기반 테마 시스템
```css
/* 자동 생성 */
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
  }
}
```

```typescript
// 컴포넌트에서 사용
style={{ backgroundColor: COLORS.BG_PRIMARY }}
```

**효과:**
- 🌙 다크모드 자동 대응
- 🎨 디자인 시스템 일관성 확보
- 🔧 유지보수성 향상

---

### 5️⃣ 카카오맵 연동

#### 🗺️ useKakaoLoader 훅 캡슐화
```typescript
// Kakao Maps SDK는 전역 의존성을 가지므로 훅으로 캡슐화
useKakaoLoader(); // App 레벨에서 단 한 번만 초기화
```

**설계 목적:**
- ✅ SDK 중복 로딩 방지
- ✅ 전역 객체 의존성 격리
- ✅ 유지보수성 향상

---

### 6️⃣ 기타

#### 🎭 Favicon 제작 및 적용

<img width="128" height="128" alt="Favicon" src="https://github.com/user-attachments/assets/b5e15f8b-2970-4289-8d29-3b6e9689bd1a" />

> 제작 도구: [favicon.io](https://favicon.io/)

---

## 🚀 시작하기

### 요구사항
- Node.js 18+
- npm 9+

### 설치 및 실행
```bash
# 1. 저장소 클론
git clone https://github.com/your-username/goorm-trip-front.git

# 2. 의존성 설치
cd goorm-trip-front
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일에 필요한 값 설정

# 4. 개발 서버 실행
npm run dev

# 5. 빌드
npm run build

# 6. 테스트
npm run test
```

### 환경 변수
```env
VITE_KAKAO_MAP_KEY=your_kakao_map_key
```

---

## 👥 팀원

| Name | Role | GitHub |
|------|------|--------|
| 박규나 | Frontend Developer | [@qnada0118](https://github.com/qnada0118) |
| 이홍섭 | Frontend Developer | [@leehseub](https://github.com/leehseub) |
| 최유정 | Frontend Developer | [@cleame8922](https://github.com/cleame8922) |

<div align="center">

[⬆️ Back to top](#-goorm-trip)

</div>
