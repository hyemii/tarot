// 학습 진도 등을 시각화하는 진행 바 컴포넌트

interface ProgressBarProps {
  // 0~100 사이의 진행률
  value: number;
  label?: string;
  color?: string;
}

export function ProgressBar({ value, label, color = '#7c3aed' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 6,
            fontSize: 13,
            color: '#a78bfa',
          }}
        >
          <span>{label}</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${clamped}%`,
            borderRadius: 4,
            backgroundColor: color,
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}
