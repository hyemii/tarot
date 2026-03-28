// 리딩 메인 페이지 — 모드 선택(카드 직접 입력 / 랜덤 뽑기) 후 스프레드를 선택하는 화면

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { spreads } from '@/data/spreads';

// 리딩 모드 — 직접 입력(수동) vs 랜덤 뽑기
type ReadingMode = 'manual' | 'random';

// 난이도를 별 아이콘으로 시각화
function DifficultyStars({ level }: { level: number }) {
  return (
    <span style={{ fontSize: 12 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < level ? '#f59e0b' : 'rgba(255,255,255,0.2)' }}>★</span>
      ))}
    </span>
  );
}

export default function ReadingPage() {
  const navigate = useNavigate();
  // 기본값: 카드 직접 입력 모드 (실제 타로 리딩 후 AI 해석)
  const [mode, setMode] = useState<ReadingMode>('manual');

  // 선택된 모드에 따라 다른 경로로 이동
  function handleSpreadSelect(spreadId: string) {
    if (mode === 'manual') {
      navigate(`/reading/manual/${spreadId}`);
    } else {
      navigate(`/reading/session/${spreadId}`);
    }
  }

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>리딩</h1>
        <button
          onClick={() => navigate('/reading/history')}
          style={{
            background: 'none',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: 20,
            padding: '6px 14px',
            color: '#a78bfa',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          기록 보기
        </button>
      </div>

      {/* 모드 선택 탭 */}
      <div
        style={{
          display: 'flex',
          backgroundColor: '#1e1040',
          borderRadius: 12,
          padding: 4,
          gap: 4,
        }}
      >
        <button
          onClick={() => setMode('manual')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 9,
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: mode === 'manual' ? '#7c3aed' : 'transparent',
            color: mode === 'manual' ? 'white' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.2s',
          }}
        >
          카드 직접 입력
        </button>
        <button
          onClick={() => setMode('random')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 9,
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: mode === 'random' ? '#7c3aed' : 'transparent',
            color: mode === 'random' ? 'white' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.2s',
          }}
        >
          랜덤 뽑기
        </button>
      </div>

      {/* 모드 설명 */}
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
        {mode === 'manual'
          ? '실제 타로 카드로 뽑은 결과를 직접 입력하고 AI 해석을 받아보세요.'
          : '앱에서 카드를 랜덤으로 뽑고 각 카드의 의미를 확인해보세요.'}
      </p>

      {/* 스프레드 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {spreads.map((spread) => (
          <div
            key={spread.id}
            onClick={() => handleSpreadSelect(spread.id)}
            style={{
              backgroundColor: '#1e1040',
              borderRadius: 16,
              padding: '18px 20px',
              cursor: 'pointer',
              border: '1px solid rgba(167,139,250,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>{spread.koreanName}</h3>
              <span style={{ padding: '3px 10px', borderRadius: 20, backgroundColor: 'rgba(124,58,237,0.2)', fontSize: 12, color: '#c4b5fd' }}>
                {spread.cardCount}장
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <DifficultyStars level={spread.difficulty} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>난이도 {spread.difficulty}/5</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {spread.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
