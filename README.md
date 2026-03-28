# 타로 공부 앱

타로 카드 학습과 리딩 연습을 위한 모바일 우선 PWA 웹앱입니다.

## 주요 기능

### 카드 도감
- 메이저 아르카나 22장 + 마이너 아르카나 56장 전체 78장 수록
- 이름/키워드 검색, 수트별 필터
- 카드별 정방향/역방향 의미, 맥락별(연애/커리어/재정/영성) 해석
- 즐겨찾기 및 학습 완료 추적

### 리딩
- **카드 직접 입력**: 실제 타로 카드로 뽑은 결과를 직접 선택하고 Claude AI 해석 받기
- **랜덤 뽑기**: 앱에서 카드를 랜덤으로 드로우하고 의미 확인
- 5가지 스프레드 지원: 원카드 · 3카드 · 켈틱 크로스 · 관계 · 예/아니오
- 리딩 기록 저장, 노트 작성

### 학습
- 스프레드 교실: 각 스프레드의 카드 배치와 포지션 의미 학습
- 일일 원카드: 날짜 기반으로 매일 다른 카드 제공
- 학습 진도 추적 (78장 기준 퍼센트)

### AI 해석
- 스프레드 + 질문 + 선택한 카드를 바탕으로 Claude AI가 한국어 종합 해석 생성
- 실시간 스트리밍 표시

## 기술 스택

| 구분 | 기술 |
|---|---|
| 프레임워크 | React 18 + TypeScript |
| 빌드 | Vite 6 |
| 상태 관리 | Zustand + Immer |
| 로컬 저장소 | IndexedDB (idb) |
| 오프라인 | vite-plugin-pwa (Workbox) |
| AI | Claude API (SSE 스트리밍) |
| 라우팅 | React Router v6 |

## 시작하기

```bash
# 패키지 설치
npm install

# .env 파일 생성 후 Claude API 키 입력
cp .env.example .env

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 환경 변수

```env
# .env
VITE_CLAUDE_API_KEY=sk-ant-...
```

API 키는 [Anthropic Console](https://console.anthropic.com)에서 발급받을 수 있습니다.

## 프로젝트 구조

```
src/
├── components/       # 재사용 UI 컴포넌트 (카드, 모달 등)
├── data/             # 타로 카드 및 스프레드 마스터 데이터
├── db/               # IndexedDB 저장소 (클라이언트, 리포지토리)
├── hooks/            # 커스텀 훅
├── layouts/          # 앱 레이아웃 (하단 탭 네비게이션)
├── pages/            # 화면 컴포넌트
├── router/           # 라우팅 설정
├── services/         # 비즈니스 로직 (카드 셔플, Claude API)
├── store/            # Zustand 전역 상태
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수
```
