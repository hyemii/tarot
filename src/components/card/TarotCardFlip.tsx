// 카드 뒤집기 애니메이션 컴포넌트 — CSS 3D 변환으로 앞/뒷면 전환

import { TarotCardFace } from './TarotCardFace';
import { TarotCardBack } from './TarotCardBack';
import type { TarotCard } from '@/types/tarot';

interface TarotCardFlipProps {
  card: TarotCard;
  isReversed: boolean;
  // false: 뒷면, true: 앞면
  isFlipped: boolean;
  size?: 'sm' | 'md' | 'lg';
  onFlip?: () => void;
}

const SIZE_MAP = {
  sm: { width: 60, height: 100 },
  md: { width: 100, height: 167 },
  lg: { width: 160, height: 267 },
};

export function TarotCardFlip({
  card,
  isReversed,
  isFlipped,
  size = 'md',
  onFlip,
}: TarotCardFlipProps) {
  const { width, height } = SIZE_MAP[size];

  return (
    // perspective 속성으로 3D 뒤집기 효과에 원근감 부여
    <div
      style={{
        width,
        height,
        perspective: 600,
        cursor: onFlip && !isFlipped ? 'pointer' : 'default',
      }}
      onClick={!isFlipped ? onFlip : undefined}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease',
          // 뒤집힌 상태이면 Y축으로 180도 회전하여 앞면 표시
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 뒷면: backface-visibility hidden으로 뒤집혔을 때 숨김 */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}>
          <TarotCardBack size={size} />
        </div>
        {/* 앞면: 초기에 Y축 180도 회전된 상태로 배치하여 뒤집으면 정면으로 보임 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <TarotCardFace card={card} isReversed={isReversed} size={size} />
        </div>
      </div>
    </div>
  );
}
