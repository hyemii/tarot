// 수동 리딩 페이지 — 실제로 뽑은 카드를 직접 선택하고 AI 해석을 받는 화면
// 스프레드 선택 → 질문 입력 → 카드 직접 선택 → AI 해석 순서로 진행

import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { spreads } from '@/data/spreads';
import { useAppStore } from '@/store/appStore';
import { useClaudeInterpretation } from '@/hooks/useClaudeInterpretation';
import { CardPickerModal } from '@/components/card/CardPickerModal';
import { TarotCardFace } from '@/components/card/TarotCardFace';
import type { TarotCard, SpreadPosition } from '@/types/tarot';
import type { InterpretationRequest } from '@/services/claudeService';

// 포지션별 선택 상태
interface PositionSelection {
  card: TarotCard | null;
  isReversed: boolean;
}

export default function ManualReadingPage() {
  const { spreadId } = useParams<{ spreadId: string }>();
  const navigate = useNavigate();
  const isOnline = useAppStore((s) => s.isOnline);
  const { interpretation, status, error, generate } = useClaudeInterpretation();

  const spread = spreads.find((s) => s.id === spreadId);
  const [question, setQuestion] = useState('');
  // 포지션 번호를 키로 하는 카드 선택 상태 맵
  const [selections, setSelections] = useState<Record<number, PositionSelection>>({});
  // 현재 카드를 선택 중인 포지션 번호 (null이면 모달 닫힘)
  const [pickingPosition, setPickingPosition] = useState<number | null>(null);

  if (!spread) {
    return (
      <div style={{ padding: 24, color: 'white', textAlign: 'center' }}>
        스프레드를 찾을 수 없습니다.
        <button onClick={() => navigate(-1)} style={{ display: 'block', margin: '12px auto', color: '#a78bfa', background: 'none', border: 'none', cursor: 'pointer' }}>
          돌아가기
        </button>
      </div>
    );
  }

  // 선택 완료된 카드 ID 목록 — 모달에서 이미 선택된 카드를 비활성화하기 위해 사용
  const selectedCardIds = Object.values(selections)
    .filter((s) => s.card !== null)
    .map((s) => s.card!.id);

  // 모든 포지션에 카드가 선택됐는지 확인
  const isAllSelected = spread.positions.every((pos) => selections[pos.position]?.card);

  // 카드 선택 완료 — 해당 포지션에 카드 저장
  function handleCardSelect(card: TarotCard) {
    if (pickingPosition === null) return;
    setSelections((prev) => ({
      ...prev,
      [pickingPosition]: { card, isReversed: prev[pickingPosition]?.isReversed ?? false },
    }));
    setPickingPosition(null);
  }

  // 특정 포지션의 정/역방향 토글
  function toggleReversed(positionNumber: number) {
    setSelections((prev) => ({
      ...prev,
      [positionNumber]: {
        ...prev[positionNumber],
        isReversed: !prev[positionNumber]?.isReversed,
      },
    }));
  }

  // 특정 포지션의 카드 선택 초기화
  function clearCard(positionNumber: number) {
    setSelections((prev) => ({
      ...prev,
      [positionNumber]: { card: null, isReversed: false },
    }));
  }

  // 선택된 카드들을 Claude 서비스 요청 형태로 변환
  const interpretationRequest = useMemo((): InterpretationRequest | null => {
    if (!isAllSelected) return null;
    const drawnCards = spread.positions.flatMap((pos: SpreadPosition) => {
      const sel = selections[pos.position];
      if (!sel?.card) return [];
      return [{ position: pos, card: sel.card, isReversed: sel.isReversed }];
    });
    return { spread, question, drawnCards };
  }, [isAllSelected, selections, spread, question]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 상단 네비게이션 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontSize: 14 }}>
          ← 뒤로
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>
          {spread.koreanName} · 카드 입력
        </h1>
      </div>

      <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* 질문 입력 */}
        <div>
          <label style={{ fontSize: 13, color: '#a78bfa', display: 'block', marginBottom: 8 }}>
            질문
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="오늘의 질문을 입력하세요..."
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: 10,
              border: '1px solid rgba(167,139,250,0.3)',
              backgroundColor: '#1e1040',
              color: 'white',
              fontSize: 14,
            }}
          />
        </div>

        {/* 포지션별 카드 선택 */}
        <div>
          <p style={{ fontSize: 13, color: '#a78bfa', marginBottom: 12 }}>
            실제로 뽑은 카드를 각 포지션에 선택해주세요
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {spread.positions.map((pos) => {
              const sel = selections[pos.position];
              const hasCard = !!sel?.card;

              return (
                <div
                  key={pos.position}
                  style={{
                    backgroundColor: '#1e1040',
                    borderRadius: 14,
                    overflow: 'hidden',
                    border: hasCard ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {/* 포지션 헤더 */}
                  <div style={{ backgroundColor: '#2d1b69', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: hasCard ? '#7c3aed' : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', flexShrink: 0, transition: 'background-color 0.2s' }}>
                      {hasCard ? '✓' : pos.position}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{pos.label}</p>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{pos.meaning}</p>
                    </div>
                  </div>

                  {/* 카드 선택 영역 */}
                  <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    {hasCard && sel.card ? (
                      <>
                        {/* 선택된 카드 표시 */}
                        <TarotCardFace card={sel.card} isReversed={sel.isReversed} size="sm" />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>{sel.card.koreanName}</p>
                          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{sel.card.englishName}</p>

                          {/* 정방향/역방향 토글 */}
                          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                            <button
                              onClick={() => !sel.isReversed || toggleReversed(pos.position)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: 20,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 11,
                                fontWeight: 500,
                                backgroundColor: !sel.isReversed ? '#7c3aed' : '#2d1b69',
                                color: 'white',
                              }}
                            >
                              정방향
                            </button>
                            <button
                              onClick={() => sel.isReversed || toggleReversed(pos.position)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: 20,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 11,
                                fontWeight: 500,
                                backgroundColor: sel.isReversed ? '#7c3aed' : '#2d1b69',
                                color: 'white',
                              }}
                            >
                              역방향
                            </button>
                          </div>
                        </div>

                        {/* 카드 변경/삭제 버튼 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <button
                            onClick={() => setPickingPosition(pos.position)}
                            style={{ padding: '5px 10px', borderRadius: 8, border: '1px solid rgba(167,139,250,0.3)', background: 'none', color: '#a78bfa', fontSize: 11, cursor: 'pointer' }}
                          >
                            변경
                          </button>
                          <button
                            onClick={() => clearCard(pos.position)}
                            style={{ padding: '5px 10px', borderRadius: 8, border: 'none', background: 'rgba(255,100,100,0.1)', color: 'rgba(255,100,100,0.7)', fontSize: 11, cursor: 'pointer' }}
                          >
                            삭제
                          </button>
                        </div>
                      </>
                    ) : (
                      // 카드가 선택되지 않은 상태 — 선택 버튼 표시
                      <button
                        onClick={() => setPickingPosition(pos.position)}
                        style={{
                          flex: 1,
                          padding: '14px',
                          borderRadius: 10,
                          border: '1px dashed rgba(167,139,250,0.3)',
                          background: 'none',
                          color: '#a78bfa',
                          fontSize: 13,
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      >
                        + 카드 선택
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI 해석 섹션 — 모든 카드가 선택된 후 표시 */}
        {isAllSelected && (
          <div
            style={{
              backgroundColor: '#1e1040',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(167,139,250,0.2)',
            }}
          >
            <div style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #1e1040 100%)', padding: '14px 18px' }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>✦ Claude AI 해석</p>
              <p style={{ fontSize: 11, color: 'rgba(167,139,250,0.7)', marginTop: 2 }}>
                선택한 카드 조합과 질문을 종합하여 해석해드립니다
              </p>
            </div>

            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                disabled={!isOnline || status === 'streaming'}
                onClick={() => interpretationRequest && generate(interpretationRequest)}
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: !isOnline || status === 'streaming' ? 'not-allowed' : 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'white',
                  backgroundColor:
                    !isOnline ? 'rgba(255,255,255,0.1)'
                    : status === 'streaming' ? '#4c1d95'
                    : status === 'done' ? '#059669'
                    : status === 'error' ? '#b91c1c'
                    : '#7c3aed',
                }}
              >
                {!isOnline ? '오프라인 상태에서는 사용할 수 없습니다'
                  : status === 'streaming' ? '해석 생성 중...'
                  : status === 'done' ? '다시 해석받기'
                  : status === 'error' ? '다시 시도'
                  : 'AI 해석 받기'}
              </button>

              {/* 스트리밍 텍스트 — 실시간으로 텍스트가 추가됨 */}
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
                    // 스트리밍 중임을 커서 애니메이션으로 표시
                    borderRight: status === 'streaming' ? '2px solid #a78bfa' : 'none',
                  }}
                >
                  {interpretation}
                </div>
              )}

              {status === 'error' && error && (
                <p style={{ fontSize: 13, color: '#f87171', backgroundColor: 'rgba(185,28,28,0.15)', borderRadius: 8, padding: '10px 12px', lineHeight: 1.5 }}>
                  {error}
                </p>
              )}
            </div>
          </div>
        )}

        {/* 미선택 카드 안내 */}
        {!isAllSelected && (
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
            모든 포지션에 카드를 선택하면 AI 해석을 받을 수 있어요
          </p>
        )}
      </div>

      {/* 카드 선택 모달 */}
      {pickingPosition !== null && (
        <CardPickerModal
          excludedCardIds={selectedCardIds.filter(
            (id) => id !== selections[pickingPosition]?.card?.id
          )}
          onSelect={handleCardSelect}
          onClose={() => setPickingPosition(null)}
        />
      )}
    </div>
  );
}
