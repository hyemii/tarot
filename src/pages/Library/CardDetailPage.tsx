// 카드 상세 페이지 — 카드의 정방향/역방향 의미, 키워드, 맥락별 해석을 표시

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAllCards } from '@/hooks/useCards';
import { useUserStore } from '@/store/userStore';
import { TarotCardFace } from '@/components/card/TarotCardFace';
import type { TarotCard } from '@/types/tarot';

// 맥락별 레이블 한국어 매핑
const CONTEXT_LABELS: Record<string, string> = {
  love: '연애/관계',
  career: '직업/커리어',
  finances: '재정',
  spirituality: '영적 성장',
};

export default function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const allCards = useAllCards();
  const markCardViewed = useUserStore((s) => s.markCardViewed);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const profile = useUserStore((s) => s.profile);

  const [isReversed, setIsReversed] = useState(false);

  const card: TarotCard | undefined = allCards.find((c) => c.id === cardId);
  const isLearned = !!profile?.learnedCards[cardId ?? ''];
  const isFavorite = profile?.learnedCards[cardId ?? '']?.isFavorite ?? false;

  // 카드 상세 진입 시 학습 기록에 반영
  useEffect(() => {
    if (cardId) markCardViewed(cardId);
  }, [cardId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!card) {
    return (
      <div style={{ padding: 24, color: 'white', textAlign: 'center' }}>
        카드를 찾을 수 없습니다.
        <br />
        <button
          onClick={() => navigate('/library')}
          style={{ marginTop: 12, color: '#a78bfa', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          도감으로 돌아가기
        </button>
      </div>
    );
  }

  // 현재 선택된 방향의 의미 (정방향 / 역방향)
  const meaning = isReversed ? card.reversed : card.upright;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* 상단 네비게이션 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontSize: 14 }}
        >
          ← 뒤로
        </button>
        {/* 즐겨찾기 토글 버튼 */}
        <button
          onClick={() => toggleFavorite(card.id)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            opacity: isFavorite ? 1 : 0.4,
          }}
        >
          ♥
        </button>
      </div>

      {/* 카드 이미지 및 기본 정보 */}
      <div
        style={{
          backgroundColor: '#1e1040',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 20px',
          gap: 16,
        }}
      >
        <TarotCardFace card={card} isReversed={isReversed} size="lg" />

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>{card.koreanName}</h1>
          <p style={{ fontSize: 13, color: '#a78bfa', marginTop: 4 }}>
            {card.englishName}
            {card.arcana === 'major' && card.astrologySign
              ? ` · ${card.astrologySign}`
              : ''}
          </p>
          {isLearned && (
            <span
              style={{
                display: 'inline-block',
                marginTop: 8,
                padding: '3px 10px',
                borderRadius: 20,
                backgroundColor: 'rgba(124,58,237,0.3)',
                fontSize: 11,
                color: '#c4b5fd',
              }}
            >
              학습 완료
            </span>
          )}
        </div>

        {/* 정방향/역방향 전환 버튼 */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setIsReversed(false)}
            style={{
              padding: '7px 18px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              backgroundColor: !isReversed ? '#7c3aed' : '#2d1b69',
              color: 'white',
            }}
          >
            정방향
          </button>
          <button
            onClick={() => setIsReversed(true)}
            style={{
              padding: '7px 18px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              backgroundColor: isReversed ? '#7c3aed' : '#2d1b69',
              color: 'white',
            }}
          >
            역방향
          </button>
        </div>
      </div>

      {/* 카드 의미 섹션 */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* 키워드 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {card.keywords.map((kw) => (
            <span
              key={kw}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                backgroundColor: 'rgba(124,58,237,0.2)',
                border: '1px solid rgba(167,139,250,0.3)',
                fontSize: 12,
                color: '#c4b5fd',
              }}
            >
              {kw}
            </span>
          ))}
        </div>

        {/* 핵심 의미 */}
        <div style={{ backgroundColor: '#1e1040', borderRadius: 12, padding: 16 }}>
          <h3 style={{ fontSize: 14, color: '#a78bfa', marginBottom: 8 }}>
            {isReversed ? '역방향 의미' : '정방향 의미'}
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            {meaning.longMeaning}
          </p>
        </div>

        {/* 맥락별 해석 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h3 style={{ fontSize: 14, color: 'white', fontWeight: 600 }}>맥락별 해석</h3>
          {Object.entries(meaning.context).map(([key, value]) => (
            <div
              key={key}
              style={{ backgroundColor: '#1e1040', borderRadius: 10, padding: '12px 14px' }}
            >
              <p style={{ fontSize: 12, color: '#a78bfa', marginBottom: 4 }}>
                {CONTEXT_LABELS[key] ?? key}
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* 점성술 / 원소 정보 */}
        {(card.astrologySign || card.element) && (
          <div style={{ backgroundColor: '#1e1040', borderRadius: 12, padding: 16 }}>
            <h3 style={{ fontSize: 14, color: '#a78bfa', marginBottom: 10 }}>관련 정보</h3>
            {card.astrologySign && (
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
                ⭐ 점성술: {card.astrologySign}
              </p>
            )}
            {card.element && (
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                🌊 원소: {card.element}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
