# 타로 공부 웹앱 요구사항 정의서

## 개요

### 배경 및 목적
타로에 관심 있는 초급자를 위한 학습 및 연습 플랫폼. 카드 의미, 리딩 방법, 스프레드를 체계적으로 학습하고 즉시 실습할 수 있는 올인원 솔루션을 제공합니다.

### 핵심 가설
- 초급자는 카드를 외우는 것이 아니라 **의미를 이해하고 실제로 사용**할 수 있어야 합니다.
- **반복 노출**과 **실제 리딩 연습**이 결합되면 학습 효과가 극대화됩니다.
- **오프라인 접근성**이 높을수록 학습 일관성(consistency)이 증가합니다.

---

## 목표 및 성공 지표

### 비즈니스 목표
- 모바일 우선 사용자 경험으로 초급자의 높은 참여율 확보
- 기본 78장 카드 습득 지원 (메이저 22장 + 마이너 56장)
- 5가지 기본 스프레드 숙달 지원

### 핵심 KPI
| 지표 | 목표 | 측정 방법 |
|------|------|---------|
| DAU (Daily Active Users) | - | 앱 실행 횟수 |
| 학습 완료율 | 초급자 50% 이상이 50장 이상 카드 학습 | 학습 진도 추적 |
| 리딩 연습 빈도 | 월 평균 사용자당 10회 이상 | 리딩 세션 로그 |
| 오프라인 사용률 | 전체 세션의 30% 이상 | 네트워크 상태 로깅 |

---

## 사용자 스토리

### 타겟 사용자 정의

**초급 타로 학습자**
- 연령: 18~50세
- 타로 경험: 0~6개월
- 기술 역량: 중급 이상 (모바일 앱 사용 경험 있음)
- 학습 시간: 하루 5~20분 단위의 짧은 세션
- 주요 니즈: 체계적 학습 + 즉시 적용 가능한 실습

### 핵심 사용 시나리오

**시나리오 1: 카드 의미 학습**
```
사용자: "타로 배운 지 2주인데, 메이저 아르카나를 다 외우고 싶어"
→ 카드 도감 접근 → 한 장씩 학습 → 키워드/역할 숙지 → 다음 카드 진행
```

**시나리오 2: 리딩 연습**
```
사용자: "오늘 하루를 위한 원카드 리딩을 해봐야겠다"
→ 리딩 모드 진입 → 스프레드 선택 (원카드) → 카드 뽑기 → 의미 확인 → 기록
```

**시나리오 3: 스프레드 학습**
```
사용자: "켈틱 크로스는 뭐고 어떻게 하는 건지 알고 싶어"
→ 스프레드 교실 → 켈틱 크로스 선택 → 구조 설명 보기 → 직접 연습
```

**시나리오 4: 오프라인 학습**
```
사용자: "지하철에서 타로 공부를 하고 싶은데 인터넷이 안 돼"
→ 앱 실행 (캐시된 데이터 로드) → 학습 계속 진행
```

---

## 기능 요구사항

### 1. MVP 핵심 기능 목록 (우선순위 포함)

#### TIER 1 (필수 - Week 1~2)
| 순번 | 기능 | 설명 | MoSCoW |
|------|------|------|--------|
| 1.1 | 카드 도감 | 78장 카드 조회, 의미/키워드 검색 | **Must** |
| 1.2 | 원카드 리딩 | 1장 뽑아서 의미 확인 | **Must** |
| 1.3 | 스프레드 라이브러리 | 5가지 기본 스프레드 구조 학습 | **Must** |
| 1.4 | 오프라인 지원 | 전체 데이터 로컬 캐시 | **Must** |

#### TIER 2 (핵심 - Week 3~4)
| 순번 | 기능 | 설명 | MoSCoW |
|------|------|------|--------|
| 2.1 | 스프레드별 리딩 | 3~10장 스프레드 리딩 | **Should** |
| 2.2 | 학습 진도 추적 | 학습한 카드 개수, 완료도 표시 | **Should** |
| 2.3 | 리딩 기록 | 과거 리딩 세션 저장/조회 | **Should** |
| 2.4 | 카드 즐겨찾기 | 관심 카드 저장 | **Should** |

