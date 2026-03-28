// 사용자 프로필 저장소 — 학습 진도, 설정, 즐겨찾기를 IndexedDB에서 관리

import { getDB } from '../client';
import { STORES } from '../schema';
import type { UserProfile } from '@/types/tarot';
import { DEFAULT_USER_SETTINGS } from '@/types/tarot';

// 항상 이 키로 단일 프로필 레코드를 저장/조회
const PROFILE_KEY = 'singleton';

// 프로필이 없을 때 사용할 초기값 생성
// 매 호출마다 새 객체를 만들어 참조 오염 방지
function createDefaultProfile(): UserProfile {
  return {
    id: PROFILE_KEY,
    lastUpdated: Date.now(),
    learnedCards: {},
    readingSessions: [],
    settings: { ...DEFAULT_USER_SETTINGS },
    appVersion: '1.0.0',
  } as UserProfile & { id: string };
}

export const profileRepository = {
  // 프로필 조회 — 없으면 기본값으로 초기화하여 반환
  async get(): Promise<UserProfile> {
    const db = await getDB();
    const stored = await db.get(STORES.USER_PROFILE, PROFILE_KEY);
    if (!stored) {
      const defaultProfile = createDefaultProfile();
      await db.put(STORES.USER_PROFILE, defaultProfile);
      return defaultProfile;
    }
    return stored;
  },

  // 프로필 저장 — lastUpdated를 항상 현재 시각으로 갱신
  async save(profile: UserProfile): Promise<void> {
    const db = await getDB();
    await db.put(STORES.USER_PROFILE, {
      ...profile,
      id: PROFILE_KEY,
      lastUpdated: Date.now(),
    });
  },
};
