// 앱 전체 레이아웃 — 하단 탭 네비게이션과 페이지 콘텐츠 영역으로 구성

import { Outlet, NavLink } from 'react-router-dom';
import { OfflineBanner } from '@/components/ui/OfflineBanner';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

// 하단 탭 네비게이션 항목 정의
const TABS = [
  { path: '/',         label: '홈',     icon: '🏠' },
  { path: '/library',  label: '도감',   icon: '📚' },
  { path: '/reading',  label: '리딩',   icon: '🃏' },
  { path: '/learning', label: '학습',   icon: '🎓' },
  { path: '/profile',  label: '프로필', icon: '👤' },
] as const;

export function AppLayout() {
  // 온라인 상태 감지 훅을 레이아웃 수준에서 등록하여 앱 전체에 적용
  useOnlineStatus();

  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0f0720',
        color: 'white',
        maxWidth: 480,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <OfflineBanner />

      {/* 페이지 콘텐츠 영역 — 하단 탭 높이만큼 패딩을 줘서 탭에 가려지지 않게 처리 */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: 64,
        }}
      >
        <Outlet />
      </main>

      {/* 하단 고정 탭 네비게이션 */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 480,
          height: 64,
          display: 'flex',
          backgroundColor: '#1a0a2e',
          borderTop: '1px solid rgba(167,139,250,0.2)',
          // iOS safe area를 고려하여 하단 패딩 적용
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {TABS.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/'}  // 홈 탭은 정확한 경로 매칭
            style={({ isActive }) => ({
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              textDecoration: 'none',
              color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.4)',
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              transition: 'color 0.2s',
            })}
          >
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