#### TIER 3 (강화 - Week 5+)
| 순번 | 기능 | 설명 | MoSCoW |
|------|------|------|--------|
| 3.1 | 복합 스프레드 | 사용자 정의 스프레드 | Could |
| 3.2 | AI 해석 지원 | 리딩 결과 해석 도움 | Could |
| 3.3 | 커뮤니티 공유 | 리딩 결과 공유 | Could |
| 3.4 | 학습 랜덤 퀴즈 | 카드 맞추기 게임 | Could |

#### Out of Scope
- 결제 기능 (모두 무료)
- 사용자 계정 & 인증 (로컬 저장만)
- 카드 해석 AI (초기: 정적 데이터만)
- 실시간 커뮤니티 기능
- 카드 이미지 업로드 (공개 아트만 사용)

---

### 2. 상세 기능 명세

#### 2.1 카드 도감 (Card Library)

**기능 설명**
- 전체 78장 타로 카드를 메이저/마이너 아르카나로 구분 표시
- 각 카드 상세 정보: 이름, 이미지, 한국어 의미, 역할, 점성술 대응, 키워드
- 정방향/역방향 의미 모두 제공

**사용자 플로우**
```
홈 → "카드 도감" 탭
→ 메이저 아르카나 목록 (The Fool ~ The World)
→ 카드 선택
→ 상세 정보 화면 (이미지 + 설명)
→ 다음/이전 카드 네비게이션
```

**상세 화면 구성**
- 카드 이미지 (1:1 또는 16:9 비율, 큰 크기)
- 카드 번호 및 이름
- "정방향 의미" 섹션 (단문 설명 + 상세 설명)
- "역방향 의미" 섹션
- 키워드 목록 (태그 형태)
- 점성술 대응 정보 (메이저만)
- 즐겨찾기 버튼
- 하단 네비게이션 (이전 카드 ← → 다음 카드)

**검색 & 필터**
- 검색창: 카드 이름, 키워드로 검색
- 필터: 메이저/마이너, 키워드(사랑, 돈, 직업 등)

**Acceptance Criteria**
- [ ] 78장 모든 카드 정보 완벽하게 로드
- [ ] 정방향/역방향 의미 모두 제공
- [ ] 오프라인에서 이미지 + 텍스트 완벽하게 조회 가능
- [ ] 검색 결과 0.5초 이내 로드
- [ ] 카드 즐겨찾기 로컬 저장

#### 2.2 원카드 리딩 (One-Card Reading)

**기능 설명**
- 78장 중 1장을 무작위로 추출
- 해당 카드의 의미를 사용자 맥락에 맞게 해석하도록 유도
- 리딩 결과 저장 가능

**사용자 플로우**
```
홈 → "리딩" 탭
→ "원카드" 모드 선택
→ 리딩 질문 입력 (선택: "오늘 하루", "이 상황의 조언", "내 감정" 등)
→ "카드 뽑기" 버튼 클릭
→ 카드 애니메이션 + 뽑힌 카드 표시
→ 의미 해석 보기
→ "저장" 또는 "다시 뽑기"
```

**리딩 화면 구성**
- 리딩 질문 표시 (입력값 또는 템플릿)
- 큰 카드 이미지 (터치 후 뽑는 애니메이션)
- 카드 정방향/역방향 표시
- 카드 의미 텍스트
- "이 해석이 맞나요?" 추가 설명 섹션
- 저장/공유 버튼

**리딩 템플릿**
```
- "오늘 하루를 위한 조언"
- "현재 상황의 의미"
- "이 관계의 미래"
- "내 감정 상태"
- "자유 입력"
```

**엣지 케이스 & 예외 처리**
- 연속으로 같은 카드가 나올 수 있음 (정상, 우주의 메시지)
- 사용자가 한 번에 5회 이상 뽑으면 "잠시 쉬고 명상해볼까요?" 메시지
- 역방향 카드 표시 명확하게 (반전 또는 "역" 배지)

