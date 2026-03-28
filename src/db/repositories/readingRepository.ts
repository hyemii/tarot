// 리딩 세션 저장소 — 과거 리딩 기록을 IndexedDB에서 관리

import { getDB } from '../client';
import { STORES } from '../schema';
import type { ReadingSession } from '@/types/tarot';

export const readingRepository = {
  // 리딩 세션 저장 (신규 생성 및 노트 업데이트 모두 처리)
  async save(session: ReadingSession): Promise<void> {
    const db = await getDB();
    await db.put(STORES.READING_SESSIONS, session);
  },

  // 모든 리딩 세션을 최신 순으로 반환
  async getAll(): Promise<ReadingSession[]> {
    const db = await getDB();
    const sessions = await db.getAllFromIndex(STORES.READING_SESSIONS, 'by_timestamp');
    // IndexedDB 인덱스는 오름차순이므로 최신이 맨 위가 되도록 역순 정렬
    return sessions.reverse();
  },

  // 특정 ID의 리딩 세션 조회
  async getById(id: string): Promise<ReadingSession | undefined> {
    const db = await getDB();
    return db.get(STORES.READING_SESSIONS, id);
  },

  // 최근 N개의 리딩 세션만 반환 (홈 화면 미리보기용)
  async getRecent(limit = 5): Promise<ReadingSession[]> {
    const all = await this.getAll();
    return all.slice(0, limit);
  },

  // 리딩 세션 삭제
  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete(STORES.READING_SESSIONS, id);
  },
};
