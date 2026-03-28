// 리딩 세션 페이지 — 질문 입력 후 카드를 뽑는 화면

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { spreads } from '@/data/spreads';
import { useAllCards } from '@/hooks/useCards';
import { useReadingStore } from '@/store/readingStore';
import { readingRepository } from '@/db/repositories/readingRepository';
import { shuffleDeck } from '@/services/cardService';
import { TarotCardBack } from '@/components/card/TarotCardBack';
import { TarotCardFlip } from '@/components/card/TarotCardFlip';
import type { DrawnCard } from '@/types/tarot';

export default function ReadingSessionPage() {
  const { spreadId } = useParams<{ spreadId: string }>();
  const navigate = useNavigate();
  const allCards = useAllCards();

  const spread = spreads.find((s) => s.id === spreadId);
  const { phase, currentSpread, drawnCards, startReading, drawCard, buildSession, resetReading } =
    useReadingStore();

  const [question, setQuestion] = useState('');
  const [flippedPositions, setFlippedPositions] = useState<Set<number>>(new Set());

  // 셔플된 덱 — 매 세션마다 새로 섞음
  const shuffledDeck = useMemo(() => shuffleDeck(allCards), [allCards]);

  if (!spread) {
    return (
      <div style={{ padding: 24, color: 'white', textAlign: 'center' }}>
        스프레드를 찾을 수 없습니다.
        <button onClick={() => navigate('/reading')} style={{ display: 'block', margin: '12px auto', color: '#a78bfa', background: 'none', border: 'none', cursor: 'pointer' }}>
          돌아가기
        </button>
      </div>
    );
  }

  // 질문 입력 단계
  if (phase === 'idle' || currentSpread?.id !== spreadId) {
    return (
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontSize: 14, textAlign: 'left' }}>
          ← 뒤로
        </button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 8 }}>
            {spread.koreanName}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            {spread.description}
          </p>
        </div>

        {/* 포지션 안내 */}
        <div style={{ backgroundColor: '#1e1040', borderRadius: 12, padding: 16 }}>
          <h3 style={{ fontSize: 14, color: '#a78bfa', marginBottom: 10 }}>카드 배치</h3>
          {spread.positions.map((pos) => (
            <div key={pos.position} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', flexShrink: 0 }}>
                {pos.position}
              </span>
              <div>
                <p style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{pos.label}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{pos.meaning}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 질문 입력 */}
        <div>
          <label style={{ fontSize: 14, color: '#a78bfa', display: 'block', marginBottom: 8 }}>
            오늘의 질문 (선택)
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="마음속 질문을 적어보세요..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid rgba(167,139,250,0.3)',
              backgroundColor: '#1e1040',
              color: 'white',
              fontSize: 14,
              resize: 'none',
              lineHeight: 1.6,
            }}
          />
        </div>

        <button
          onClick={() => startReading(spread, question)}
          style={{
            padding: '14px',
            borderRadius: 12,
            border: 'none',
            backgroundColor: '#7c3aed',
            color: 'white',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          카드 뽑기 시작
        </button>
      </div>
    );
  }

  // 카드 드로우 단계
  if (phase === 'drawing') {
    // 이미 드로우된 카드 ID를 제외한 덱으로 다음 카드 선택
    const drawnCardIds = new Set(drawnCards.map((dc) => dc.cardId));
    const remainingDeck = shuffledDeck.filter((c) => !drawnCardIds.has(c.id));

    return (
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>
          {spread.koreanName}
        </h1>
        {question && (
          <p style={{ fontSize: 13, color: '#a78bfa', fontStyle: 'italic' }}>"{question}"</p>
        )}

        {/* 드로우 진행 상태 */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          {drawnCards.length} / {spread.cardCount}장 뽑음
        </p>

        {/* 포지션별 카드 슬롯 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {spread.positions.map((pos) => {
            const drawn = drawnCards.find((dc) => dc.position === pos.position);
            const card = drawn ? allCards.find((c) => c.id === drawn.cardId) : undefined;
            const isCurrentPosition = drawnCards.length + 1 === pos.position;

            return (
              <div
                key={pos.position}
                style={{
                  backgroundColor: '#1e1040',
                  borderRadius: 12,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  border: isCurrentPosition ? '1px solid #7c3aed' : '1px solid transparent',
                }}
              >
                {/* 포지션 번호 */}
                <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: drawn ? '#7c3aed' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', flexShrink: 0 }}>
                  {pos.position}
                </span>

                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{pos.label}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{pos.meaning}</p>
                </div>

                {/* 드로우된 카드 or 뒷면 버튼 */}
                {drawn && card ? (
                  <TarotCardFlip
                    card={card}
                    isReversed={drawn.isReversed}
                    isFlipped={flippedPositions.has(pos.position)}
                    size="sm"
                    onFlip={() =>
                      setFlippedPositions((prev) => new Set([...prev, pos.position]))
                    }
                  />
                ) : isCurrentPosition ? (
                  <TarotCardBack
                    size="sm"
                    isSelected
                    onClick={() => {
                      const nextCard = remainingDeck[0];
                      if (nextCard) {
                        const dc: DrawnCard = {
                          position: pos.position,
                          cardId: nextCard.id,
                          isReversed: Math.random() < 0.5,
                        };
                        drawCard(dc);
                      }
                    }}
                  />
                ) : (
                  <div style={{ width: 60, height: 100, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 결과 단계 — 리딩 세션을 저장하고 결과 페이지로 이동
  if (phase === 'result') {
    const handleSave = async () => {
      const session = buildSession();
      await readingRepository.save(session);
      resetReading();
      navigate(`/reading/result/${session.id}`, { replace: true });
    };

    return (
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ fontSize: 48 }}>✦</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white', textAlign: 'center' }}>
          모든 카드를 뽑았어요
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.6 }}>
          카드들이 전하는 메시지를 확인해보세요.
        </p>
        <button
          onClick={handleSave}
          style={{
            padding: '14px 32px',
            borderRadius: 12,
            border: 'none',
            backgroundColor: '#7c3aed',
            color: 'white',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          결과 보기
        </button>
      </div>
    );
  }

  return null;
}