**Acceptance Criteria**
- [ ] 카드 무작위 추출 알고리즘 검증 (충분한 엔트로피)
- [ ] 정방향/역방향 50:50 확률
- [ ] 리딩 기록 JSON 형태로 로컬 저장
- [ ] 오프라인에서 리딩 가능
- [ ] 카드 애니메이션 부드러움 (60fps)

#### 2.3 스프레드 교실 (Spread Learning)

**기능 설명**
- 5가지 기본 스프레드를 단계별로 학습
- 각 스프레드의 위치별 의미 설명
- 실제 리딩 연습 링크

**5가지 기본 스프레드**
1. **One Card (원카드)**: 1장, 단순 조언
2. **Three Card (3카드)**: 과거-현재-미래 / 상황-행동-결과
3. **Celtic Cross (켈틱 크로스)**: 10장, 가장 복잡한 스프레드
4. **Relationship (관계 스프레드)**: 4~5장, 두 사람의 관계 분석
5. **Yes/No (예/아니오)**: 2장, 빠른 답변

**학습 화면 구성**
- 스프레드 목록 (카드 수, 난이도 별)
- 선택 후:
  - 스프레드 다이어그램 (위치별 번호 표시)
  - 각 위치의 의미 설명
  - "이 스프레드로 연습하기" 버튼
  - 예시 리딩 (미리 만들어진 샘플)

**실습 모드**
```
스프레드 선택 → 질문 입력 → 위치별로 카드 뽑기
→ 각 위치 의미 보기 → 통합 해석 안내 → 저장
```

**Acceptance Criteria**
- [ ] 5가지 스프레드 모두 명확한 다이어그램 제공
- [ ] 각 위치별 의미 텍스트 완성
- [ ] 스프레드 실습 시 위치별 카드 올바르게 배치
- [ ] 저장된 리딩에 스프레드 정보 포함

#### 2.4 오프라인 지원 (Offline-First Architecture)

**기능 설명**
- 앱 처음 실행 시 전체 카드 데이터 (이미지 포함) 로컬 저장
- 네트워크 없을 때도 모든 기능 정상 작동
- 오프라인 상태 명시 표시

**구현 방식**
- Service Worker + IndexedDB 활용
- 카드 이미지 Base64 또는 WebP 최적화 저장
- 메타데이터 (JSON) 로컬 캐시
- 온라인 복귀 시 자동 동기화

**사용자 경험**
- 첫 로드: "데이터 다운로드 중... (3~5초)"
- 이후: 즉시 접근, 아이콘으로 "오프라인 모드" 표시
- 네트워크 복구 시 자동 업데이트 확인

**Acceptance Criteria**
- [ ] 2G 네트워크 시뮬레이션에서 첫 로드 10초 이내
- [ ] 오프라인 상태에서 모든 데이터 조회 가능
- [ ] 리딩 데이터 로컬 저장 (localStorage/IndexedDB)
- [ ] 온라인 복귀 후 동기화 우아하게 처리

#### 2.5 학습 진도 추적 (Progress Tracking) - TIER 2

**기능 설명**
- 사용자가 학습한 카드 개수 표시
- 메이저/마이너별 완료도
- 학습 목표 달성도

**대시보드**
```
오늘 학습한 카드: 3장
이번 주: 12장
전체 진도: 23/78 (29%)

메이저 아르카나: 12/22 (55%)
마이너 아르카나: 11/56 (20%)
```

**구현**
- 카드 도감 접근 시 "학습함" 표시
- 리딩 시 사용한 카드도 자동 기록
- 로컬 저장 (last_viewed_date, view_count)

**Acceptance Criteria**
- [ ] 카드별 마지막 학습 날짜 저장
- [ ] 진도 통계 정확하게 계산
- [ ] 시각화 (프로그레스 바, 원형 차트) 명확

#### 2.6 리딩 기록 (Reading History) - TIER 2

**기능 설명**
- 과거 리딩 세션 저장 및 조회
- 언제, 어떤 질문에 어떤 결과가 나왔는지 기록

**기록 목록 화면**
```
2026-03-28 | 원카드 | "오늘 하루" | 카드: 태양
2026-03-27 | 3카드 | "이 관계의 미래" | 카드: 별, 연인, 태양
...
```

