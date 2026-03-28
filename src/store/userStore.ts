// 사용자 프로필 스토어 — 학습 진도, 즐겨찾기, 설정을 전역으로 관리

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import type { UserProfile, UserSettings } from '@/types/tarot';
import { profileRepository } from '@/db/repositories/profileRepository';

interface UserStore {
  profile: UserProfile | null;
  isLoaded: boolean;
  // DB에서 프로필을 불러와 스토어에 저장
  loadProfile: () => Promise<void>;
  // 설정 일부를 업데이트하고 DB에 반영
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  // 카드를 조회했을 때 학습 데이터 업데이트 (조회 횟수, 마지막 조회 시각)
  markCardViewed: (cardId: string) => Promise<void>;
  // 카드 즐겨찾기 토글
  toggleFavorite: (cardId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  devtools(
    immer((set, get) => ({
      profile: null,
      isLoaded: false,

      loadProfile: async () => {
        const profile = await profileRepository.get();
        set((state) => {
          state.profile = profile;
          state.isLoaded = true;
        });
      },

      updateSettings: async (partial) => {
        const current = get().profile;
        if (!current) return;
        // 낙관적 업데이트: UI를 먼저 갱신하고 DB에 비동기로 저장
        set((state) => {
          if (!state.profile) return;
          state.profile.settings = { ...state.profile.settings, ...partial };
        });
        await profileRepository.save(get().profile!);
      },

      markCardViewed: async (cardId) => {
        // immer 덕분에 중첩된 객체를 직접 수정하듯 간결하게 작성
        set((state) => {
          if (!state.profile) return;
          const existing = state.profile.learnedCards[cardId];
          state.profile.learnedCards[cardId] = {
            lastViewedAt: Date.now(),
            viewCount: (existing?.viewCount ?? 0) + 1,
            isFavorite: existing?.isFavorite ?? false,
          };
        });
        await profileRepository.save(get().profile!);
      },

      toggleFavorite: async (cardId) => {
        set((state) => {
          if (!state.profile) return;
          const card = state.profile.learnedCards[cardId];
          if (card) {
            card.isFavorite = !card.isFavorite;
          } else {
            // 한 번도 본 적 없는 카드도 즐겨찾기 가능
            state.profile.learnedCards[cardId] = {
              lastViewedAt: Date.now(),
              viewCount: 0,
              isFavorite: true,
            };
          }
        });
        await profileRepository.save(get().profile!);
      },
    }))
  )
);
