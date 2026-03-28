// 타로 카드 뒷면 — 드로우 전 또는 뒤집기 전 상태에서 표시

const SIZE_MAP = {
  sm: { width: 60, height: 100 },
  md: { width: 100, height: 167 },
  lg: { width: 160, height: 267 },
};

interface TarotCardBackProps {
  size?: 'sm' | 'md' | 'lg';
  // 선택된 상태일 때 테두리 강조 표시
  isSelected?: boolean;
  onClick?: () => void;
}

export function TarotCardBack({ size = 'md', isSelected = false, onClick }: TarotCardBackProps) {
  const { width, height } = SIZE_MAP[size];

  return (
    <div
      onClick={onClick}
      style={{
        width,
        height,
        borderRadius: 8,
        border: isSelected
          ? '2px solid #a78bfa'
          : '2px solid rgba(167,139,250,0.2)',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // 어두운 보라색 그라디언트로 신비로운 카드 뒷면 표현
        background: 'linear-gradient(135deg, #1e1040 0%, #2d1b69 50%, #1e1040 100%)',
        flexShrink: 0,
        transition: 'border-color 0.2s, transform 0.1s',
        transform: isSelected ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {/* 카드 뒷면 장식 문양 */}
      <div
        style={{
          width: '60%',
          height: '80%',
          border: '1px solid rgba(167,139,250,0.3)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
        }}
      >
        ✦
      </div>
    </div>
  );
}