**상세 보기**
- 날짜 및 시간
- 리딩 유형 (원카드/3카드/...)
- 질문
- 나온 카드 목록 (이미지 포함)
- 당시의 해석 텍스트
- 편집/삭제 버튼

**Acceptance Criteria**
- [ ] 리딩 JSON 완전히 저장 (카드, 질문, 타임스탬프)
- [ ] 최대 1000개 기록 로컬 저장 가능
- [ ] 검색 및 정렬 (최신순, 오래된순) 지원

---

### 3. 타로 카드 데이터 모델

#### TypeScript 인터페이스

```typescript
// 기본 카드 정보
interface TarotCard {
  id: string;                    // "major_0" | "minor_cups_1" 등
  number: number;                // 메이저: 0~21, 마이너: 1~14 (에이스~킹)
  koreanName: string;           // "바보" | "마술사" 등
  englishName: string;          // "The Fool" | "The Magician"
  arcana: "major" | "minor";    // 아르카나 분류
  suit?: "cups" | "wands" | "swords" | "pentacles"; // 마이너만
  upright: CardMeaning;         // 정방향 의미
  reversed: CardMeaning;        // 역방향 의미
  keywords: string[];           // 연관 키워드
  astrologySign?: string;       // 점성술 대응 (메이저만)
  element?: string;             // 원소 (마이너)
  image: {
    url: string;                // 이미지 경로
    dataUri?: string;           // 오프라인용 Base64
    description: string;        // 이미지 설명 (접근성)
  };
  historicalBackground?: string; // 역사적 배경 (선택)
}

interface CardMeaning {
  shortMeaning: string;         // "변화, 시작, 무한한 가능성"
  longMeaning: string;          // 상세 설명 (2~3문장)
  context: {
    love?: string;              // 사랑 관계에서의 의미
    career?: string;            // 직업/경력에서의 의미
    finances?: string;          // 금전에서의 의미
    spirituality?: string;       // 영적 의미
  };
}

// 스프레드 정보
interface TarotSpread {
  id: string;                   // "one_card" | "celtic_cross" 등
  koreanName: string;           // "원카드" | "켈틱 크로스"
  englishName: string;
  description: string;          // 이 스프레드를 사용할 때
  cardCount: number;            // 사용할 카드 수
  difficulty: 1 | 2 | 3 | 4 | 5; // 1(초급) ~ 5(고급)
  positions: SpreadPosition[];   // 위치별 의미
  illustration?: string;        // 스프레드 다이어그램
  exampleReadings?: ExampleReading[]; // 예시 리딩
}

interface SpreadPosition {
  position: number;             // 1, 2, 3, ...
  label: string;                // "과거" | "현재" | "미래"
  meaning: string;              // "이 위치가 나타내는 의미..."
  guidingQuestion: string;      // "이 카드는 과거의 어떤 영향을 보여주나?"
}

interface ExampleReading {
  question: string;
  cards: Array<{
    position: number;
    card: string;               // TarotCard.id
    isReversed: boolean;
  }>;
  interpretation: string;
}

// 리딩 세션 기록
interface ReadingSession {
  id: string;                   // UUID
  timestamp: number;            // Unix timestamp
  spreadId: string;             // 사용한 스프레드
  question: string;
  cards: DrawnCard[];
  userNotes?: string;           // 사용자 메모
  savedAt: number;
}

interface DrawnCard {
  position: number;             // 스프레드의 위치 (원카드는 항상 1)
  cardId: string;               // TarotCard.id
  isReversed: boolean;
}

// 사용자 프로필 (로컬)
interface UserProfile {
  lastUpdated: number;
  learnedCards: {
    [cardId: string]: {
      lastViewedAt: number;
      viewCount: number;
      isFavorite: boolean;
    };
  };
  readingSessions: ReadingSession[];
  settings: {
    language: "ko" | "en";
    cardImageSize: "small" | "medium" | "large";
    showReversedCards: boolean;
    dailyReminder: boolean;
  };
}
```

#### 데이터 구조 예시

