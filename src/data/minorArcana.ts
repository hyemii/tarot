// 마이너 아르카나 카드 데이터 — 4개 수트 × 14장 = 56장
// 수트별 특성: 컵(감정/물), 완드(열정/불), 검(이성/공기), 펜타클(물질/땅)

import type { TarotCard } from '../types/tarot';
import { getCardImageUrl } from '@/utils/imageUrls';

// 수트별 핵심 특성 정의 — 카드 의미 생성에 사용
const SUIT_TRAITS = {
  cups: {
    element: 'water' as const,
    domain: '감정, 관계, 직관',
    keywords: ['감정', '관계', '직관', '사랑', '꿈'],
  },
  wands: {
    element: 'fire' as const,
    domain: '열정, 창의성, 행동',
    keywords: ['열정', '창의성', '야망', '에너지', '성장'],
  },
  swords: {
    element: 'air' as const,
    domain: '지성, 갈등, 진실',
    keywords: ['지성', '갈등', '결단', '진실', '변화'],
  },
  pentacles: {
    element: 'earth' as const,
    domain: '물질, 재정, 현실',
    keywords: ['물질', '재정', '안정', '노력', '현실'],
  },
};

// 카드 번호별 핵심 주제 — 수트와 결합하여 의미 생성
const NUMBER_THEMES: Record<
  number,
  { koreanName: string; upright: string; reversed: string }
> = {
  1:  { koreanName: '에이스',  upright: '새로운 시작, 잠재력, 순수한 에너지',  reversed: '지연, 차단된 에너지, 시작의 어려움' },
  2:  { koreanName: '2',       upright: '균형, 선택, 파트너십',               reversed: '불균형, 우유부단, 갈등' },
  3:  { koreanName: '3',       upright: '성장, 협력, 창조적 표현',             reversed: '고립, 창의성 차단, 불화' },
  4:  { koreanName: '4',       upright: '안정, 기초, 휴식',                   reversed: '정체, 두려움, 변화 거부' },
  5:  { koreanName: '5',       upright: '도전, 갈등, 변화',                   reversed: '회피, 극복, 타협' },
  6:  { koreanName: '6',       upright: '조화, 회복, 나눔',                   reversed: '불균형, 이기심, 과거 집착' },
  7:  { koreanName: '7',       upright: '평가, 전략, 인내',                   reversed: '불안, 포기, 의심' },
  8:  { koreanName: '8',       upright: '진보, 기술 발전, 집중',              reversed: '분산, 재평가, 지연' },
  9:  { koreanName: '9',       upright: '성취 근접, 독립, 내면의 힘',         reversed: '고립, 두려움, 자기 의심' },
  10: { koreanName: '10',      upright: '완성, 순환의 끝, 풍요',              reversed: '손실, 과부하, 전환점' },
  11: { koreanName: '페이지', upright: '학습, 호기심, 새로운 메시지',         reversed: '미성숙, 성급함, 잘못된 정보' },
  12: { koreanName: '나이트', upright: '행동, 에너지, 이상 추구',             reversed: '충동, 산만함, 과격함' },
  13: { koreanName: '퀸',     upright: '양육, 직관, 감성적 성숙',             reversed: '감정 조종, 의존, 불안정' },
  14: { koreanName: '킹',     upright: '숙달, 리더십, 권위',                 reversed: '횡포, 냉담, 미성숙' },
};

// 수트별 카드 이름 접미사
const SUIT_KOREAN: Record<string, string> = {
  cups: '컵',
  wands: '완드',
  swords: '검',
  pentacles: '펜타클',
};

// 수트와 번호로 마이너 아르카나 카드 1장 생성
function createMinorCard(
  suit: 'cups' | 'wands' | 'swords' | 'pentacles',
  number: number
): TarotCard {
  const theme = NUMBER_THEMES[number];
  const traits = SUIT_TRAITS[suit];
  const cardId = `minor_${suit}_${number}`;
  const suitKorean = SUIT_KOREAN[suit];

  const displayName =
    number <= 10
      ? `${theme.koreanName} ${suitKorean}`
      : `${suitKorean}의 ${theme.koreanName}`;

  return {
    id: cardId,
    number,
    koreanName: displayName,
    englishName: `${number <= 10 ? number === 1 ? 'Ace' : `${number}` : theme.koreanName} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    arcana: 'minor',
    suit,
    element: traits.element,
    upright: {
      shortMeaning: `${theme.upright} (${traits.domain})`,
      longMeaning: `${suitKorean} ${theme.koreanName} 정방향은 ${theme.upright}를 나타냅니다. ${traits.domain} 영역에서 이 에너지가 긍정적으로 발현됩니다.`,
      context: {
        love: `감정적 측면에서 ${theme.upright}를 경험합니다.`,
        career: `직업적 측면에서 ${theme.upright}의 에너지가 작용합니다.`,
        finances: `재정적 측면에서 ${theme.upright}를 나타냅니다.`,
        spirituality: `영적 성장에서 ${theme.upright}의 의미를 발견합니다.`,
      },
    },
    reversed: {
      shortMeaning: `${theme.reversed}`,
      longMeaning: `${suitKorean} ${theme.koreanName} 역방향은 ${theme.reversed}를 나타냅니다. 이 에너지를 재점검하고 균형을 찾는 것이 필요합니다.`,
      context: {
        love: `감정적 측면에서 ${theme.reversed}에 주의하세요.`,
        career: `직업적 측면에서 ${theme.reversed}를 경계하세요.`,
        finances: `재정적 측면에서 ${theme.reversed}를 주의하세요.`,
        spirituality: `영적 성장에서 ${theme.reversed}를 극복하는 과제가 있습니다.`,
      },
    },
    keywords: [...traits.keywords],
    image: {
      url: getCardImageUrl(cardId),
      description: `${displayName} 카드`,
    },
  };
}

// 4개 수트 × 14장 = 56장 마이너 아르카나 카드 생성
const SUITS = ['cups', 'wands', 'swords', 'pentacles'] as const;

export const minorArcanaCards: TarotCard[] = SUITS.flatMap((suit) =>
  Array.from({ length: 14 }, (_, i) => createMinorCard(suit, i + 1))
);

// 마이너 아르카나 전체 카드 반환
export function getAllMinorCards(): TarotCard[] {
  return minorArcanaCards;
}

// ID로 마이너 카드 조회
export function getMinorCardById(cardId: string): TarotCard | undefined {
  return minorArcanaCards.find((card) => card.id === cardId);
}
