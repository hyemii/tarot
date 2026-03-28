// 리딩 세션 스토어 — 진행 중인 리딩의 상태(스프레드 선택 → 카드 드로우 → 결과)를 관리

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { ReadingSession, DrawnCard, TarotSpread } from '@/types/tarot';

// 리딩 진행 단계
type ReadingPhase = 'idle' | 'drawing' | 'result';

interface ReadingStore {
  phase: ReadingPhase;
  currentSpread: TarotSpread | null;
  question: string;
  drawnCards: DrawnCard[];
  // 리딩 시작: 선택한 스프레드와 질문을 저장
  startReading: (spread: TarotSpread, question: string) => void;
  // 카드 한 장 드로우: 스프레드의 카드 수를 채우면 result 단계로 자동 전환
  drawCard: (card: DrawnCard) => void;
  // 현재 세션 데이터로 ReadingSession 객체 생성 (저장 전 단계)
  buildSession: () => ReadingSession;
  // 리딩 상태 초기화 (idle로 복귀)
  resetReading: () => void;
}

export const useReadingStore = create<ReadingStore>()(
  immer((set, get) => ({
    phase: 'idle',
    currentSpread: null,
    question: '',
    drawnCards: [],

    startReading: (spread, question) => {
      set((state) => {
        state.phase = 'drawing';
        state.currentSpread = spread;
        state.question = question;
        state.drawnCards = [];
      });
    },

    drawCard: (card) => {
      set((state) => {
        state.drawnCards.push(card);
        // 스프레드의 모든 포지션이 채워지면 결과 화면으로 전환
        if (state.currentSpread && state.drawnCards.length === state.currentSpread.cardCount) {
          state.phase = 'result';
        }
      });
    },

    buildSession: () => {
      const { currentSpread, question, drawnCards } = get();
      return {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        savedAt: Date.now(),
        spreadId: currentSpread!.id,
        question,
        cards: [...drawnCards],
      };
    },

    resetReading: () => {
      set((state) => {
        state.phase = 'idle';
        state.currentSpread = null;
        state.question = '';
        state.drawnCards = [];
      });
    },
  }))
);
