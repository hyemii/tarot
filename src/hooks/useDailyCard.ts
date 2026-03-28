// 일일 원카드 — 날짜 기반 시드로 매일 다른 카드를 일관되게 선택

import { useMemo } from 'react';
import { useAllCards } from './useCards';
import type { TarotCard } from '@/types/tarot';

// 오늘 날짜 문자열(YYYY-MM-DD)을 숫자로 변환하여 카드 선택 시드로 사용
// 같은 날에는 항상 같은 카드가 나오도록 결정적(deterministic) 알고리즘 적용
function dateToSeed(dateStr: string): number {
  return dateStr.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

interface DailyCard {
  card: TarotCard;
  isReversed: boolean;
  dateStr: string;
}

export function useDailyCard(): DailyCard | null {
  const allCards = useAllCards();

  return useMemo(() => {
    if (allCards.length === 0) return null;

    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10); // "2026-03-28"
    const seed = dateToSeed(dateStr);

    // 시드로 카드 인덱스와 역방향 여부 결정
    const cardIndex = seed % allCards.length;
    const isReversed = seed % 3 === 0; // 약 33% 확률로 역방향

    return {
      card: allCards[cardIndex],
      isReversed,
      dateStr,
    };
  }, [allCards]);
}
