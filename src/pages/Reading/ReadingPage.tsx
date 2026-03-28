// 리딩 메인 페이지 — 스프레드를 선택하고 리딩을 시작하는 화면

import { useNavigate } from 'react-router-dom';
import { spreads } from '@/data/spreads';

// 난이도에 따라 별 아이콘으로 시각화
function DifficultyStars({ level }: { level: number }) {
  return (
    <span style={{ fontSize: 12 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < level ? '#f59e0b' : 'rgba(255,255,255,0.2)' }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ReadingPage() {
  const navigate = useNavigate();

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

      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
        오늘의 질문이나 상황에 맞는 스프레드를 선택하세요.
        <br />
        초급자라면 원카드나 3카드로 시작하는 것을 추천합니다.
      </p>

      {/* 스프레드 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {spreads.map((spread) => (
          <div
            key={spread.id}
            onClick={() => navigate(`/reading/session/${spread.id}`)}
            style={{
              backgroundColor: '#1e1040',
              borderRadius: 16,
              padding: '18px 20px',
              cursor: 'pointer',
              border: '1px solid rgba(167,139,250,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              transition: 'border-color 0.2s',
            }}
          >
            {/* 스프레드 이름과 카드 수 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>
                {spread.koreanName}
              </h3>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: 20,
                  backgroundColor: 'rgba(124,58,237,0.2)',
                  fontSize: 12,
                  color: '#c4b5fd',
                }}
              >
                {spread.cardCount}장
              </span>
            </div>

            {/* 난이도 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <DifficultyStars level={spread.difficulty} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                난이도 {spread.difficulty}/5
              </span>
            </div>

            {/* 설명 (두 줄로 제한) */}
            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {spread.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
