// 카드 셔플 및 드로우 서비스 — 무작위성이 필요한 비즈니스 로직을 UI와 분리

import type { TarotCard, DrawnCard } from '@/types/tarot';

// Fisher-Yates 알고리즘으로 카드 덱을 무작위 셔플
// 이 알고리즘은 모든 순열이 동일한 확률로 나오는 균일 분포를 보장
export function shuffleDeck(cards: TarotCard[]): TarotCard[] {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// 덱에서 카드 N장을 드로우하여 포지션 정보와 함께 반환
// 각 카드는 독립적으로 역방향 여부가 결정됨 (50% 확률)
export function drawCards(deck: TarotCard[], count: number): DrawnCard[] {
  return deck.slice(0, count).map((card, index) => ({
    position: index + 1,
    cardId: card.id,
    isReversed: Math.random() < 0.5,
  }));
}

// 카드 ID로 카드 데이터를 빠르게 조회하기 위한 맵 생성
export function buildCardMap(cards: TarotCard[]): Map<string, TarotCard> {
  return new Map(cards.map((card) => [card.id, card]));
}
