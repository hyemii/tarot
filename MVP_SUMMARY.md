# 타로 학습 웹앱 MVP 요구사항 - 빠른 참조

## 1. MVP 핵심 기능 (우선순위 순)

### TIER 1 - 필수 (Week 1~2)
| # | 기능 | 설명 | 상태 |
|---|------|------|------|
| 1 | 카드 도감 | 78장 카드 (메이저 22 + 마이너 56) 조회, 검색, 필터 | `TODO` |
| 2 | 원카드 리딩 | 1장 뽑기, 의미 표시, 저장 | `TODO` |
| 3 | 스프레드 교실 | 5가지 기본 스프레드 구조 학습 | `TODO` |
| 4 | 오프라인 지원 | Service Worker + IndexedDB로 전체 데이터 캐시 | `TODO` |

### TIER 2 - 핵심 강화 (Week 3~4)
| # | 기능 | 설명 |
|---|------|------|
| 5 | 다중 카드 리딩 | 3카드, 켈틱 크로스, 관계, 예/아니오 스프레드 |
| 6 | 학습 진도 추적 | 카드별 학습 통계, 메이저/마이너 비율 |
| 7 | 리딩 기록 | 과거 세션 저장/조회, 노트 추가 |
| 8 | 카드 즐겨찾기 | 관심 카드 저장 목록 |

### TIER 3 - 나중에 (Week 5+)
- 사용자 정의 스프레드
- AI 해석 지원
- 커뮤니티 공유
- 학습 퀴즈

---

## 2. 데이터 모델 (TypeScript)

### 핵심 타입
```typescript
// 카드
interface TarotCard {
  id: string;                    // "major_0", "minor_cups_1"
  number: number;
  koreanName: string;
  englishName: string;
  arcana: "major" | "minor";
  upright: CardMeaning;          // 정방향 의미
  reversed: CardMeaning;         // 역방향 의미
  keywords: string[];
  astrologySign?: string;        // 메이저만
  element?: string;              // 마이너만
  image: { url: string; dataUri?: string; description: string };
}

// 스프레드
interface TarotSpread {
  id: string;                    // "one_card", "celtic_cross"
  koreanName: string;
  cardCount: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  positions: SpreadPosition[];   // 각 위치의 의미
  exampleReadings?: ExampleReading[];
}

// 리딩 세션
interface ReadingSession {
  id: string;                    // UUID
  timestamp: number;
  spreadId: string;
  question: string;
  cards: DrawnCard[];            // { position, cardId, isReversed }
  userNotes?: string;
}

// 사용자 프로필
interface UserProfile {
  learnedCards: { [cardId: string]: CardLearningData };
  readingSessions: ReadingSession[];
  settings: UserSettings;
}
```

**저장 위치**:
- `/src/types/tarot.ts` — 모든 인터페이스 정의
- `/src/data/cards.ts` — 메이저 아르카나 22장 데이터
- `/src/data/minorArcana.ts` — 마이너 아르카나 56장 (미작성)
- `/src/data/spreads.ts` — 5가지 스프레드 정의

---

## 3. 화면 구조

```
📱 App (하단 네비게이션 5탭)
├─ 🏠 Home
│  ├─ 일일 원카드 조언
│  ├─ 학습 진도 (X/78)
│  └─ 최근 리딩 3개
│
├─ 📚 Library (카드 도감)
│  ├─ 메이저 아르카나 (22장)
│  ├─ 마이너 아르카나 (56장)
│  └─ 카드 상세 화면
│
├─ 🃏 Reading (리딩)
│  ├─ 스프레드 선택 (5가지)
│  ├─ 리딩 실행 화면
│  ├─ 리딩 기록
│  └─ 기록 상세보기
│
├─ 🎓 Learning (학습)
│  ├─ 스프레드 교실
│  ├─ 스프레드 상세 학습
│  └─ 진도율 통계
│
└─ 👤 Profile
   ├─ 학습 통계
   ├─ 즐겨찾기
   ├─ 설정
   └─ 도움말
```

---

## 4. 5가지 기본 스프레드

| 스프레드 | 카드수 | 난이도 | 사용 시점 |
|---------|--------|--------|----------|
| 원카드 | 1 | ⭐ 1 | 하루 조언, 빠른 메시지 |
| 3카드 | 3 | ⭐⭐ 2 | 과거-현재-미래, 상황-행동-결과 |
| 켈틱 크로스 | 10 | ⭐⭐⭐⭐ 4 | 복잡한 상황 깊이 분석 |
| 관계 스프레드 | 5 | ⭐⭐ 2 | 두 사람 관계 분석 |
| 예/아니오 | 2 | ⭐ 1 | 명확한 답변 필요 |

