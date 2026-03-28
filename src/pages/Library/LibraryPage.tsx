// 카드 도감 페이지 — 78장 카드를 검색하고 필터링하여 탐색

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilteredCards } from '@/hooks/useCards';
import { useUserStore } from '@/store/userStore';
import { TarotCardFace } from '@/components/card/TarotCardFace';
import type { CardFilter } from '@/types/tarot';

// 수트 필터 옵션 목록
const SUIT_OPTIONS = [
  { value: undefined,       label: '전체' },
  { value: 'major',        label: '메이저', arcana: 'major' as const },
  { value: 'cups',         label: '컵',     arcana: 'minor' as const, suit: 'cups' as const },
  { value: 'wands',        label: '완드',   arcana: 'minor' as const, suit: 'wands' as const },
  { value: 'swords',       label: '검',     arcana: 'minor' as const, suit: 'swords' as const },
  { value: 'pentacles',    label: '펜타클', arcana: 'minor' as const, suit: 'pentacles' as const },
];

export default function LibraryPage() {
  const navigate = useNavigate();
  const profile = useUserStore((s) => s.profile);
  const [filter, setFilter] = useState<CardFilter>({});
  const [activeTab, setActiveTab] = useState<string>('전체');
  const filteredCards = useFilteredCards(filter);

  // 탭 선택 시 필터 조건 업데이트
  function handleTabSelect(option: (typeof SUIT_OPTIONS)[number]) {
    setActiveTab(option.label);
    if (option.label === '전체') {
      setFilter({});
    } else if ('arcana' in option) {
      setFilter({
        arcana: option.arcana,
        suit: 'suit' in option ? option.suit : undefined,
      });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 헤더 */}
      <div style={{ padding: '24px 20px 0', backgroundColor: '#0f0720' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 16 }}>
          카드 도감
        </h1>

        {/* 검색창 */}
        <input
          type="search"
          placeholder="카드 이름 또는 키워드 검색"
          value={filter.searchTerm ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, searchTerm: e.target.value || undefined }))}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid rgba(167,139,250,0.3)',
            backgroundColor: '#1e1040',
            color: 'white',
            fontSize: 14,
            marginBottom: 12,
          }}
        />

        {/* 카테고리 탭 필터 */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 }}>
          {SUIT_OPTIONS.map((option) => (
            <button
              key={option.label}
              onClick={() => handleTabSelect(option)}
              style={{
                flexShrink: 0,
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                backgroundColor: activeTab === option.label ? '#7c3aed' : '#1e1040',
                color: activeTab === option.label ? 'white' : '#a78bfa',
                transition: 'background-color 0.2s',
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 검색 결과 수 */}
      <div style={{ padding: '8px 20px', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
        {filteredCards.length}장
      </div>

      {/* 카드 격자 목록 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 20px 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          alignContent: 'start',
        }}
      >
        {filteredCards.map((card) => {
          const isLearned = profile?.learnedCards[card.id];
          return (
            <div
              key={card.id}
              onClick={() => navigate(`/library/${card.id}`)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <div style={{ position: 'relative' }}>
                <TarotCardFace card={card} size="sm" />
                {/* 학습 완료 카드에 체크 표시 */}
                {isLearned && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 3,
                      right: 3,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: '#7c3aed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 9,
                      color: 'white',
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: isLearned ? '#c4b5fd' : 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  maxWidth: 80,
                }}
              >
                {card.koreanName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
