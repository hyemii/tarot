// 타로 카드 앞면 렌더링 컴포넌트 — 이미지와 카드 이름을 표시

import type { TarotCard } from '@/types/tarot';

const SIZE_MAP = {
  sm: { width: 60, height: 100, fontSize: 10 },
  md: { width: 100, height: 167, fontSize: 12 },
  lg: { width: 160, height: 267, fontSize: 14 },
};

interface TarotCardFaceProps {
  card: TarotCard;
  // 역방향 여부 — true이면 카드를 180도 회전하여 표시
  isReversed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  // 카드 아래에 이름 표시 여부
  showName?: boolean;
  onClick?: () => void;
}

export function TarotCardFace({
  card,
  isReversed = false,
  size = 'md',
  showName = false,
  onClick,
}: TarotCardFaceProps) {
  const { width, height, fontSize } = SIZE_MAP[size];

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          width,
          height,
          borderRadius: 8,
          overflow: 'hidden',
          border: '2px solid rgba(167,139,250,0.3)',
          // 역방향 카드는 180도 회전하여 표시
          transform: isReversed ? 'rotate(180deg)' : 'none',
          flexShrink: 0,
        }}
      >
        <img
          src={card.image.url}
          alt={card.image.description}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>
      {showName && (
        <span
          style={{
            fontSize,
            color: '#c4b5fd',
            textAlign: 'center',
            maxWidth: width,
            lineHeight: 1.3,
          }}
        >
          {card.koreanName}
          {isReversed && ' (역)'}
        </span>
      )}
    </div>
  );
}
