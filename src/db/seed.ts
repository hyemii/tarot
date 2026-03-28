// DB 초기 데이터 시드 — 최초 실행 시 마스터 데이터가 없을 때만 실행

import { getDB } from './client';
import { STORES } from './schema';

// 시드 완료 여부를 로컬 스토리지로 추적하여 매 실행마다 중복 시드 방지
const SEED_KEY = 'hmyu-tarot-seeded-v1';

export async function seedIfNeeded(): Promise<void> {
  // 이미 시드가 완료된 경우 스킵
  if (localStorage.getItem(SEED_KEY)) return;

  const db = await getDB();

  // 카드 학습 데이터가 이미 있으면 시드 불필요
  const existingCount = await db.count(STORES.CARD_LEARNING);
  if (existingCount > 0) {
    localStorage.setItem(SEED_KEY, 'true');
    return;
  }

  // 현재는 별도 시드 데이터 없음 — 향후 초기 학습 데이터나 예시 리딩 추가 시 여기에 구현
  localStorage.setItem(SEED_KEY, 'true');
}
