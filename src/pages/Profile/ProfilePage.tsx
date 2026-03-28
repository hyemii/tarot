// 프로필 페이지 — 학습 통계, 즐겨찾기, 설정을 관리하는 화면

import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { useAllCards } from '@/hooks/useCards';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { TarotCardFace } from '@/components/card/TarotCardFace';

export default function ProfilePage() {
  const navigate = useNavigate();
  const profile = useUserStore((s) => s.profile);
  const updateSettings = useUserStore((s) => s.updateSettings);
  const allCards = useAllCards();

  if (!profile) return null;

  // 학습 통계 계산
  const learnedEntries = Object.entries(profile.learnedCards);
  const learnedCount = learnedEntries.length;
  const majorLearned = learnedEntries.filter(([id]) => id.startsWith('major_')).length;
  const minorLearned = learnedCount - majorLearned;
  const favoriteCardIds = learnedEntries
    .filter(([, data]) => data.isFavorite)
    .map(([id]) => id);

  const majorPercent = (majorLearned / 22) * 100;
  const minorPercent = (minorLearned / 56) * 100;

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>프로필</h1>

      {/* 학습 통계 */}
      <section style={{ backgroundColor: '#1e1040', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 style={{ fontSize: 15, color: 'white', fontWeight: 600 }}>학습 통계</h2>
        <ProgressBar value={majorPercent} label={`메이저 아르카나 (${majorLearned}/22)`} />
        <ProgressBar value={minorPercent} label={`마이너 아르카나 (${minorLearned}/56)`} />
        <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
          <div style={{ textAlign: 'center', flex: 1, backgroundColor: '#2d1b69', borderRadius: 10, padding: '12px 8px' }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#a78bfa' }}>{learnedCount}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>학습 카드</p>
          </div>
          <div style={{ textAlign: 'center', flex: 1, backgroundColor: '#2d1b69', borderRadius: 10, padding: '12px 8px' }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#a78bfa' }}>{favoriteCardIds.length}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>즐겨찾기</p>
          </div>
          <div style={{ textAlign: 'center', flex: 1, backgroundColor: '#2d1b69', borderRadius: 10, padding: '12px 8px' }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#a78bfa' }}>{profile.readingSessions.length}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>총 리딩</p>
          </div>
        </div>
      </section>

      {/* 즐겨찾기 카드 */}
      {favoriteCardIds.length > 0 && (
        <section>
          <h2 style={{ fontSize: 15, color: 'white', fontWeight: 600, marginBottom: 12 }}>즐겨찾기</h2>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {favoriteCardIds.map((cardId) => {
              const card = allCards.find((c) => c.id === cardId);
              if (!card) return null;
              return (
                <div
                  key={cardId}
                  onClick={() => navigate(`/library/${cardId}`)}
                  style={{ flexShrink: 0, cursor: 'pointer' }}
                >
                  <TarotCardFace card={card} size="sm" showName />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 설정 */}
      <section style={{ backgroundColor: '#1e1040', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <h2 style={{ fontSize: 15, color: 'white', fontWeight: 600, marginBottom: 14 }}>설정</h2>

        {/* 역방향 카드 표시 설정 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <p style={{ fontSize: 14, color: 'white' }}>역방향 카드 사용</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
              리딩 시 역방향 카드를 포함합니다
            </p>
          </div>
          <button
            onClick={() => updateSettings({ showReversedCards: !profile.settings.showReversedCards })}
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              border: 'none',
              backgroundColor: profile.settings.showReversedCards ? '#7c3aed' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s',
            }}
          >
            <div style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: 'white',
              position: 'absolute',
              top: 3,
              left: profile.settings.showReversedCards ? 23 : 3,
              transition: 'left 0.2s',
            }} />
          </button>
        </div>

        {/* 상세 해설 설정 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14 }}>
          <div>
            <p style={{ fontSize: 14, color: 'white' }}>상세 해설 표시</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
              카드 상세 페이지에서 긴 설명을 표시합니다
            </p>
          </div>
          <button
            onClick={() => updateSettings({ detailedGuidance: !profile.settings.detailedGuidance })}
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              border: 'none',
              backgroundColor: profile.settings.detailedGuidance ? '#7c3aed' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s',
            }}
          >
            <div style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: 'white',
              position: 'absolute',
              top: 3,
              left: profile.settings.detailedGuidance ? 23 : 3,
              transition: 'left 0.2s',
            }} />
          </button>
        </div>
      </section>

      {/* 앱 정보 */}
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
        타로 공부 v1.0.0
      </div>
    </div>
  );
}