```typescript
// 메이저 아르카나 예시
const majorCards: TarotCard[] = [
  {
    id: "major_0",
    number: 0,
    koreanName: "바보",
    englishName: "The Fool",
    arcana: "major",
    upright: {
      shortMeaning: "새로운 시작, 모험, 자유",
      longMeaning: "변화의 시작을 나타냅니다. 미지의 길로 나아가는 용기와 낙관주의를 상징합니다.",
      context: {
        love: "새로운 관계의 시작 또는 사랑의 모험",
        career: "새로운 직업 기회 또는 창직",
        finances: "위험한 투자 또는 새로운 사업",
        spirituality: "영적 깨달음의 시작"
      }
    },
    reversed: {
      shortMeaning: "무모함, 위험, 미숙함",
      longMeaning: "신중함 없이 앞으로 나아가려는 충동을 경고합니다.",
      context: {
        love: "준비되지 않은 관계 진전",
        career: "무계획한 퇴직이나 이직",
        finances: "무분별한 소비",
        spirituality: "현실을 외면하려는 경향"
      }
    },
    keywords: ["새로운 시작", "모험", "자유", "창의성", "순수함"],
    astrologySign: "천왕성",
    image: {
      url: "/images/major_00_fool.webp",
      description: "절벽 앞에 서서 하늘을 향해 손을 펼친 인물"
    }
  },
  // ... 더 많은 메이저 카드
];

// 마이너 아르카나 예시
const minorCards: TarotCard[] = [
  {
    id: "minor_cups_1",
    number: 1,
    koreanName: "컵의 에이스",
    englishName: "Ace of Cups",
    arcana: "minor",
    suit: "cups",
    upright: {
      shortMeaning: "새로운 감정, 사랑, 영감",
      longMeaning: "감정적인 새로운 시작이나 깊은 만족감을 나타냅니다.",
      context: {
        love: "새로운 사랑의 시작",
        career: "창의적 영감",
        finances: "선물이나 예상 외의 이득",
        spirituality: "영적 경험"
      }
    },
    reversed: {
      shortMeaning: "감정 차단, 실망, 거절",
      longMeaning: "감정 표현의 어려움이나 관계의 단절을 나타냅니다.",
      context: {
        love: "사랑 관계의 어려움",
        career: "창의성 부족",
        finances: "손실",
        spirituality: "마음의 닫힘"
      }
    },
    keywords: ["사랑", "창의성", "감정", "기쁨", "연결"],
    suit: "cups",
    element: "물",
    image: {
      url: "/images/minor_cups_01.webp",
      description: "하늘 손에서 나오는 황금 컵으로부터 나오는 물"
    }
  },
  // ... 더 많은 마이너 카드
];

// 스프레드 예시
const spreads: TarotSpread[] = [
  {
    id: "one_card",
    koreanName: "원카드",
    englishName: "One Card",
    description: "빠르고 간단한 조언을 원할 때 사용합니다. 하루를 위한 조언이나 명확한 질문에 답할 때 효과적입니다.",
    cardCount: 1,
    difficulty: 1,
    positions: [
      {
        position: 1,
        label: "조언",
        meaning: "당신의 질문에 대한 우주의 메시지",
        guidingQuestion: "이 카드가 나에게 전하는 메시지는 무엇인가?"
      }
    ]
  },
  {
    id: "three_card",
    koreanName: "3카드 스프레드",
    englishName: "Three Card Spread",
    description: "과거-현재-미래 또는 상황-행동-결과를 분석하는 가장 인기 있는 스프레드입니다.",
    cardCount: 3,
    difficulty: 2,
    positions: [
      {
        position: 1,
        label: "과거",
        meaning: "현재 상황으로 이르게 한 배경",
        guidingQuestion: "어떤 과정을 거쳐 지금에 이르렀나?"
      },
      {
        position: 2,
        label: "현재",
        meaning: "지금 당신이 직면한 상황",
        guidingQuestion: "지금 내 상태는 어떻고, 주변 환경은?"
      },
      {
        position: 3,
        label: "미래",
        meaning: "현재 흐름이 진행될 경우의 결과",
        guidingQuestion: "이대로 진행되면 어떻게 될까?"
      }
    ]
  },
  // ... 더 많은 스프레드
];
```

