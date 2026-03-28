// 스프레드 상세 학습 페이지 — 선택한 스프레드의 배치, 포지션 의미, 예시 리딩을 학습

import { useParams, useNavigate } from 'react-router-dom';
import { spreads } from '@/data/spreads';

export default function SpreadLessonPage() {
  const { spreadId } = useParams<{ spreadId: string }>();
  const navigate = useNavigate();

  const spread = spreads.find((s) => s.id === spreadId);

  if (!spread) {
    return (
      <div style={{ padding: 24, color: 'white', textAlign: 'center' }}>
        스프레드를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* 상단 네비게이션 */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontSize: 14 }}>
          ← 뒤로
        </button>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{spread.koreanName}</h1>
      </div>

      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* 스프레드 기본 정보 */}
        <div style={{ backgroundColor: '#1e1040', borderRadius: 14, padding: 16 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: '#a78bfa' }}>{spread.cardCount}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>카드 수</p>
            </div>
            <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: '#a78bfa' }}>{spread.difficulty}/5</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>난이도</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            {spread.description}
          </p>
        </div>

        {/* 포지션 설명 */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 12 }}>포지션 의미</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {spread.positions.map((pos) => (
              <div
                key={pos.position}
                style={{ backgroundColor: '#1e1040', borderRadius: 12, padding: '14px 16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    backgroundColor: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: 'white',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {pos.position}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{pos.label}</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 6 }}>
                  {pos.meaning}
                </p>
                {/* 가이딩 질문: 카드를 어떻게 해석할지 방향 제시 */}
                <p style={{ fontSize: 12, color: '#a78bfa', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{pos.guidingQuestion}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 예시 리딩 */}
        {spread.exampleReadings && spread.exampleReadings.length > 0 && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 12 }}>예시 리딩</h2>
            {spread.exampleReadings.map((example, i) => (
              <div
                key={i}
                style={{ backgroundColor: '#1e1040', borderRadius: 12, padding: 16, marginBottom: 10 }}
              >
                <p style={{ fontSize: 14, fontWeight: 600, color: '#c4b5fd', marginBottom: 10 }}>
                  Q: {example.question}
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                  {example.interpretation}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 바로 리딩 시작 버튼 */}
        <button
          onClick={() => navigate(`/reading/session/${spread.id}`)}
          style={{
            padding: '14px',
            borderRadius: 12,
            border: 'none',
            backgroundColor: '#7c3aed',
            color: 'white',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {spread.koreanName} 리딩 시작
        </button>
      </div>
    </div>
  );
}
