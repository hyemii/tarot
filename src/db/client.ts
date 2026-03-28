// IndexedDB 싱글턴 클라이언트 — 앱 전체에서 하나의 DB 연결을 공유

import { openDB, type IDBPDatabase } from 'idb';
import { DB_NAME, DB_VERSION, STORES } from './schema';

let dbInstance: IDBPDatabase | null = null;

// DB를 열거나 이미 열려 있으면 기존 인스턴스를 반환
// 스키마 버전이 올라갈 때 upgrade 콜백에서 마이그레이션 수행
export async function getDB(): Promise<IDBPDatabase> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // 버전 1: 초기 스키마 생성
      // 기존 스토어를 절대 삭제하지 않고 새 스토어만 추가하여 데이터 손실 방지
      if (oldVersion < 1) {
        // 사용자 프로필: 항상 1개의 레코드만 존재 ('singleton' 키)
        db.createObjectStore(STORES.USER_PROFILE, { keyPath: 'id' });

        // 리딩 세션: UUID 기반 키, 시간 순 조회와 스프레드별 조회를 위한 인덱스
        const sessionStore = db.createObjectStore(STORES.READING_SESSIONS, { keyPath: 'id' });
        sessionStore.createIndex('by_timestamp', 'timestamp');
        sessionStore.createIndex('by_spread', 'spreadId');

        // 카드 학습 데이터: cardId를 키로 사용
        db.createObjectStore(STORES.CARD_LEARNING, { keyPath: 'cardId' });
      }
      // 향후 마이그레이션 예시:
      // if (oldVersion < 2) { /* 새 스토어나 인덱스 추가 */ }
    },
  });

  return dbInstance;
}