---

## 화면 목록

### 화면 구조 (Information Architecture)

```
App
├─ Onboarding (처음 1회만)
│  ├─ 환영 화면
│  ├─ 데이터 로드 (오프라인 캐시)
│  └─ 퀵 튜토리얼
│
├─ Main Navigation (하단 탭)
│  ├─ Home (홈)
│  ├─ Library (카드 도감)
│  ├─ Reading (리딩)
│  ├─ Learning (학습)
│  └─ Profile (내 정보)
│
├─ Home
│  ├─ 일일 조언 (원카드)
│  ├─ 학습 진도
│  └─ 최근 리딩
│
├─ Library (카드 도감)
│  ├─ 카드 목록
│  │  ├─ 메이저 아르카나 (22장)
│  │  └─ 마이너 아르카나 (56장)
│  └─ 카드 상세 정보
│
├─ Reading (리딩)
│  ├─ 리딩 모드 선택
│  │  ├─ 원카드
│  │  ├─ 3카드
│  │  ├─ 켈틱 크로스
│  │  ├─ 관계 스프레드
│  │  └─ 예/아니오
│  ├─ 리딩 실행
│  └─ 리딩 기록 보기
│
├─ Learning (학습)
│  ├─ 스프레드 교실
│  │  ├─ 스프레드 선택
│  │  └─ 스프레드 상세 학습
│  └─ 학습 진도 (진도율, 통계)
│
└─ Profile (내 정보)
   ├─ 학습 통계
   ├─ 즐겨찾기 카드
   ├─ 설정
   └─ 도움말
```

### 상세 화면 목록

| 화면 ID | 화면명 | 설명 | 주요 컴포넌트 |
|---------|--------|------|--------------|
| **1. ONBOARDING** |
| 1.1 | Welcome | 앱 소개, 첫 실행 | 환영 문구, 시작 버튼 |
| 1.2 | Loading | 데이터 로드 | 프로그레스 바, 로드 상태 |
| 1.3 | Tutorial | 기본 사용법 | 슬라이드, 스킵 버튼 |
| **2. HOME** |
| 2.1 | Home | 메인 대시보드 | 일일 조언 카드, 진도, 최근 리딩 |
| **3. CARD LIBRARY** |
| 3.1 | Card List | 카드 목록 | 메이저/마이너 탭, 검색, 필터 |
| 3.2 | Card Detail | 카드 상세 | 이미지, 의미, 키워드, 즐겨찾기 |
| 3.3 | Card Search | 검색 결과 | 검색 결과 목록 |
| **4. READING** |
| 4.1 | Reading Mode | 스프레드 선택 | 5가지 스프레드 카드 UI |
| 4.2 | Reading (One Card) | 원카드 리딩 | 카드 뽑기, 의미 표시 |
| 4.3 | Reading (3 Card) | 3카드 리딩 | 3개 위치, 순차 카드 뽑기 |
| 4.4 | Reading (Celtic Cross) | 켈틱 크로스 | 10개 위치, 다이어그램 |
| 4.5 | Reading (Relationship) | 관계 스프레드 | 4~5개 위치 |
| 4.6 | Reading (Yes/No) | 예/아니오 | 2개 위치, 간단 해석 |
| 4.7 | Reading Save | 리딩 저장 | 저장/공유/다시 뽑기 선택 |
| 4.8 | Reading History | 리딩 기록 | 목록, 검색, 정렬 |
| 4.9 | Reading Detail | 리딩 상세 | 날짜, 카드, 해석, 편집 |
| **5. LEARNING** |
| 5.1 | Spread Library | 스프레드 목록 | 5가지 스프레드 카드 |
| 5.2 | Spread Detail | 스프레드 학습 | 다이어그램, 위치별 설명 |
| 5.3 | Spread Practice | 스프레드 연습 | 실제 리딩 수행 |
| 5.4 | Progress | 학습 진도 | 통계, 메이저/마이너 비율 |
| **6. PROFILE** |
| 6.1 | Profile | 프로필 | 통계, 즐겨찾기, 설정 |
| 6.2 | Statistics | 학습 통계 | 차트, 자세한 진도 |
| 6.3 | Favorites | 즐겨찾기 | 저장한 카드 목록 |
| 6.4 | Settings | 설정 | 언어, 이미지 크기, 알림 등 |
| 6.5 | Help | 도움말 | FAQ, 용어 해설 |

