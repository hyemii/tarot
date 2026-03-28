// 카드 필터링과 검색 로직 — 검색어, 아르카나 종류, 수트로 카드를 필터링

import { useMemo } from 'react';
import { getAllCards } from '@/data/cards';
import { getAllMinorCards } from '@/data/minorArcana';
import type { TarotCard, CardFilter } from '@/types/tarot';

import { getCardImageUrl } from '@/utils/imageUrls';

// 카드 데이터에 올바른 이미지 URL을 적용하여 반환
// cards.ts에 저장된 URL이 실제 파일 경로와 다를 수 있어 런타임에 보정
function applyCorrectImageUrls(cards: TarotCard[]): TarotCard[] {
  return cards.map((card) => ({
    ...card,
    image: { ...card.image, url: getCardImageUrl(card.id) },
  }));
}

// 전체 78장 카드를 메모이제이션하여 불필요한 재계산 방지
function useAllCards(): TarotCard[] {
  return useMemo(
    () => applyCorrectImageUrls([...getAllCards(), ...getAllMinorCards()]),
    []
  );
}

// 필터 조건에 따라 카드 목록을 필터링하여 반환
export function useFilteredCards(filter: CardFilter): TarotCard[] {
  const allCards = useAllCards();

  return useMemo(() => {
    return allCards.filter((card) => {
      // 아르카나 종류 필터 (major/minor)
      if (filter.arcana && card.arcana !== filter.arcana) return false;

      // 수트 필터 (minor 카드의 컵/완드/검/펜타클)
      if (filter.suit && card.suit !== filter.suit) return false;

      // 키워드 검색: 카드 이름(한/영)과 키워드에서 검색
      if (filter.searchTerm) {
        const term = filter.searchTerm.toLowerCase();
        const matchesName =
          card.koreanName.includes(filter.searchTerm) ||
          card.englishName.toLowerCase().includes(term);
        const matchesKeyword = card.keywords.some((kw) => kw.toLowerCase().includes(term));
        if (!matchesName && !matchesKeyword) return false;
      }

      return true;
    });
  }, [allCards, filter]);
}

export { useAllCards };
