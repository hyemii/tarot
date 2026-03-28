// 리딩 결과 페이지 — 드로우된 카드와 각 포지션의 의미를 함께 표시

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readingRepository } from '@/db/repositories/readingRepository';
import { spreads } from '@/data/spreads';
import { useAllCards } from '@/hooks/useCards';
import { useAppStore } from '@/store/appStore';
import { useClaudeInterpretation } from '@/hooks/useClaudeInterpretation';
import { TarotCardFace } from '@/components/card/TarotCardFace';
import type { ReadingSession } from '@/types/tarot';
import type { InterpretationRequest } from '@/services/claudeService';

export default function ReadingResultPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const allCards = useAllCards();
  const isOnline = useAppStore((s) => s.isOnline);
  const { interpretation, status, error, generate } = useClaudeInterpretation();

  const [session, setSession] = useState<ReadingSession | null>(null);
  const [notes, setNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  useEffect(() => {
    if (sessionId) {
      readingRepository.getById(sessionId).then((s) => {
        if (s) {
          setSession(s);
          setNotes(s.userNotes ?? '');
        }
      });
    }
  }, [sessionId]);

  if (!session) {
    return (
      <div style={{ padding: 24, color: 'white', textAlign: 'center' }}>
        리딩 기록을 불러오는 중...
      </div>
    );
  }

  const spread = spreads.find((s) => s.id === session.spreadId);
  const date = new Date(session.timestamp).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // 현재 세션의 도메인 객체를 Claude 서비스가 요구하는 형태로 변환
  // spread, session, allCards 세 소스를 하나의 InterpretationRequest로 조립
  const interpretationRequest = useMemo((): InterpretationRequest | null => {
    if (!session || !spread) return null;
    const cards = session.cards.flatMap((drawnCard) => {
      const card = allCards.find((c) => c.id === drawnCard.cardId);
      const position = spread.positions.find((p) => p.position === drawnCard.position);
      if (!card || !position) return [];
      return [{ position, card, isReversed: drawnCard.isReversed }];
    });
    return { spread, question: session.question, drawnCards: cards };
  }, [session, spread, allCards]);

  // 노트 저장 — 기존 세션에 노트를 추가하고 DB에 반영
  async function handleSaveNotes() {
    if (!session) return;
    setIsSavingNotes(true);
    const updated = { ...session, userNotes: notes, savedAt: Date.now() };
    await readingRepository.save(updated);
    setSession(updated);
    setIsSavingNotes(false);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* 상단 네비게이션 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontSize: 14 }}>
          ← 뒤로
        </button>
        <button
          onClick={() => navigate('/reading')}
          style={{
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid rgba(167,139,250,0.3)',
            background: 'none',
            color: '#a78bfa',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          새 리딩
        </button>
      </div>

      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* 헤더 */}
        <div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{date}</p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>
            {spread?.koreanName ?? '리딩'} 결과
          </h1>
          {session.question && (
            <p style={{ fontSize: 13, color: '#a78bfa', marginTop: 6, fontStyle: 'italic' }}>
              "{session.question}"
            </p>
          )}
        </div>

        {/* 포지션별 카드 결과 */}
        {session.cards.map((drawnCard) => {
          const card = allCards.find((c) => c.id === drawnCard.cardId);
          const position = spread?.positions.find((p) => p.position === drawnCard.position);
          if (!card || !position) return null;

          const meaning = drawnCard.isReversed ? card.reversed : card.upright;

          return (
            <div
              key={drawnCard.position}
              style={{ backgroundColor: '#1e1040', borderRadius: 16, overflow: 'hidden' }}
            >
              {/* 포지션 레이블 */}
              <div style={{ backgroundColor: '#2d1b69', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', flexShrink: 0 }}>
                  {drawnCard.position}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{position.label}</span>
              </div>

              {/* 카드 이미지와 의미 */}
              <div style={{ padding: 16, display: 'flex', gap: 14 }}>
                <div style={{ flexShrink: 0 }}>
                  <TarotCardFace card={card} isReversed={drawnCard.isReversed} size="sm" showName />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, color: '#a78bfa', marginBottom: 6 }}>
                    {drawnCard.isReversed ? '역방향' : '정방향'}
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                    {meaning.shortMeaning}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8, lineHeight: 1.5 }}>
                    {position.guidingQuestion}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* AI 해석 섹션 */}
        <div
          style={{
            backgroundColor: '#1e1040',
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(167,139,250,0.2)',
          }}
        >
          {/* 섹션 헤더 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #2d1b69 0%, #1e1040 100%)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>✦ Claude AI 해석</p>
              <p style={{ fontSize: 11, color: 'rgba(167,139,250,0.7)', marginTop: 2 }}>
                카드 조합과 질문을 종합하여 해석해드립니다
              </p>
            </div>
          </div>

          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 해석 생성 버튼 */}
            <button
              disabled={!isOnline || status === 'streaming' || !interpretationRequest}
              onClick={() => interpretationRequest && generate(interpretationRequest)}
              style={{
                padding: '12px',
                borderRadius: 10,
                border: 'none',
                cursor:
                  !isOnline || status === 'streaming' || !interpretationRequest
                    ? 'not-allowed'
                    : 'pointer',
                fontSize: 14,
                fontWeight: 600,
                color: 'white',
                transition: 'background-color 0.2s',
                // 상태별로 버튼 색상 변경
                backgroundColor:
                  !isOnline
                    ? 'rgba(255,255,255,0.1)'
                    : status === 'streaming'
                      ? '#4c1d95'
                      : status === 'done'
                        ? '#059669'
                        : status === 'error'
                          ? '#b91c1c'
                          : '#7c3aed',
              }}
            >
              {!isOnline
                ? '오프라인 상태에서는 사용할 수 없습니다'
                : status === 'streaming'
                  ? '해석 생성 중...'
                  : status === 'done'
                    ? '다시 해석받기'
                    : status === 'error'
                      ? '다시 시도'
                      : 'AI 해석 받기'}
            </button>

            {/* 스트리밍 중 또는 완료된 해석 텍스트 표시 */}
            {(status === 'streaming' || status === 'done') && interpretation && (
              <div
                style={{
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 10,
                  padding: '14px 16px',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                  // 스트리밍 중임을 커서로 표시
                  borderRight: status === 'streaming' ? '2px solid #a78bfa' : 'none',
                }}
              >
                {interpretation}
              </div>
            )}

            {/* 에러 메시지 */}
            {status === 'error' && error && (
              <p
                style={{
                  fontSize: 13,
                  color: '#f87171',
                  lineHeight: 1.5,
                  backgroundColor: 'rgba(185,28,28,0.15)',
                  borderRadius: 8,
                  padding: '10px 12px',
                }}
              >
                {error}
              </p>
            )}
          </div>
        </div>

        {/* 노트 입력 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 14, color: '#a78bfa' }}>나의 해석 & 노트</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="오늘 카드에서 느낀 것들을 기록해두세요..."
            rows={4}
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
          <button
            onClick={handleSaveNotes}
            disabled={isSavingNotes}
            style={{
              padding: '10px',
              borderRadius: 10,
              border: 'none',
              backgroundColor: notesSaved ? '#059669' : '#7c3aed',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            {notesSaved ? '저장 완료 ✓' : isSavingNotes ? '저장 중...' : '노트 저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