---

## 비기능 요구사항

### 성능 (Performance)
- 초기 로드 시간: 3~5초 (2G 네트워크 기준)
- 카드 조회: < 500ms
- 리딩 카드 뽑기: 애니메이션 포함 < 1초
- 검색: < 300ms

### 보안 & 개인정보
- 모든 데이터 로컬 저장 (클라우드 동기화 없음)
- localStorage/IndexedDB 활용
- 민감한 정보 없음 (로그인 불필요)

### 접근성 (Accessibility)
- WCAG 2.1 AA 준수
- 카드 이미지 대체 텍스트 (alt text)
- 명확한 색상 대비 (APCA 기준)
- 모바일 키보드 네비게이션 지원

### 브라우저 호환성
- iOS Safari 12+
- Chrome 90+
- Firefox 88+

### 모바일 최적화
- 반응형 디자인 (320px ~ 768px)
- 터치 친화적 UI (최소 44x44px 터치 타겟)
- 네트워크 대역폭 최소화 (이미지 최적화)

---

## 오픈 이슈 & 리스크

### 오픈 이슈
1. **카드 해석 소스**: 기본 카드 의미 텍스트의 출처 및 저작권 확인
   - 해결책: 타로 교과서 기반 + 자체 작성으로 조합

2. **이미지 자산**: 78장 카드 이미지 확보
   - 해결책: 공개 도메인 또는 라이선스 이미지 활용 (e.g., Rider-Waite)

3. **마이너 아르카나 구분**: 마이너 아르카나 숫자 카드(1~10) vs 궁정 카드(11~14) 용어 정의
   - 해결책: 표준 타로 용어 (에이스~10, 페이지~킹) 사용

### 리스크

| 리스크 | 영향 | 확률 | 완화 방안 |
|--------|------|------|----------|
| 오프라인 캐시 실패 | 앱 불가용 | 중 | Service Worker + IndexedDB 이중화 |
| 카드 이미지 로드 실패 | UX 저하 | 중 | Fallback UI (텍스트만 표시) 준비 |
| 무작위 알고리즘 문제 | 신뢰도 하락 | 낮음 | 알고리즘 검증 테스트 (샘플 크기 10k+) |
| 데이터 손실 (사용자 로컬) | 학습 정보 손실 | 낮음 | 주기적 백업 기능 추가 (export JSON) |

---

## 일정 및 마일스톤

### Phase 1: MVP (Week 1~4)
- **Week 1-2**: 카드 도감 + 원카드 리딩
- **Week 3**: 스프레드 라이브러리 + 오프라인 지원
- **Week 4**: QA, 버그 수정, 버전 1.0 출시

### Phase 2: 핵심 강화 (Week 5~8)
- **Week 5-6**: 스프레드별 리딩 구현
- **Week 7**: 학습 진도 추적 + 리딩 기록
- **Week 8**: 카드 즐겨찾기, UI/UX 개선

### Phase 3: 고급 기능 (Week 9+)
- 사용자 정의 스프레드
- 리딩 해석 AI
- 커뮤니티 공유
- 학습 랜덤 퀴즈

---

## 개발 진행 추적

### 완료 체크리스트
- [ ] 카드 데이터 모델 확정 및 초기 데이터 준비 (20장)
- [ ] React 프로젝트 초기 설정 (Vite, TypeScript)
- [ ] 카드 도감 UI 개발
- [ ] 원카드 리딩 UI 개발
- [ ] 오프라인 캐싱 구현
- [ ] 모바일 반응형 테스트
- [ ] 초기 사용자 테스트 (5~10명)
- [ ] 문서화 및 온보딩

---

**작성일**: 2026-03-28
**버전**: 1.0
**담당자**: Product Team