---

## 5. 비기능 요구사항

### 성능
- 초기 로드: 3~5초 (2G 기준)
- 카드 조회: < 500ms
- 검색: < 300ms
- 카드 뽑기 애니메이션: 부드러운 60fps

### 오프라인
- Service Worker로 캐싱
- IndexedDB에 모든 데이터 저장
- 네트워크 없어도 100% 기능 작동

### 접근성
- WCAG 2.1 AA 준수
- Alt text for all images
- 색상 대비 (APCA)
- 터치 타겟 최소 44x44px

### 브라우저
- iOS Safari 12+
- Chrome 90+
- Firefox 88+

---

## 6. 개발 체크리스트

### Phase 1 (Week 1-2) - Card Library + One-Card Reading
- [ ] React + TypeScript 초기 설정
- [ ] 카드 데이터 완성 (메이저 22장 + 마이너 56장)
- [ ] 카드 도감 UI 개발
- [ ] 원카드 리딩 UI 개발
- [ ] 오프라인 캐싱 구현
- [ ] 모바일 반응형 테스트
- [ ] 초기 사용자 테스트 (5명)

### Phase 2 (Week 3-4) - Spreads + History
- [ ] 다중 카드 스프레드 리딩
- [ ] 학습 진도 추적
- [ ] 리딩 기록 저장/조회
- [ ] 카드 즐겨찾기
- [ ] QA 및 버그 수정
- [ ] 문서화

---

## 7. 오픈 이슈 & 리스크

### 오픈 이슈
1. **카드 이미지**: 78장 이미지 자산 확보 (라이선스 확인 필요)
2. **카드 텍스트**: 기본 의미 한글화 검증
3. **마이너 아르카나**: 마이너 56장 데이터 아직 미작성

### 리스크
| 리스크 | 영향 | 완화 방안 |
|--------|------|----------|
| 오프라인 캐시 실패 | 앱 불가용 | Service Worker + IndexedDB 이중화 |
| 카드 이미지 로드 실패 | UX 저하 | Fallback UI (텍스트 전용) 준비 |
| 무작위 알고리즘 문제 | 신뢰도 하락 | 샘플 10k+ 테스트 |
| 데이터 손실 | 학습 정보 손실 | Export JSON 백업 기능 추가 |

---

## 8. 성공 지표 (KPI)

| 지표 | 목표 | 측정 방법 |
|------|------|---------|
| DAU | - | 앱 실행 로그 |
| 카드 학습 완료율 | 50%+ 초급자가 50장+ 학습 | 학습 추적 |
| 리딩 빈도 | 월평균 10회+ | 세션 로그 |
| 오프라인 사용률 | 30%+ 세션 | 네트워크 로깅 |

---

## 9. 파일 구조 (생성됨)

```
/src
├── types/
│   └── tarot.ts                    ✅ 모든 인터페이스
├── data/
│   ├── cards.ts                    ✅ 메이저 22장
│   ├── minorArcana.ts              ⏳ 마이너 56장 (TODO)
│   └── spreads.ts                  ✅ 5가지 스프레드
├── components/
│   ├── CardLibrary/
│   ├── Reading/
│   ├── SpreadLearning/
│   └── ... (UI components)
├── hooks/
│   ├── useOfflineStorage.ts
│   ├── useReadingHistory.ts
│   └── ...
└── App.tsx

/public
└── images/
    ├── major_00_fool.webp
    ├── major_01_magician.webp
    └── ... (78 card images)
```

---

## 10. 다음 스텝

1. **이미지 자산 확보**: 78장 카드 이미지 수집 (라이선스 확인)
2. **마이너 아르카나 데이터**: minorArcana.ts 작성 (56장)
3. **UI 컴포넌트 개발**: CardLibrary, Reading, SpreadLearning
4. **오프라인 캐싱**: Service Worker + IndexedDB 구현
5. **초기 사용자 테스트**: 피드백 수집 및 반복

---

**작성일**: 2026-03-28
**문서 버전**: 1.0
**관련 파일**:
- `/REQUIREMENTS.md` — 상세 요구사항서 (이 문서의 확장)
- `/src/types/tarot.ts` — TypeScript 인터페이스
- `/src/data/cards.ts` — 카드 데이터
- `/src/data/spreads.ts` — 스프레드 데이터
