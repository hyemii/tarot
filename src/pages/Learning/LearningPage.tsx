// 학습 페이지 — 스프레드 종류와 사용법을 배우는 교실

import { useNavigate } from 'react-router-dom';
import { spreads } from '@/data/spreads';
import { useUserStore } from '@/store/userStore';

export default function LearningPage() {
  const navigate = useNavigate();
  const profile = useUserStore((s) => s.profile);

  // 전체 카드 중 학습한 비율 계산
  const learnedCount = Object.keys(profile?.learnedCards ?? {}).length;
  const learnedPercent = Math.round((learnedCount / 78) * 100);

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>학습</h1>

      {/* 학습 진도 요약 */}
      <div style={{ backgroundColor: '#1e1040', borderRadius: 16, padding: 20, display: 'flex', gap: 20 }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#a78bfa' }}>{learnedCount}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>학습한 카드</p>
        </div>
        <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <div style={{ textAlign: 'center', flex: 1 }}>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#a78bfa' }}>{learnedPercent}%</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>전체 진도</p>
        </div>
        <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <div style={{ textAlign: 'center', flex: 1 }}>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#a78bfa' }}>78</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>전체 카드</p>
        </div>
      </div>

      {/* 스프레드 교실 */}
      <div>
        <h2 style={{ fontSize: 17, fontWeight: 600, color: 'white', marginBottom: 12 }}>
          스프레드 교실
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16, lineHeight: 1.6 }}>
          각 스프레드의 카드 배치와 포지션 의미를 배워보세요.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {spreads.map((spread) => (
            <div
              key={spread.id}
              onClick={() => navigate(`/learning/${spread.id}`)}
              style={{
                backgroundColor: '#1e1040',
                borderRadius: 14,
                padding: '16px 18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                border: '1px solid rgba(167,139,250,0.1)',
              }}
            >
              {/* 카드 수 배지 */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: '#2d1b69',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#a78bfa' }}>{spread.cardCount}</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>장</span>
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{spread.koreanName}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  난이도 {spread.difficulty}/5 · {spread.cardCount}개 포지션
                </p>
              </div>

              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      </div>

      {/* 카드 도감 바로가기 */}
      <div
        onClick={() => navigate('/library')}
        style={{
          backgroundColor: '#2d1b69',
          borderRadius: 14,
          padding: '16px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>카드 도감으로 학습하기</p>
          <p style={{ fontSize: 12, color: '#a78bfa', marginTop: 2 }}>78장 카드 의미 확인 및 즐겨찾기</p>
        </div>
        <span style={{ fontSize: 24 }}>📚</span>
      </div>
    </div>
  );
}
