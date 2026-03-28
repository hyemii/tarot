// 카드 선택 모달 — 78장 중에서 검색하여 원하는 카드를 선택

import { useState } from 'react';
import { useAllCards } from '@/hooks/useCards';
import type { TarotCard } from '@/types/tarot';

interface CardPickerModalProps {
  // 이미 다른 포지션에서 선택된 카드 ID 목록 — 중복 선택 방지
  excludedCardIds: string[];
  onSelect: (card: TarotCard) => void;
  onClose: () => void;
}

export function CardPickerModal({ excludedCardIds, onSelect, onClose }: CardPickerModalProps) {
  const allCards = useAllCards();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'major' | 'cups' | 'wands' | 'swords' | 'pentacles'>('all');

  // 검색어와 필터를 함께 적용하여 카드 목록 필터링
  const filtered = allCards.filter((card) => {
    if (excludedCardIds.includes(card.id)) return false;

    if (activeFilter === 'major' && card.arcana !== 'major') return false;
    if (activeFilter !== 'all' && activeFilter !== 'major' && card.suit !== activeFilter) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        card.koreanName.includes(searchTerm) ||
        card.englishName.toLowerCase().includes(term) ||
        card.keywords.some((kw) => kw.includes(searchTerm))
      );
    }
    return true;
  });

  const FILTERS = [
    { key: 'all',       label: '전체' },
    { key: 'major',     label: '메이저' },
    { key: 'cups',      label: '컵' },
    { key: 'wands',     label: '완드' },
    { key: 'swords',    label: '검' },
    { key: 'pentacles', label: '펜타클' },
  ] as const;

  return (
    // 배경 오버레이 — 클릭 시 모달 닫기
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 600,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0f0720',
          borderRadius: '16px 16px 0 0',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 드래그 핸들 */}
        <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)' }} />
        </div>

        {/* 헤더 */}
        <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white' }}>카드 선택</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#a78bfa', fontSize: 14, cursor: 'pointer' }}
          >
            닫기
          </button>
        </div>

        {/* 검색창 */}
        <div style={{ padding: '0 20px 10px' }}>
          <input
            autoFocus
            type="search"
            placeholder="카드 이름 또는 키워드"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid rgba(167,139,250,0.3)',
              backgroundColor: '#1e1040',
              color: 'white',
              fontSize: 14,
            }}
          />
        </div>

        {/* 카테고리 필터 탭 */}
        <div style={{ display: 'flex', gap: 8, padding: '0 20px 10px', overflowX: 'auto' }}>
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                flexShrink: 0,
                padding: '5px 12px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                backgroundColor: activeFilter === key ? '#7c3aed' : '#1e1040',
                color: activeFilter === key ? 'white' : '#a78bfa',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 카드 목록 — 스크롤 가능 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', paddingTop: 32, fontSize: 14 }}>
              검색 결과가 없습니다
            </p>
          ) : (
            filtered.map((card) => (
              <div
                key={card.id}
                onClick={() => onSelect(card)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                }}
              >
                {/* 카드 썸네일 이미지 */}
                <img
                  src={card.image.url}
                  alt={card.koreanName}
                  style={{ width: 36, height: 60, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, color: 'white', fontWeight: 500 }}>{card.koreanName}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{card.englishName}</p>
                  {/* 카드 키워드 미리보기 */}
                  <p style={{ fontSize: 11, color: '#a78bfa', marginTop: 2 }}>
                    {card.keywords.slice(0, 3).join(' · ')}
                  </p>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>›</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
