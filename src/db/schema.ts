// IndexedDB 스키마 정의 — 버전 관리와 스토어 이름을 한 곳에서 관리

export const DB_NAME = 'hmyu-tarot-db';
export const DB_VERSION = 1;

export const STORES = {
  // 사용자 프로필 스토어 (항상 단일 레코드 'singleton' 키 사용)
  USER_PROFILE: 'userProfile',
  // 리딩 세션 스토어 (UUID 키, timestamp 인덱스)
  READING_SESSIONS: 'readingSessions',
  // 카드별 학습 데이터 스토어 (cardId 키)
  CARD_LEARNING: 'cardLearning',
} as const;
