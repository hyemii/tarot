// 홈 화면 — 일일 원카드, 학습 진도, 최근 리딩 3개를 보여주는 대시보드

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { useDailyCard } from '@/hooks/useDailyCard';
import { TarotCardFlip } from '@/components/card/TarotCardFlip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { readingRepository } from '@/db/repositories/readingRepository';
import type { ReadingSession } from '@/types/tarot';
import { spreads } from '@/data/spreads';

// 전체 78장 중 학습 완료 카드 수를 계산
function countLearned(learnedCards: Record<string, unknown>): number {
  return Object.keys(learnedCards).length;
}

export default function HomePage() {
  const navigate = useNavigate();
  const profile = useUserStore((s) => s.profile);
  const dailyCard = useDailyCard();
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [recentSessions, setRecentSessions] = useState<ReadingSession[]>([]);

  // 최근 리딩 3개를 DB에서 불러옴
  useEffect(() => {
    readingRepository.getRecent(3).then(setRecentSessions);
  }, []);

  const learnedCount = profile ? countLearned(profile.learnedCards) : 0;
  const progressPercent = (learnedCount / 78) * 100;

  // 오늘 날짜를 한국어 형식으로 표시
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* 헤더 */}
      <div>
        <p style={{ color: '#a78bfa', fontSize: 13, marginBottom: 4 }}>{today}</p>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>오늘의 타로</h1>
      </div>

      {/* 일일 원카드 섹션 */}
      {dailyCard && (
        <section
          style={{
            backgroundColor: '#1e1040',
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <h2 style={{ fontSize: 15, color: '#a78bfa', fontWeight: 500 }}>오늘의 카드</h2>

          <TarotCardFlip
            card={dailyCard.card}
            isReversed={dailyCard.isReversed}
            isFlipped={isCardFlipped}
            size="lg"
            onFlip={() => setIsCardFlipped(true)}
          />

          {/* 카드를 뒤집기 전에는 안내 문구 표시 */}
          {!isCardFlipped ? (
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              카드를 눌러서 오늘의 메시지를 확인하세요
            </p>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                {dailyCard.card.koreanName}
                {dailyCard.isReversed && <span style={{ color: '#a78bfa' }}> (역방향)</span>}
              </p>
              <p style={{ fontSize: 13, color: '#c4b5fd', lineHeight: 1.6 }}>
                {dailyCard.isReversed
                  ? dailyCard.card.reversed.shortMeaning
                  : dailyCard.card.upright.shortMeaning}
              </p>
              <button
                onClick={() => navigate(`/library/${dailyCard.card.id}`)}
                style={{
                  marginTop: 12,
                  padding: '8px 20px',
                  borderRadius: 20,
                  border: '1px solid #a78bfa',
                  backgroundColor: 'transparent',
                  color: '#a78bfa',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                카드 자세히 보기
              </button>
            </div>
          )}
        </section>
      )}

      {/* 학습 진도 섹션 */}
      <section
        style={{
          backgroundColor: '#1e1040',
          borderRadius: 16,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 15, color: 'white', fontWeight: 600 }}>학습 진도</h2>
          <span style={{ fontSize: 13, color: '#a78bfa' }}>{learnedCount} / 78장</span>
        </div>
        <ProgressBar value={progressPercent} label="전체 카드" />
        <button
          onClick={() => navigate('/library')}
          style={{
            marginTop: 4,
            padding: '10px',
            borderRadius: 10,
            border: 'none',
            backgroundColor: '#7c3aed',
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          카드 도감 보기
        </button>
      </section>

      {/* 최근 리딩 섹션 */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 15, color: 'white', fontWeight: 600 }}>최근 리딩</h2>
          <button
            onClick={() => navigate('/reading/history')}
            style={{
              background: 'none',
              border: 'none',
              color: '#a78bfa',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            전체 보기
          </button>
        </div>

        {recentSessions.length === 0 ? (
          <div
            style={{
              backgroundColor: '#1e1040',
              borderRadius: 12,
              padding: 20,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
            }}
          >
            아직 리딩 기록이 없어요.
            <br />
            <button
              onClick={() => navigate('/reading')}
              style={{
                marginTop: 8,
                background: 'none',
                border: 'none',
                color: '#a78bfa',
                fontSize: 13,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              첫 리딩 시작하기
            </button>
          </div>
        ) : (
          recentSessions.map((session) => {
            // spreadId로 스프레드 이름 조회
            const spread = spreads.find((s) => s.id === session.spreadId);
            const date = new Date(session.timestamp).toLocaleDateString('ko-KR');
            return (
              <div
                key={session.id}
                onClick={() => navigate(`/reading/result/${session.id}`)}
                style={{
                  backgroundColor: '#1e1040',
                  borderRadius: 12,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  border: '1px solid rgba(167,139,250,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>
                    {spread?.koreanName ?? '리딩'}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{date}</span>
                </div>
                {session.question && (
                  <p
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.6)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {session.question}
                  </p>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
