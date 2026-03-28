/**
 * Tarot Card Data - Major Arcana
 * Complete definitions of 22 major arcana cards
 * NOTE: Images and Base64 dataUri to be filled in with actual image assets
 */

import type { TarotCard } from "../types/tarot";

// Major Arcana Cards (0-21)
export const majorArcanaCards: TarotCard[] = [
  {
    id: "major_0",
    number: 0,
    koreanName: "바보",
    englishName: "The Fool",
    arcana: "major",
    upright: {
      shortMeaning: "새로운 시작, 모험, 자유, 순수함",
      longMeaning:
        "변화의 시작을 나타냅니다. 미지의 길로 나아가는 용기와 낙관주의를 상징하며, 현재의 모든 것을 뒤로하고 새로운 여정을 시작할 때의 순수하고 열린 마음을 나타냅니다.",
      context: {
        love: "새로운 관계의 시작, 사랑의 모험, 순수한 감정",
        career: "새로운 직업 기회, 창직, 모험적인 프로젝트",
        finances: "위험한 투자, 새로운 사업 시작, 예측 불가능한 변화",
        spirituality: "영적 깨달음의 시작, 영혼의 여정 시작",
      },
    },
    reversed: {
      shortMeaning: "무모함, 위험, 미숙함, 신중함 부족",
      longMeaning:
        "준비 없이 앞으로 나아가려는 충동과 위험한 결정을 경고합니다. 자신감과 신중함 사이의 불균형을 나타내며, 무분별한 행동으로 인한 후회를 암시합니다.",
      context: {
        love: "준비되지 않은 관계 진전, 충동적인 감정 표현",
        career: "무계획한 퇴직이나 이직, 성급한 결정",
        finances: "무분별한 소비, 사기 위험, 무모한 투자",
        spirituality: "현실을 외면하려는 경향, 기초 부족",
      },
    },
    keywords: [
      "새로운 시작",
      "모험",
      "자유",
      "창의성",
      "순수함",
      "여정",
      "가능성",
    ],
    astrologySign: "천왕성",
    numerology: 0,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_00_fool.webp",
      description: "절벽 앞에 서서 하늘을 향해 손을 펼친 젊은 인물의 모습",
    },
    historicalBackground:
      "가장 오래된 타로 카드 중 하나로, 우리 영혼의 여정을 시작하는 첫 번째 아르카나를 나타냅니다.",
  },

  {
    id: "major_1",
    number: 1,
    koreanName: "마술사",
    englishName: "The Magician",
    arcana: "major",
    upright: {
      shortMeaning: "의지, 행동, 창의성, 능력 발현",
      longMeaning:
        "자신의 잠재력을 활용하여 원하는 것을 창조할 수 있는 능력을 나타냅니다. 손에 쥔 도구들(생각, 말, 행동, 물질)을 적절하게 활용하면 모든 것이 가능함을 상징합니다.",
      context: {
        love: "관계에 주도적 역할, 매력과 설득력, 새로운 만남",
        career: "직업적 성공, 새로운 프로젝트 시작, 리더십 발휘",
        finances: "사업 성공, 재정 관리 능력, 수익 창출",
        spirituality: "내면의 힘 깨우기, 의식적 창조",
      },
    },
    reversed: {
      shortMeaning: "자기기만, 조작, 능력 부족, 자신감 부족",
      longMeaning:
        "자신의 능력을 과대평가하거나 부정직한 수단을 사용하려는 경향을 나타냅니다. 또한 자신의 능력을 믿지 못하고 기회를 놓치는 상황을 암시합니다.",
      context: {
        love: "속임수, 표면적 매력만 추구, 진정성 부족",
        career: "부정직한 방법, 능력 부족으로 인한 실패",
        finances: "사기, 손실, 재정 관리 부실",
        spirituality: "영적 지혜 부족, 자기기만",
      },
    },
    keywords: [
      "의지",
      "행동",
      "창의성",
      "능력",
      "기술",
      "주도성",
      "자신감",
      "표현",
    ],
    astrologySign: "수성",
    numerology: 1,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_01_magician.webp",
      description:
        "한 손은 하늘을 향하고 한 손은 땅을 가리키며, 앞에 여러 도구가 놓여있는 마술사의 모습",
    },
  },

  {
    id: "major_2",
    number: 2,
    koreanName: "대사제",
    englishName: "The High Priestess",
    arcana: "major",
    upright: {
      shortMeaning: "직관, 신비, 비밀, 내면의 지식",
      longMeaning:
        "의식 너머의 영역, 직관과 내면의 목소리를 신뢰할 때의 지혜를 나타냅니다. 아직 드러나지 않은 진실을 알고 있으며, 깊은 차원의 이해와 영적 통찰력을 상징합니다.",
      context: {
        love: "숨겨진 감정, 신비로운 매력, 깊은 연결",
        career: "숨겨진 기회, 신비한 정보, 연구와 학습",
        finances: "숨겨진 자산, 신중한 기다림, 직관적 결정",
        spirituality: "깊은 영적 깨달음, 무의식과의 연결",
      },
    },
    reversed: {
      shortMeaning: "무지, 고집, 직관 무시, 비밀 폭로",
      longMeaning:
        "직관을 무시하고 겉으로 보이는 것만을 믿으려는 경향을 나타냅니다. 중요한 정보가 숨겨져 있거나, 자신의 내면의 목소리를 들으려 하지 않는 상황을 암시합니다.",
      context: {
        love: "감정 표현 부족, 신뢰 부족, 숨겨진 갈등",
        career: "중요한 정보 놓침, 신비한 기회 상실",
        finances: "부정확한 정보로 인한 손실, 기다림 부족",
        spirituality: "영적 연결 단절, 직관 무시",
      },
    },
    keywords: [
      "직관",
      "신비",
      "비밀",
      "내면",
      "지혜",
      "영적",
      "감각",
      "이해",
    ],
    astrologySign: "달",
    numerology: 2,
    yesNoGuidance: "maybe",
    image: {
      url: "/images/major_02_high_priestess.webp",
      description: "사이에 휘장을 두고 앉아있는 대사제의 신비로운 모습",
    },
  },

  {
    id: "major_3",
    number: 3,
    koreanName: "여황제",
    englishName: "The Empress",
    arcana: "major",
    upright: {
      shortMeaning: "풍요, 모성, 창조, 아름다움, 쾌락",
      longMeaning:
        "창조와 풍요의 에너지를 나타냅니다. 모든 것이 자라나고 번영하는 상태를 상징하며, 자신을 돌보는 것, 감각적인 즐거움, 그리고 타인을 양육하는 능력을 나타냅니다.",
      context: {
        love: "사랑, 매력, 깊은 감정 표현, 여성다움",
        career: "창조적 프로젝트, 성공, 풍요로운 결과",
        finances: "풍요, 번영, 물질적 풍족함, 증가",
        spirituality: "풍요로운 영적 에너지, 자기 돌봄",
      },
    },
    reversed: {
      shortMeaning: "불임, 스스로를 돌보지 못함, 낭비, 부정",
      longMeaning:
        "자신을 돌보지 못하거나 과도한 의존을 나타냅니다. 창조적 에너지의 부족이나 풍요의 부재, 또는 물질적인 것에 집착하는 상황을 암시합니다.",
      context: {
        love: "감정 표현 어려움, 차가움, 연결 부족",
        career: "창조성 부족, 프로젝트 실패, 지원 부족",
        finances: "손실, 낭비, 부족, 빈곤",
        spirituality: "자기 돌봄 부족, 영적 공허함",
      },
    },
    keywords: [
      "풍요",
      "모성",
      "창조",
      "아름다움",
      "감각",
      "여성성",
      "영양",
      "풍경",
    ],
    astrologySign: "금성",
    numerology: 3,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_03_empress.webp",
      description: "왕관을 쓴 여황제가 자연의 풍요 속에 앉아있는 모습",
    },
  },

  {
    id: "major_4",
    number: 4,
    koreanName: "황제",
    englishName: "The Emperor",
    arcana: "major",
    upright: {
      shortMeaning: "권력, 리더십, 구조, 통제, 아버지상",
      longMeaning:
        "통제, 구조, 그리고 권위의 에너지를 나타냅니다. 확실한 방향성과 리더십으로 상황을 주도하는 능력, 책임감 있는 결정과 실행력을 상징합니다.",
      context: {
        love: "남성다움, 보호, 리더십, 확실한 의도",
        career: "리더십, 권위, 성공, 구조화된 성장",
        finances: "재정 통제, 투자 성공, 권력과 부",
        spirituality: "영적 권위, 명확한 원칙",
      },
    },
    reversed: {
      shortMeaning: "약함, 권위 상실, 무질서, 강압",
      longMeaning:
        "통제력을 잃었거나 강압적인 권력 남용을 나타냅니다. 또한 리더십 부족이나 구조 없음으로 인한 혼란을 암시합니다.",
      context: {
        love: "지배적, 통제적, 감정 표현 부족",
        career: "리더십 부족, 권위 상실, 혼란",
        finances: "재정 통제 실패, 낭비, 손실",
        spirituality: "영적 기초 약함, 방향 상실",
      },
    },
    keywords: ["권력", "리더십", "구조", "통제", "아버지", "명령", "규칙"],
    astrologySign: "양자리",
    numerology: 4,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_04_emperor.webp",
      description: "왕좌에 앉아 권홀을 들고 있는 황제의 권력 있는 모습",
    },
  },

  {
    id: "major_5",
    number: 5,
    koreanName: "교황",
    englishName: "The Hierophant",
    arcana: "major",
    upright: {
      shortMeaning: "영적 지도, 전통, 신앙, 사제, 학습",
      longMeaning:
        "전통적인 영적 지혜와 영적 지도를 나타냅니다. 종교적 신앙, 교육, 의식, 그리고 기존 시스템과의 일치를 통한 성장을 상징합니다.",
      context: {
        love: "헌신, 약속, 전통적 관계, 영적 연결",
        career: "멘토링, 교육, 전통 추종, 영적 직업",
        finances: "보수적 투자, 안정성, 전통적 부의 증가",
        spirituality: "영적 지도, 신앙 심화, 의식 수행",
      },
    },
    reversed: {
      shortMeaning: "반항, 비신앙, 독선, 거부",
      longMeaning:
        "기존 시스템이나 전통에 대한 거부와 반항을 나타냅니다. 종교적 또는 영적 신념의 부재, 또는 독선적인 태도를 암시합니다.",
      context: {
        love: "비혼, 전통 거부, 약속 깨짐",
        career: "권위 거부, 시스템 탈출, 규칙 위반",
        finances: "보수적 방식 거부, 위험한 모험",
        spirituality: "영적 신념 부족, 독선",
      },
    },
    keywords: [
      "영적 지도",
      "전통",
      "신앙",
      "종교",
      "교육",
      "의식",
      "규칙",
      "도덕",
    ],
    astrologySign: "황소자리",
    numerology: 5,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_05_hierophant.webp",
      description: "법의와 신앙의 상징을 들고 앉아있는 교황의 모습",
    },
  },

  {
    id: "major_6",
    number: 6,
    koreanName: "연인",
    englishName: "The Lovers",
    arcana: "major",
    upright: {
      shortMeaning: "사랑, 선택, 관계, 가치관, 조화",
      longMeaning:
        "사랑과 깊은 연결을 나타내지만, 동시에 중요한 선택과 결정을 상징합니다. 두 존재가 만나 조화를 이루는 상태, 혹은 자신의 가치관에 따른 선택의 순간을 나타냅니다.",
      context: {
        love: "진정한 사랑, 깊은 관계, 헌신, 결합",
        career: "조화로운 파트너십, 중요한 직업 선택",
        finances: "공동 투자, 파트너십으로 인한 이득",
        spirituality: "영적 연결, 영혼의 만남",
      },
    },
    reversed: {
      shortMeaning: "갈등, 분리, 부정직, 선택 회피",
      longMeaning:
        "관계의 단절이나 선택의 어려움을 나타냅니다. 진정성 없는 만남, 가치관의 충돌, 또는 결정을 피하려는 태도를 암시합니다.",
      context: {
        love: "이별, 부정직, 감정 충돌, 선택 어려움",
        career: "파트너십 붕괴, 직업 선택 어려움",
        finances: "공동 계약 실패, 신뢰 깨짐",
        spirituality: "영적 단절, 진정성 부재",
      },
    },
    keywords: [
      "사랑",
      "선택",
      "관계",
      "가치관",
      "조화",
      "연결",
      "영혼",
      "진정성",
    ],
    astrologySign: "쌍둥이자리",
    numerology: 6,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_06_lovers.webp",
      description: "천사가 지켜보는 가운데 손을 맞잡은 연인의 모습",
    },
  },

  {
    id: "major_7",
    number: 7,
    koreanName: "전차",
    englishName: "The Chariot",
    arcana: "major",
    upright: {
      shortMeaning: "의지, 결정, 통제, 전진, 승리",
      longMeaning:
        "강한 의지와 결정으로 전진하는 힘을 나타냅니다. 모순되는 것들을 통제하여 원하는 방향으로 나아가는 능력과 승리를 향한 여정을 상징합니다.",
      context: {
        love: "적극적 추구, 열정, 진전, 승리",
        career: "성공 향한 전진, 장애물 극복, 리더십",
        finances: "열정적 추구, 목표 달성, 증가",
        spirituality: "영적 진보, 통제된 힘",
      },
    },
    reversed: {
      shortMeaning: "통제 상실, 지연, 불안정, 충돌",
      longMeaning:
        "자제력 상실이나 반대 방향으로의 움직임을 나타냅니다. 모순된 욕구 간의 갈등으로 인한 정체, 또는 진행 중인 일의 지연을 암시합니다.",
      context: {
        love: "갈등, 우유부단함, 관계 진전 지연",
        career: "진행 정체, 장애물, 리더십 실패",
        finances: "투자 지연, 기회 상실, 불안정",
        spirituality: "영적 정체, 통제 상실",
      },
    },
    keywords: [
      "의지",
      "결정",
      "통제",
      "전진",
      "승리",
      "열정",
      "방향",
      "극복",
    ],
    astrologySign: "암자리",
    numerology: 7,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_07_chariot.webp",
      description: "전차를 몰고 전진하는 기사의 강인한 모습",
    },
  },

  {
    id: "major_8",
    number: 8,
    koreanName: "힘",
    englishName: "Strength",
    arcana: "major",
    upright: {
      shortMeaning: "내적 힘, 용기, 인내, 온화한 힘, 통제",
      longMeaning:
        "진정한 힘은 외적 폭력이 아닌 내적 가치와 인내로부터 온다는 것을 나타냅니다. 자신의 약점을 극복하고 용감하게 나아가는 영적 힘을 상징합니다.",
      context: {
        love: "영적 연결, 신뢰, 깊은 애정, 헌신",
        career: "내적 강점으로 성공, 어려움 극복, 인내",
        finances: "인내로 인한 성과, 꾸준한 증가",
        spirituality: "영적 힘, 자기 통제, 명상",
      },
    },
    reversed: {
      shortMeaning: "약함, 자기의심, 무기력, 약함 노출",
      longMeaning:
        "자신의 능력을 믿지 못하고 약해진 상태를 나타냅니다. 도전 앞에서의 포기, 자기 의심, 또는 내적 힘의 부재를 암시합니다.",
      context: {
        love: "불안감, 질투, 신뢰 부족",
        career: "자기의심, 도전 회피, 약점 노출",
        finances: "재정적 불안감, 약한 입장",
        spirituality: "영적 약함, 명상 부족",
      },
    },
    keywords: [
      "내적 힘",
      "용기",
      "인내",
      "자제력",
      "영적",
      "신뢰",
      "온화함",
    ],
    astrologySign: "사자자리",
    numerology: 8,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_08_strength.webp",
      description: "부드럽게 사자의 입을 다루는 여인의 영적 힘 모습",
    },
  },

  {
    id: "major_9",
    number: 9,
    koreanName: "은둔자",
    englishName: "The Hermit",
    arcana: "major",
    upright: {
      shortMeaning: "내성, 탐구, 영적 추구, 지혜, 고독",
      longMeaning:
        "자기 자신과의 만남을 통한 깊은 지혜를 추구하는 상태를 나타냅니다. 외부의 소음에서 벗어나 내면의 목소리를 듣고 영적 진리를 찾는 여정을 상징합니다.",
      context: {
        love: "영적 성찰, 홀로의 시간 필요, 깊은 이해",
        career: "연구, 명상적 작업, 내성적 성찰",
        finances: "절약, 신중한 계획, 자기 충족",
        spirituality: "영적 깨달음, 명상, 진리 추구",
      },
    },
    reversed: {
      shortMeaning: "고립, 회피, 외로움, 포기",
      longMeaning:
        "필요한 성찰을 외로움과 고립으로 왜곡하는 상태를 나타냅니다. 세상과의 단절, 도움 거절, 또는 깊은 외로움을 암시합니다.",
      context: {
        love: "고립, 거리감, 관계 회피, 외로움",
        career: "협력 거부, 포기, 고립된 작업",
        finances: "인색함, 나눔 거절, 고립",
        spirituality: "영적 회피, 진리 외면",
      },
    },
    keywords: ["내성", "탐구", "지혜", "영적", "고독", "성찰", "빛"],
    astrologySign: "처녀자리",
    numerology: 9,
    yesNoGuidance: "maybe",
    image: {
      url: "/images/major_09_hermit.webp",
      description: "산 위에 홀로 서서 등불을 들고 있는 은둔자의 모습",
    },
  },

  {
    id: "major_10",
    number: 10,
    koreanName: "운명의 수레바퀴",
    englishName: "Wheel of Fortune",
    arcana: "major",
    upright: {
      shortMeaning: "운명, 순환, 변화, 행운, 업보",
      longMeaning:
        "인생의 순환과 자연의 사이클을 나타냅니다. 우리가 통제할 수 없는 큰 힘의 작용과 운명의 전환점을 상징하며, 좋은 시기와 나쁜 시기가 반복됨을 보여줍니다.",
      context: {
        love: "관계의 변화, 운명적 만남, 순환",
        career: "행운의 변화, 기회 도래, 운명적 진전",
        finances: "행운의 증가, 예상 외의 이득, 변화",
        spirituality: "업보의 이해, 순환의 수용",
      },
    },
    reversed: {
      shortMeaning: "나쁜 운, 정체, 저항, 악순환",
      longMeaning:
        "흐름과 반대로 가는 상황이나 인생의 나쁜 흐름을 나타냅니다. 변화에 대한 저항이나 악순환에서 벗어나지 못하는 상황을 암시합니다.",
      context: {
        love: "헤어짐, 나쁜 운, 관계 악화",
        career: "기회 상실, 나쁜 타이밍, 퇴보",
        finances: "손실, 나쁜 운, 악순환",
        spirituality: "업보의 작용, 악순환",
      },
    },
    keywords: ["운명", "순환", "변화", "행운", "업보", "타이밍", "전환"],
    astrologySign: "목성",
    numerology: 10,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_10_wheel_of_fortune.webp",
      description: "돌아가는 거대한 수레바퀴와 그를 둘러싼 신비한 존재들",
    },
  },

  {
    id: "major_11",
    number: 11,
    koreanName: "정의",
    englishName: "Justice",
    arcana: "major",
    upright: {
      shortMeaning: "정의, 균형, 진실, 책임, 인과응보",
      longMeaning:
        "진실과 공정함, 그리고 행동의 결과를 나타냅니다. 자신의 행동에 대한 책임을 지고 균형 잡힌 판단이 필요함을 상징합니다.",
      context: {
        love: "공정한 관계, 상호 이해, 진실",
        career: "정당한 성공, 책임감, 공정한 대우",
        finances: "정당한 이득, 공정한 거래, 책임",
        spirituality: "영적 공정함, 진실의 추구",
      },
    },
    reversed: {
      shortMeaning: "부정, 불공정, 거짓, 책임 회피",
      longMeaning:
        "진실을 외면하고 불공정한 행동을 나타냅니다. 자신의 책임을 회피하거나 법적/윤리적 문제가 발생할 수 있음을 암시합니다.",
      context: {
        love: "거짓, 부정직, 신뢰 깨짐",
        career: "부정당함, 불공정, 책임 회피",
        finances: "거래 실패, 법적 문제, 부정",
        spirituality: "거짓, 진실 외면",
      },
    },
    keywords: ["정의", "균형", "진실", "책임", "인과", "공정", "법"],
    astrologySign: "천칭자리",
    numerology: 11,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_11_justice.webp",
      description: "천칭을 들고 칼로 진실을 가르는 정의의 여신 모습",
    },
  },

  {
    id: "major_12",
    number: 12,
    koreanName: "행인",
    englishName: "The Hanged Man",
    arcana: "major",
    upright: {
      shortMeaning: "멈춤, 성찰, 새로운 관점, 희생, 통찰",
      longMeaning:
        "진행을 멈추고 상황을 다른 각도에서 봐야 함을 나타냅니다. 일시적인 휴식이나 희생을 통해 더 깊은 이해와 영적 성장에 도달함을 상징합니다.",
      context: {
        love: "관계 재검토, 잠시의 분리, 새로운 이해",
        career: "일시 정지, 성찰, 새로운 접근",
        finances: "현금 흐름 정지, 대기, 인내",
        spirituality: "영적 통찰, 높은 관점",
      },
    },
    reversed: {
      shortMeaning: "진전 거부, 무의미한 희생, 활동 재개",
      longMeaning:
        "정체에서 벗어나 다시 움직이기 시작함을 나타냅니다. 하지만 준비가 부족할 수 있으며, 무의미한 희생을 할 수도 있음을 암시합니다.",
      context: {
        love: "관계 재개, 무의미한 희생 거절",
        career: "일 재개, 준비 부족, 급한 진전",
        finances: "활동 재개, 투자 재개, 움직임",
        spirituality: "영적 통찰 거부, 서두름",
      },
    },
    keywords: ["멈춤", "성찰", "관점", "희생", "통찰", "휴식", "인내"],
    astrologySign: "해왕성",
    numerology: 12,
    yesNoGuidance: "maybe",
    image: {
      url: "/images/major_12_hanged_man.webp",
      description: "나뭇가지에 거꾸로 매달려 있으면서도 평온한 표정의 행인",
    },
  },

  {
    id: "major_13",
    number: 13,
    koreanName: "죽음",
    englishName: "Death",
    arcana: "major",
    upright: {
      shortMeaning: "변화, 종료, 새로운 시작, 전환, 정화",
      longMeaning:
        "생물학적 죽음이 아닌 이전 자아의 죽음과 새로운 탄생을 나타냅니다. 무언가의 끝과 동시에 새로운 시작을 의미하며, 필연적인 변화와 전환을 상징합니다.",
      context: {
        love: "관계 종료, 새로운 사랑의 시작, 변화",
        career: "직업 전환, 새로운 역할, 근본적 변화",
        finances: "재정 구조 변화, 새로운 시작",
        spirituality: "영적 죽음과 재생, 정화",
      },
    },
    reversed: {
      shortMeaning: "저항, 정체, 변화 거부, 지연",
      longMeaning:
        "필연적인 변화에 대한 저항과 집착을 나타냅니다. 과거에 매달리거나 변화를 거부함으로 인한 정체를 암시합니다.",
      context: {
        love: "관계 종료 거부, 과거에의 집착",
        career: "변화 거부, 정체, 성장 정지",
        finances: "재정 정체, 변화 거부",
        spirituality: "변화 거부, 영적 정체",
      },
    },
    keywords: ["변화", "종료", "시작", "전환", "정화", "재생", "필연"],
    astrologySign: "전갈자리",
    numerology: 13,
    yesNoGuidance: "no",
    image: {
      url: "/images/major_13_death.webp",
      description: "해골을 타고 나타나는 죽음의 기사와 사람들의 변화 모습",
    },
  },

  {
    id: "major_14",
    number: 14,
    koreanName: "절제",
    englishName: "Temperance",
    arcana: "major",
    upright: {
      shortMeaning: "균형, 조절, 통합, 중도, 건강",
      longMeaning:
        "모든 것의 균형과 조화를 나타냅니다. 극단을 피하고 중도를 지키며, 서로 다른 요소를 통합하여 조화로운 상태에 도달함을 상징합니다.",
      context: {
        love: "조화로운 관계, 균형, 상호 이해, 안정",
        career: "업무 균형, 통합, 조화로운 협력",
        finances: "재정 균형, 신중한 관리, 안정",
        spirituality: "영적 균형, 명상, 중도",
      },
    },
    reversed: {
      shortMeaning: "불균형, 극단, 과잉, 결핍",
      longMeaning:
        "극단적인 행동이나 불균형한 상태를 나타냅니다. 과잉이거나 부족하거나, 조화 없는 갈등 상태를 암시합니다.",
      context: {
        love: "관계 불균형, 극단, 갈등",
        career: "업무 불균형, 극단적 결정",
        finances: "과잉 또는 결핍, 낭비",
        spirituality: "영적 불균형, 극단",
      },
    },
    keywords: ["균형", "조절", "통합", "중도", "건강", "조화", "온화"],
    astrologySign: "궁수자리",
    numerology: 14,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_14_temperance.webp",
      description: "두 잔 사이에서 물을 붓는 천사의 조화로운 모습",
    },
  },

  {
    id: "major_15",
    number: 15,
    koreanName: "악마",
    englishName: "The Devil",
    arcana: "major",
    upright: {
      shortMeaning: "속박, 욕망, 물질주의, 중독, 어둠",
      longMeaning:
        "우리 내면의 어두운 욕망과 제약을 나타냅니다. 물질적 욕망, 중독, 또는 자신이 만든 속박에 갇혀있는 상태를 상징합니다.",
      context: {
        love: "중독적 관계, 불건강한 욕망, 통제",
        career: "일중독, 부패, 비윤리적 행동",
        finances: "욕심, 중독적 소비, 빚",
        spirituality: "영적 속박, 욕망에 지배당함",
      },
    },
    reversed: {
      shortMeaning: "자유, 해방, 속박 벗기, 성찰",
      longMeaning:
        "속박에서 벗어나 자유를 얻는 상태를 나타냅니다. 중독이나 욕망에서 깨어나 자신의 진정한 힘을 회복함을 암시합니다.",
      context: {
        love: "중독에서 해방, 자유, 새로운 관계",
        career: "직업 해방, 새로운 시작, 윤리 회복",
        finances: "빚에서 해방, 소비 조절",
        spirituality: "영적 해방, 진정한 자유",
      },
    },
    keywords: [
      "속박",
      "욕망",
      "물질주의",
      "중독",
      "어둠",
      "공포",
      "제약",
    ],
    astrologySign: "염소자리",
    numerology: 15,
    yesNoGuidance: "no",
    image: {
      url: "/images/major_15_devil.webp",
      description: "악마가 두 사람을 사슬로 묶고 있는 모습",
    },
  },

  {
    id: "major_16",
    number: 16,
    koreanName: "탑",
    englishName: "The Tower",
    arcana: "major",
    upright: {
      shortMeaning: "붕괴, 충격, 갑작스런 변화, 진실 폭로, 파괴",
      longMeaning:
        "기초 없이 세워진 것들의 붕괴를 나타냅니다. 거짓된 안정성의 붕괴, 충격적인 변화, 그리고 숨겨진 진실의 폭로를 상징합니다.",
      context: {
        love: "관계 붕괴, 배신 폭로, 급작스런 이별",
        career: "직업 상실, 사업 실패, 위기",
        finances: "금융 붕괴, 큰 손실, 위기",
        spirituality: "영적 위기, 신념 붕괴",
      },
    },
    reversed: {
      shortMeaning: "회피, 지연, 서서히의 변화, 준비 부족",
      longMeaning:
        "큰 변화가 지연되거나 점진적으로 진행됨을 나타냅니다. 또한 피할 수 없는 변화에 대한 준비 부족을 암시합니다.",
      context: {
        love: "관계 문제 지연, 결국의 이별",
        career: "위기 지연, 점진적 악화",
        finances: "손실 지연, 경제 악화",
        spirituality: "영적 위기 지연",
      },
    },
    keywords: ["붕괴", "충격", "변화", "진실", "파괴", "위기", "번개"],
    astrologySign: "화성",
    numerology: 16,
    yesNoGuidance: "no",
    image: {
      url: "/images/major_16_tower.webp",
      description: "번개에 맞아 무너지는 탑과 떨어지는 사람들",
    },
  },

  {
    id: "major_17",
    number: 17,
    koreanName: "별",
    englishName: "The Star",
    arcana: "major",
    upright: {
      shortMeaning: "희망, 영감, 꿈, 인도, 명확한 길",
      longMeaning:
        "흑암 속에서 지나가는 별과 같은 희망과 영감을 나타냅니다. 명확한 목표와 영적 인도, 그리고 더 나은 미래에 대한 신뢰를 상징합니다.",
      context: {
        love: "희망의 사랑, 신뢰, 영감 있는 관계",
        career: "영감적 직업, 꿈 추구, 명확한 목표",
        finances: "희망적 전망, 꿈의 실현",
        spirituality: "영적 인도, 영감, 깨달음",
      },
    },
    reversed: {
      shortMeaning: "절망, 방향 상실, 희망 부족, 어둠",
      longMeaning:
        "길을 잃고 희망을 잃은 상태를 나타냅니다. 영감 없는 삶, 방향 상실, 그리고 깊은 절망을 암시합니다.",
      context: {
        love: "절망적 관계, 신뢰 부족, 희망 없음",
        career: "방향 상실, 영감 부족, 동기 상실",
        finances: "희망 없는 재정 상황",
        spirituality: "영적 길 상실, 절망",
      },
    },
    keywords: ["희망", "영감", "꿈", "인도", "신뢰", "명확", "별빛"],
    astrologySign: "물병자리",
    numerology: 17,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_17_star.webp",
      description: "큰 별과 작은 별들을 보며 물을 붓는 나체 여인의 희망 모습",
    },
  },

  {
    id: "major_18",
    number: 18,
    koreanName: "달",
    englishName: "The Moon",
    arcana: "major",
    upright: {
      shortMeaning: "무의식, 착각, 직관, 꿈, 신비, 불안",
      longMeaning:
        "의식 아래의 영역과 직관의 세계를 나타냅니다. 꿈과 현실의 경계, 숨겨진 진실, 그리고 내면의 두려움을 상징합니다.",
      context: {
        love: "불안, 착각, 신비로운 감정, 직관",
        career: "불안정성, 착각, 창의적 직업",
        finances: "불안정, 착각, 감정적 결정",
        spirituality: "무의식과의 대화, 꿈 해석",
      },
    },
    reversed: {
      shortMeaning: "명확, 착각 해제, 불안 해소, 이해",
      longMeaning:
        "혼란이 걷혀지고 진실이 드러나는 상태를 나타냅니다. 불안감 극복과 명확한 이해에 도달함을 암시합니다.",
      context: {
        love: "착각 해제, 명확한 감정, 이해",
        career: "명확화, 불안 해소, 진전",
        finances: "명확한 상황 파악, 불안 해제",
        spirituality: "진실 깨달음, 명확화",
      },
    },
    keywords: [
      "무의식",
      "착각",
      "직관",
      "꿈",
      "신비",
      "불안",
      "숨김",
      "달빛",
    ],
    astrologySign: "물고기자리",
    numerology: 18,
    yesNoGuidance: "maybe",
    image: {
      url: "/images/major_18_moon.webp",
      description: "크레이터 있는 달 아래 두 개의 탑 사이로 좁은 길을 가는 사람의 불안한 모습",
    },
  },

  {
    id: "major_19",
    number: 19,
    koreanName: "태양",
    englishName: "The Sun",
    arcana: "major",
    upright: {
      shortMeaning: "성공, 행복, 명확성, 활력, 긍정, 번영",
      longMeaning:
        "모든 어둠을 밝히는 태양의 에너지를 나타냅니다. 성공, 행복, 명확한 전망, 그리고 생명력이 넘치는 상태를 상징합니다.",
      context: {
        love: "행복한 사랑, 밝은 관계, 결혼, 성공",
        career: "직업적 성공, 명확한 목표, 인정",
        finances: "번영, 풍요, 큰 성공",
        spirituality: "영적 깨달음, 완성, 기쁨",
      },
    },
    reversed: {
      shortMeaning: "실패, 어둠, 명확성 부족, 지연, 병약",
      longMeaning:
        "태양의 밝음이 가려진 상태를 나타냅니다. 예상된 성공의 지연, 어두운 시각, 또는 신체적 정신적 약함을 암시합니다.",
      context: {
        love: "관계의 실패, 이별, 어둠의 시간",
        career: "직업적 실패, 명확성 부족, 지연",
        finances: "손실, 지연, 어두운 전망",
        spirituality: "영적 암흑, 불완성",
      },
    },
    keywords: [
      "성공",
      "행복",
      "명확",
      "활력",
      "긍정",
      "번영",
      "빛",
      "따뜻함",
    ],
    astrologySign: "사자자리",
    numerology: 19,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_19_sun.webp",
      description: "밝은 태양 아래 말을 타고 행복해하는 아이의 번영 모습",
    },
  },

  {
    id: "major_20",
    number: 20,
    koreanName: "심판",
    englishName: "Judgement",
    arcana: "major",
    upright: {
      shortMeaning: "깨어남, 소명, 재탄생, 평가, 결정, 개선",
      longMeaning:
        "내면의 소명에 응답하고 삶의 새로운 단계로 진입함을 나타냅니다. 지나간 삶의 평가와 함께 더 높은 의식으로의 도약을 상징합니다.",
      context: {
        love: "관계의 재평가, 깊은 연결, 새로운 단계",
        career: "소명 발견, 직업 전환, 새로운 역할",
        finances: "재정 재평가, 새로운 기회, 개선",
        spirituality: "영적 깨어남, 소명 응답, 재탄생",
      },
    },
    reversed: {
      shortMeaning: "지연, 거부, 회피, 미해결, 정체",
      longMeaning:
        "깨어남의 순간을 거부하거나 피하는 상태를 나타냅니다. 중요한 결정을 미루거나 변화에 저항함을 암시합니다.",
      context: {
        love: "결정 회피, 관계 정체, 미해결",
        career: "소명 거부, 결정 지연, 정체",
        finances: "평가 미루기, 기회 상실",
        spirituality: "영적 거부, 깨어남 지연",
      },
    },
    keywords: [
      "깨어남",
      "소명",
      "재탄생",
      "평가",
      "결정",
      "개선",
      "부활",
    ],
    astrologySign: "명왕성",
    numerology: 20,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_20_judgement.webp",
      description: "천사의 나팔 소리를 듣고 일어나는 죽은 자들의 부활 모습",
    },
  },

  {
    id: "major_21",
    number: 21,
    koreanName: "세계",
    englishName: "The World",
    arcana: "major",
    upright: {
      shortMeaning: "완성, 완전성, 일치, 여행, 통합, 성취",
      longMeaning:
        "모든 것의 완성과 통일을 나타냅니다. 긴 여정의 끝과 새로운 순환의 시작을 의미하며, 자아의 완성과 우주와의 일치를 상징합니다.",
      context: {
        love: "관계의 완성, 결혼, 영원한 연결",
        career: "프로젝트 완성, 성취, 인정",
        finances: "재정 목표 달성, 완성, 번영",
        spirituality: "영적 완성, 깨달음, 통일",
      },
    },
    reversed: {
      shortMeaning: "미완성, 정체, 부분적, 미루기, 방해",
      longMeaning:
        "일이 아직 완성되지 않은 상태를 나타냅니다. 마지막 단계의 어려움, 완성 지연, 또는 닫히지 않은 문제를 암시합니다.",
      context: {
        love: "관계 미완성, 결혼 지연, 미해결",
        career: "프로젝트 미완성, 완성 지연",
        finances: "목표 미달성, 지연, 부분적 성공",
        spirituality: "영적 미완성, 진행 중",
      },
    },
    keywords: ["완성", "완전성", "일치", "여행", "통합", "성취", "순환"],
    astrologySign: "토성",
    numerology: 0,
    yesNoGuidance: "yes",
    image: {
      url: "/images/major_21_world.webp",
      description: "우주의 중심에서 춤을 추는 여인과 사방에서 지켜보는 네 생물의 완성 모습",
    },
  },
];

// Note: 마이너 아르카나(56장) 데이터는 별도 파일에서 관리
// src/data/minorArcana.ts 참고

/**
 * 카드 데이터 통합 조회 함수
 *
 * @param arcana - "major" | "minor" | "all" (기본값: "all")
 * @returns 해당하는 모든 카드 데이터
 */
export const getAllCards = (arcana: "major" | "minor" | "all" = "all") => {
  if (arcana === "major") {
    return majorArcanaCards;
  }
  // 나머지는 minorArcanaCards와 병합 필요
  return majorArcanaCards;
};

/**
 * 카드 ID로 특정 카드 조회
 */
export const getCardById = (cardId: string): TarotCard | undefined => {
  return majorArcanaCards.find((card) => card.id === cardId);
};

/**
 * 무작위 카드 선택
 * @returns 랜덤 카드와 정/역 여부
 */
export const drawRandomCard = (
  cards: TarotCard[] = majorArcanaCards
): { card: TarotCard; isReversed: boolean } => {
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  const isReversed = Math.random() > 0.5;
  return { card: randomCard, isReversed };
};
