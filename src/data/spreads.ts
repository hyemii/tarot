/**
 * Tarot Spread Definitions
 * 5 fundamental spreads for beginners
 */

import type { TarotSpread } from "../types/tarot";

export const spreads: TarotSpread[] = [
  {
    id: "one_card",
    koreanName: "원카드",
    englishName: "One Card Reading",
    description:
      "가장 간단하고 빠른 리딩입니다. 하루를 위한 메시지, 특정 질문에 대한 조언, 또는 현재 상황을 한 장으로 요약하고 싶을 때 사용합니다. 초급자에게 매일 연습할 수 있는 완벽한 스프레드입니다.",
    cardCount: 1,
    difficulty: 1,
    positions: [
      {
        position: 1,
        label: "조언/메시지",
        meaning: "당신의 질문이나 상황에 대한 우주의 메시지",
        guidingQuestion:
          "이 카드가 나에게 전하는 핵심 메시지는 무엇인가? 나는 이를 어떻게 적용할 수 있을까?",
      },
    ],
    illustration: undefined,
    exampleReadings: [
      {
        question: "오늘 하루를 위한 조언",
        cards: [
          {
            position: 1,
            cardId: "major_19",
            isReversed: false,
          },
        ],
        interpretation:
          "태양 카드는 오늘 밝고 행복한 하루가 기다리고 있음을 나타냅니다. 긍정적인 에너지로 하루를 시작하면 좋은 일들이 일어날 것입니다. 자신감 있게 행동하세요.",
      },
      {
        question: "현재 상황은 어떤가?",
        cards: [
          {
            position: 1,
            cardId: "major_2",
            isReversed: true,
          },
        ],
        interpretation:
          "역위치 대사제는 현재 직관적으로 무언가를 느끼지 못하고 있음을 시사합니다. 명확하지 않은 정보나 혼란 속에 있을 수 있습니다. 더 깊이 생각하고, 겉보기보다 깊은 진실이 있을 가능성을 주의하세요.",
      },
    ],
  },

  {
    id: "three_card",
    koreanName: "3카드 스프레드",
    englishName: "Three Card Spread",
    description:
      "가장 인기 있는 스프레드 중 하나입니다. 과거-현재-미래로 상황의 흐름을 보거나, 상황-행동-결과로 조언을 얻을 수 있습니다. 충분히 자세하면서도 복잡하지 않아 초급자에게 이상적입니다.",
    cardCount: 3,
    difficulty: 2,
    positions: [
      {
        position: 1,
        label: "과거",
        meaning: "현재 상황으로 이르게 한 이전의 경험, 영향, 또는 근거",
        guidingQuestion:
          "어떤 과정을 거쳐 지금의 상황이 되었나? 과거의 어떤 선택이나 사건이 영향을 미쳤나?",
      },
      {
        position: 2,
        label: "현재",
        meaning: "지금 당신이 직면하고 있는 상황, 감정, 환경",
        guidingQuestion:
          "지금 내 상태는 어떤가? 나를 둘러싼 환경과 에너지는 무엇인가? 내가 느끼는 감정은?",
      },
      {
        position: 3,
        label: "미래",
        meaning: "현재의 흐름이 진행될 경우 도달할 결과나 상태",
        guidingQuestion:
          "이 흐름이 계속되면 어디로 향하게 될까? 어떤 결과가 나타날까?",
      },
    ],
    illustration: undefined,
    exampleReadings: [
      {
        question: "현재 직업 상황은 어떻게 될까?",
        cards: [
          {
            position: 1,
            cardId: "major_5",
            isReversed: false,
          },
          {
            position: 2,
            cardId: "major_6",
            isReversed: true,
          },
          {
            position: 3,
            cardId: "major_19",
            isReversed: false,
          },
        ],
        interpretation:
          "과거: 교황의 정위치는 당신이 기존의 시스템과 전통적인 경로를 따라왔음을 보여줍니다. 현재: 역위치 연인은 직업 선택에 있어 갈등이나 결정의 어려움을 나타냅니다. 당신의 가치관과 현실이 맞지 않을 수 있습니다. 미래: 태양은 이 갈등을 해결하면 밝은 미래가 기다리고 있음을 나타냅니다. 자신의 진정한 열정을 따르는 것이 성공의 열쇠입니다.",
      },
      {
        question: "이 관계의 발전 방향은?",
        cards: [
          {
            position: 1,
            cardId: "major_1",
            isReversed: false,
          },
          {
            position: 2,
            cardId: "major_6",
            isReversed: false,
          },
          {
            position: 3,
            cardId: "major_21",
            isReversed: false,
          },
        ],
        interpretation:
          "과거: 마술사의 정위치는 한 사람이 주도적이고 매력적으로 다가왔음을 보여줍니다. 현재: 연인 정위치는 두 사람이 깊은 감정적 연결을 느끼고 있음을 나타냅니다. 미래: 세계의 정위치는 이 관계가 완성되고 결혼으로 나아갈 가능성을 시사합니다. 아주 긍정적인 신호입니다.",
      },
    ],
  },

  {
    id: "celtic_cross",
    koreanName: "켈틱 크로스",
    englishName: "Celtic Cross",
    description:
      "타로의 가장 유명하고 복잡한 스프레드입니다. 10장의 카드를 사용하여 상황을 깊이 있게 분석합니다. 복잡하지만 가장 정보가 풍부하며, 도전적인 상황에서 포괄적인 이해를 원할 때 사용합니다.",
    cardCount: 10,
    difficulty: 4,
    positions: [
      {
        position: 1,
        label: "상황",
        meaning: "현재 상황의 본질과 당신의 질문의 핵심",
        guidingQuestion: "상황의 본질이 무엇인가? 내가 다루어야 할 핵심 문제는?",
      },
      {
        position: 2,
        label: "교차",
        meaning: "상황에 영향을 미치는 또 다른 요소나 도전",
        guidingQuestion:
          "무엇이 이 상황을 더 복잡하게 만드는가? 어떤 장애물이 있는가?",
      },
      {
        position: 3,
        label: "먼 과거",
        meaning: "상황의 뿌리가 되는 오래된 영향과 근거",
        guidingQuestion: "언제부터 이 상황이 시작되었나? 근본 원인은?",
      },
      {
        position: 4,
        label: "최근 과거",
        meaning: "최근에 일어난 영향과 변화",
        guidingQuestion: "최근에 어떤 일이 일어났나? 어떤 변화가 있었나?",
      },
      {
        position: 5,
        label: "가능한 결과",
        meaning: "현재 흐름이 진행될 경우의 자연스러운 결과",
        guidingQuestion: "아무것도 하지 않으면 어떻게 될까? 자연스러운 결과는?",
      },
      {
        position: 6,
        label: "가까운 미래",
        meaning: "곧 일어날 일이나 진전",
        guidingQuestion: "다음 단계는 무엇인가? 가까운 미래에 무엇이 일어나나?",
      },
      {
        position: 7,
        label: "자신의 감정/태도",
        meaning: "상황에 대한 당신의 진정한 감정과 신념",
        guidingQuestion:
          "내가 이 상황에 대해 정말로 어떻게 느끼나? 나의 두려움과 희망은?",
      },
      {
        position: 8,
        label: "타인의 영향",
        meaning: "다른 사람들이 상황에 미치는 영향",
        guidingQuestion:
          "다른 사람들은 이 상황을 어떻게 보나? 그들의 영향은 무엇인가?",
      },
      {
        position: 9,
        label: "희망과 우려",
        meaning: "당신의 희망과 동시에 우려하는 바",
        guidingQuestion: "내가 가장 원하는 것은? 무엇이 가장 두려운가?",
      },
      {
        position: 10,
        label: "최종 결과",
        meaning: "모든 영향이 모여진 최종적 결과와 조언",
        guidingQuestion:
          "결국 어떤 결과에 도달할까? 나에게 주어지는 최종 메시지는?",
      },
    ],
    illustration: undefined,
    exampleReadings: [
      {
        question: "이 새로운 직업을 받아들여야 하나?",
        cards: [
          {
            position: 1,
            cardId: "major_7",
            isReversed: false,
          },
          {
            position: 2,
            cardId: "major_9",
            isReversed: false,
          },
          {
            position: 3,
            cardId: "major_5",
            isReversed: false,
          },
          {
            position: 4,
            cardId: "major_12",
            isReversed: false,
          },
          {
            position: 5,
            cardId: "major_19",
            isReversed: false,
          },
          {
            position: 6,
            cardId: "major_8",
            isReversed: false,
          },
          {
            position: 7,
            cardId: "major_2",
            isReversed: false,
          },
          {
            position: 8,
            cardId: "major_1",
            isReversed: true,
          },
          {
            position: 9,
            cardId: "major_4",
            isReversed: false,
          },
          {
            position: 10,
            cardId: "major_21",
            isReversed: false,
          },
        ],
        interpretation:
          "이 리딩은 새로운 직업이 당신에게 의미 있는 도전과 성장의 기회임을 보여줍니다. 전차의 정위치는 명확한 방향성을 나타내고, 은둔자는 신중한 성찰이 필요함을 말합니다. 과거의 교황은 기존의 안정적인 경로를 나타내고, 행인은 일시적인 정지와 재평가의 시간을 보여줍니다. 미래의 태양은 밝은 전망을 나타내며, 힘은 내적 자신감이 필요함을 시사합니다. 당신의 직관은 강하고, 타인의 영향(역위치 마술사)은 제한적입니다. 최종 결과인 세계는 이 선택이 당신의 인생의 새로운 완성 단계로 나아가게 할 것임을 나타냅니다. 불안을 뒤로하고 나아가세요.",
      },
    ],
  },

  {
    id: "relationship",
    koreanName: "관계 스프레드",
    englishName: "Relationship Spread",
    description:
      "두 사람 간의 관계를 분석하는 스프레드입니다. 사랑, 우정, 직장 관계 등 모든 종류의 관계를 이해하는 데 도움이 됩니다. 각 사람의 감정과 관계의 미래를 함께 볼 수 있습니다.",
    cardCount: 5,
    difficulty: 2,
    positions: [
      {
        position: 1,
        label: "나",
        meaning: "이 관계 속에서 당신의 역할, 감정, 에너지",
        guidingQuestion: "나는 이 관계에서 어떤 에너지를 가져오고 있는가?",
      },
      {
        position: 2,
        label: "상대",
        meaning: "상대방이 관계에 가져오는 역할, 감정, 에너지",
        guidingQuestion: "상대방은 이 관계에서 어떤 에너지를 가져오고 있는가?",
      },
      {
        position: 3,
        label: "관계의 본질",
        meaning: "두 사람 사이의 연결, 공동 테마, 관계의 에너지",
        guidingQuestion: "우리가 함께 창조하고 있는 것은 무엇인가?",
      },
      {
        position: 4,
        label: "도전",
        meaning: "관계 속에서 직면한 도전과 학습 지점",
        guidingQuestion: "이 관계 속에서 함께 극복해야 할 것은?",
      },
      {
        position: 5,
        label: "결과/조언",
        meaning: "관계의 미래 방향과 제시되는 조언",
        guidingQuestion: "이 관계는 어디로 향하고 있는가? 어떤 조언이 주어지는가?",
      },
    ],
    illustration: undefined,
    exampleReadings: [
      {
        question: "현재 파트너와의 관계는 어떤가?",
        cards: [
          {
            position: 1,
            cardId: "major_6",
            isReversed: false,
          },
          {
            position: 2,
            cardId: "major_3",
            isReversed: false,
          },
          {
            position: 3,
            cardId: "major_14",
            isReversed: false,
          },
          {
            position: 4,
            cardId: "major_15",
            isReversed: true,
          },
          {
            position: 5,
            cardId: "major_21",
            isReversed: false,
          },
        ],
        interpretation:
          "당신은 진정한 사랑과 헌신을 가져오고 있습니다. 상대방은 풍요로운 감정과 영양을 제공합니다. 함께 절제와 조화의 에너지를 창조하고 있습니다. 역위치 악마는 어떤 속박이나 과거의 문제에서 해방되고 있음을 보여줍니다. 최종적으로 이 관계는 세계의 완성으로 향하고 있으며, 결혼이나 깊은 정신적 결합이 가능함을 시사합니다.",
      },
    ],
  },

  {
    id: "yes_no",
    koreanName: "예/아니오 스프레드",
    englishName: "Yes/No Spread",
    description:
      "명확한 예 또는 아니오 답변이 필요한 질문에 사용합니다. 2장의 카드를 통해 빠르고 직관적인 답변을 얻을 수 있습니다. 복잡한 상황에서도 핵심 방향을 제시합니다.",
    cardCount: 2,
    difficulty: 1,
    positions: [
      {
        position: 1,
        label: "상황",
        meaning: "질문의 현재 상황과 맥락",
        guidingQuestion: "현재 상황은 어떤가? 배경은 무엇인가?",
      },
      {
        position: 2,
        label: "답변",
        meaning: "질문에 대한 명확한 예 또는 아니오 신호",
        guidingQuestion: "우주는 무엇이라고 대답하는가? 나아가야 하는가?",
      },
    ],
    illustration: undefined,
    exampleReadings: [
      {
        question: "이 사업을 시작해야 하나?",
        cards: [
          {
            position: 1,
            cardId: "major_1",
            isReversed: false,
          },
          {
            position: 2,
            cardId: "major_19",
            isReversed: false,
          },
        ],
        interpretation:
          "마술사의 정위치는 당신이 필요한 능력과 도구를 이미 갖추고 있음을 보여줍니다. 태양의 정위치는 성공과 밝은 전망을 나타냅니다. 답변: 예(Yes). 이것은 당신을 위한 옳은 시간입니다.",
      },
      {
        question: "지금 그 사람에게 연락해야 하나?",
        cards: [
          {
            position: 1,
            cardId: "major_2",
            isReversed: true,
          },
          {
            position: 2,
            cardId: "major_12",
            isReversed: false,
          },
        ],
        interpretation:
          "역위치 대사제는 현재 상황이 명확하지 않음을 보여줍니다. 행인의 정위치는 잠시 기다리고 성찰할 필요가 있음을 나타냅니다. 답변: 아니오(No), 또는 지금은 아님(Not Now). 더 명확함이 올 때까지 기다리세요.",
      },
    ],
  },
];

/**
 * 스프레드 ID로 조회
 */
export const getSpreadById = (spreadId: string): TarotSpread | undefined => {
  return spreads.find((spread) => spread.id === spreadId);
};

/**
 * 난이도별 스프레드 필터링
 */
export const getSpreadsByDifficulty = (difficulty: number): TarotSpread[] => {
  return spreads.filter((spread) => spread.difficulty <= difficulty);
};

/**
 * 카드 수별 스프레드 필터링
 */
export const getSpreadsByCardCount = (cardCount: number): TarotSpread[] => {
  return spreads.filter((spread) => spread.cardCount === cardCount);
};
